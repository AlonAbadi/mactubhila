import type { Metadata } from "next";
import { SuccessPage } from "@/components/SuccessPage";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `הרכישה הושלמה – ${CLIENT.products.cards.title} | ${CLIENT.name}`,
  robots: { index: false },
};

export default function CardsSuccessPage() {
  return (
    <SuccessPage
      productName={CLIENT.products.cards.title}
      emoji="🃏"
      confirmationTitle="הקלפים שלך מוכנים!"
      confirmationDesc="כל החומרים נמצאים עכשיו באזור האישי שלך"
      nextStepLabel="לצפייה בקלפים"
      nextStepHref="/my"
      nextStepDesc="גש לאזור האישי לצפייה בקלפים ובמדריך המוקלט"
    />
  );
}
