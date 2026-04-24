import type { Metadata } from "next";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `מכתוב לארגונים | ${CLIENT.name}`,
  description: "סדנאות כתיבה מותאמות אישית לחברות, עמותות, קיבוצים ומוסדות חינוך. בניית חוסן ארגוני, תרבות פנימית ותקשורת בין-אישית. ניסיון עם Microsoft, עמותת עלם ועוד.",
  alternates: { canonical: "/for-organizations" },
};

export default function ForOrganizationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
