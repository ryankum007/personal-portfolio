import Script from "next/script";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Kumar",
  url: "https://ryankumar.net",
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "McMaster University",
  },
  knowsAbout: [
    "Java",
    "Python",
    "React",
    "TypeScript",
    "Spring Boot",
    "AWS",
    "Node.js",
  ],
  sameAs: ["https://www.linkedin.com/in/ryan-kumar-4491291aa/"],
});

export default function JsonLd() {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {jsonLd}
    </Script>
  );
}
