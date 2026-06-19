import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A.G.M College of Engineering and Technology",
  description: "Admissions open for B.E. courses at A.G.M College of Engineering and Technology. Affiliated to VTU, Belagavi and Approved by AICTE, New Delhi.",
  keywords: ["AGM College", "Engineering", "Technology", "Belagavi", "VTU", "Admissions 2026", "B.E. Course", "Gunadhar Teerth", "Shamanewadi"],
  alternates: {
    canonical: "https://www.agmcollege.edu.in", // Placeholder URL
  },
  openGraph: {
    title: "A.G.M College of Engineering and Technology",
    description: "Admissions open for B.E. courses. Modern infrastructure, affordable fees, and high salary packages.",
    url: "https://www.agmcollege.edu.in",
    siteName: "A.G.M College of Engineering and Technology",
    images: [
      {
        url: "/images/banner.jpeg", // Placeholder for OG Image
        width: 1200,
        height: 630,
        alt: "A.G.M College of Engineering and Technology Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.G.M College of Engineering and Technology",
    description: "Admissions open for B.E. courses. Modern infrastructure, affordable fees, and high salary packages.",
    images: ["/images/banner.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "A.G.M College of Engineering and Technology",
              url: "https://www.agmcollege.edu.in",
              logo: "https://www.agmcollege.edu.in/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nej-Shamanewadi",
                addressLocality: "Chikkodi",
                addressRegion: "Karnataka",
                postalCode: "591239",
                addressCountry: "IN"
              },
              sameAs: [
                "https://www.facebook.com/agmcollege",
                "https://twitter.com/agmcollege",
                "https://www.linkedin.com/school/agmcollege"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
