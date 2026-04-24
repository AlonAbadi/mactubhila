import { CLIENT } from "@/lib/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": CLIENT.name,
  "url": APP_URL,
  "inLanguage": "he",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": CLIENT.name,
  "url": APP_URL,
  "jobTitle": CLIENT.about.tagline,
  "description": CLIENT.about.body,
  // TODO: add client-specific knowsAbout topics
  "knowsAbout": [] as string[],
  "worksFor": {
    "@type": "Organization",
    "name": CLIENT.legal_name,
    "url": APP_URL,
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": CLIENT.legal_name,
  "url": APP_URL,
  "logo": `${APP_URL}${CLIENT.meta.og_image}`,
  "description": CLIENT.meta.description,
  "founder": { "@type": "Person", "name": CLIENT.name },
};

export function SchemaMarkup() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </>
  );
}
