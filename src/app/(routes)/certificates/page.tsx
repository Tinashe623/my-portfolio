import CertificatesContent from "@/components/certificates/CertificatesContent";
import JsonLd from "@/components/seo/JsonLd";
import { listCertificates, type CertificateRow } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Certificates",
  description:
    "Professional certifications demonstrating my commitment to continuous learning and expertise in web development technologies.",
  alternates: { canonical: `${SITE_URL}/certificates` },
};

export default async function CertificatesPage() {
  let certificates: CertificateRow[] = [];
  try {
    certificates = await listCertificates();
  } catch (error) {
    console.error("Failed to load certificates:", error);
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Certificates | Tinashe Mundieta",
    url: `${SITE_URL}/certificates`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: certificates.map((certificate, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: certificate.title,
        url: certificate.credentialUrl ?? `${SITE_URL}/certificates`,
      })),
    },
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={itemListSchema} />
      <div className="max-w-6xl mx-auto">
        <CertificatesContent certificates={certificates} />
      </div>
    </div>
  );
}