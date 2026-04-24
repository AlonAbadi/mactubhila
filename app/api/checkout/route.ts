/**
 * POST /api/checkout
 *
 * Creates a Cardcom LowProfile payment page and returns the redirect URL.
 * Returns 503 until CARDCOM_TERMINAL + CARDCOM_API_NAME are set.
 *
 * Body: { product: ProductKey | "test_1", user_id: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import { PRODUCT_MAP } from "@/lib/products";
import { CLIENT } from "@/lib/client";

const INVOICE_DESCRIPTIONS: Record<string, string> = {
  cards_149:      `קלפי מכתוב דיגיטליים - ${CLIENT.name}`,
  course_1800:    `קורס מכתוב הדיגיטלי - ${CLIENT.name}`,
  workshop_1080:  `קורס דיגיטלי + ליווי נרטיבי - ${CLIENT.name}`,
  strategy_4000:  `קורס מכתוב המלא – פרדס חנה - ${CLIENT.name}`,
  challenge_197:  `אתגר הכתיבה - ${CLIENT.name}`,
  premium_14000:  `חבילה מלאה - ${CLIENT.name}`,
  test_1:         `מוצר טסט - ${CLIENT.name}`,
};

const PRICES: Record<string, number> = {
  ...Object.fromEntries(
    Object.entries(PRODUCT_MAP).map(([k, v]) => [k, v.price])
  ),
  test_1: 1,
};

const NAMES: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(PRODUCT_MAP).map(([k, v]) => [k, v.name])
  ),
  test_1: "מוצר טסט",
};

const BodySchema = z.object({
  product: z.enum([
    "cards_149",
    "course_1800",
    "workshop_1080",
    "strategy_4000",
    "challenge_197",
    "premium_14000",
    "test_1",
  ]),
  user_id: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  if (process.env.PREVIEW_MODE === "true") {
    return NextResponse.json({ error: "Preview mode" }, { status: 503 });
  }

  const terminal = process.env.CARDCOM_TERMINAL;
  const apiName  = process.env.CARDCOM_API_NAME;

  if (!terminal || !apiName) {
    return NextResponse.json(
      { error: "Cardcom credentials not configured. Use WhatsApp to complete purchase." },
      { status: 503 }
    );
  }

  const body = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { product, user_id } = body.data;
  const listPrice = PRICES[product];
  const appUrl    = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

  const supabase = createServerClient();

  // Fetch user details for customer info and invoice
  const { data: userRow } = await supabase
    .from("users")
    .select("name, email, phone")
    .eq("id", user_id)
    .single();

  // Cancel any existing pending purchases for this user+product combo
  // before creating a new one (prevents duplicate pending rows on retry)
  await supabase
    .from("purchases")
    .update({ status: "failed" })
    .eq("user_id", user_id)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq("product", product as any)
    .eq("status", "pending");

  const amount = listPrice;

  // Create a pending purchase record for idempotency
  const { data: purchase, error: purchaseErr } = await supabase
    .from("purchases")
    .insert({
      user_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      product: product as any,
      amount,
      currency: "ILS",
      status: "pending",
    })
    .select("id")
    .single();

  if (purchaseErr) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const customerName  = userRow?.name  ?? "";
  const customerEmail = userRow?.email ?? "";
  const customerPhone = userRow?.phone ?? "";
  const invoiceDesc   = INVOICE_DESCRIPTIONS[product] ?? NAMES[product];

  // Cardcom LowProfile API — Name=Value form-encoded POST
  const params = new URLSearchParams({
    // Required
    TerminalNumber: terminal,
    UserName:       apiName,
    SumToBill:      String(amount),
    CoinId:         "1",          // ILS
    Language:       "he",
    APILevel:       "10",
    Codepage:       "65001",
    Operation:      "1",          // charge only (no tokenization needed)

    // ReturnValue is echoed back in the webhook — used to find this purchase row
    ReturnValue: purchase.id,

    // Redirect URLs (NEVER rely on these alone — webhook is the source of truth)
    SuccessRedirectUrl: product === "challenge_197"
      ? `${appUrl}/challenge/thank-you`
      : product === "cards_149"
      ? `${appUrl}/cards/success`
      : `${appUrl}/${product.split("_")[0]}/success`,
    ErrorRedirectUrl: `${appUrl}/checkout-error`,

    // Webhook — Cardcom calls this server-to-server BEFORE redirecting the user
    // We pass order= so the GET handler can identify the purchase immediately
    IndicatorUrl: `${appUrl}/api/cardcom/webhook?order=${purchase.id}`,

    // Customer details — pre-fills the Cardcom payment form
    CardOwnerName:       customerName,
    CardOwnerEmail:      customerEmail,
    ShowCardOwnerEmail:   "true",
    ReqCardOwnerEmail:    "true",
    ShowCardOwnerPhone:   "true",
    ReqCardOwnerPhone:    "true",
    CardOwnerPhone:       customerPhone,
    ShowInvoiceHead:      "true",
    HideCreditCardUserId: "false",

    // Invoice generation
    // InvoiceHeadOperation=1: generate invoice alongside the charge
    // DocTypeToCreate=1: חשבונית מס קבלה — includes product lines and VAT
    InvoiceHeadOperation:       "1",
    DocTypeToCreate:             "1",
    "InvoiceHead.CustName":      customerName,
    "InvoiceHead.SendByEmail":   "true",
    "InvoiceHead.Email":         customerEmail,
    "InvoiceHead.Language":      "he",
    "InvoiceHead.CoinID":        "1",
    "InvoiceLines.Description":  invoiceDesc,
    "InvoiceLines.Price":        String(amount),
    "InvoiceLines.Quantity":     "1",
    "InvoiceLines.IsVatFree":    "false",
  });

  const cardcomRes = await fetch(
    "https://secure.cardcom.solutions/Interface/LowProfile.aspx",
    {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    params.toString(),
    }
  );

  const text         = await cardcomRes.text();
  const resultParams = new URLSearchParams(text);
  const responseCode    = resultParams.get("ResponseCode");
  const lowProfileCode  = resultParams.get("LowProfileCode");

  if (responseCode !== "0" || !lowProfileCode) {
    await supabase.from("error_logs").insert({
      context: "api/checkout",
      error:   "Cardcom create failed",
      payload: { responseCode, description: resultParams.get("Description"), text },
    });
    return NextResponse.json({ error: "Payment provider error" }, { status: 502 });
  }

  return NextResponse.json({
    url: `https://secure.cardcom.solutions/External/lowProfileClearing/${terminal}.aspx?LowProfileCode=${lowProfileCode}`,
  });
}
