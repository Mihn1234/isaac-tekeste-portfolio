import type { Metadata } from "next";
import { Lato, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Isaac Tekeste - AI & Fintech Innovation Consultant | UK Financial Services Expert",
  description: "Isaac Tekeste is a seasoned business investor and consultant specializing in AI and automation in finance. Expert in agentic AI, voice agents, and fintech solutions for banking, mortgages, insurance, and lending.",
  keywords: [
    "Isaac Tekeste",
    "AI consultant",
    "fintech expert",
    "financial technology",
    "artificial intelligence",
    "banking automation",
    "voice agents",
    "agentic AI",
    "UK financial services",
    "business investor",
    "fintech advisor",
    "mortgage technology",
    "insurance AI",
    "lending automation"
  ],
  authors: [{ name: "Isaac Tekeste" }],
  creator: "Isaac Tekeste",
  publisher: "Isaac Tekeste",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_UK",
    url: "https://www.isaactekeste.co.uk",
    title: "Isaac Tekeste - AI & Fintech Innovation Consultant",
    description: "Transforming financial services through artificial intelligence and automation. Expert in agentic AI, voice agents, and fintech solutions.",
    siteName: "Isaac Tekeste",
    images: [
      {
        url: "https://ext.same-assets.com/1982082812/1667391984.jpeg",
        width: 1200,
        height: 630,
        alt: "Isaac Tekeste - AI & Fintech Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Tekeste - AI & Fintech Innovation Consultant",
    description: "Transforming financial services through artificial intelligence and automation.",
    images: ["https://ext.same-assets.com/1982082812/1667391984.jpeg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://www.isaactekeste.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#14b8a6" />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: 'Isaac Tekeste Portfolio',
              page_location: window.location.href,
              content_group1: 'Fintech Consulting',
              custom_map: {
                'custom_parameter_1': 'AI_Consulting',
                'custom_parameter_2': 'Financial_Services'
              }
            });

            // Custom events for engagement tracking
            gtag('event', 'page_load', {
              event_category: 'engagement',
              event_label: 'portfolio_load'
            });
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-pixel" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "YOUR_PARTNER_ID";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);

            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);

            // Track page view
            window.lintrk('track', { conversion_id: 'page_view' });
          `}
        </Script>

        {/* Facebook Pixel (for broader B2B reach) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');

            // Custom events for B2B lead tracking
            fbq('track', 'ViewContent', {
              content_type: 'consulting_services',
              content_category: 'fintech_ai'
            });
          `}
        </Script>

        {/* Hotjar Analytics */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
            // Replace YOUR_HOTJAR_ID with actual ID
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:0000000,hjsv:6}; // Replace with actual Hotjar ID
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            }
          `}
        </Script>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Isaac Tekeste",
              "jobTitle": "AI & Fintech Innovation Consultant",
              "description": "Seasoned business investor and consultant specializing in AI and automation in finance",
              "url": "https://www.isaactekeste.co.uk",
              "image": "https://ext.same-assets.com/1982082812/1667391984.jpeg",
              "sameAs": [
                "https://www.linkedin.com/in/isaactekeste/",
                "https://www.instagram.com/isaac.tekeste/",
                "https://www.tiktok.com/@isaactekeste7"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Consultant"
              },
              "expertise": [
                "Artificial Intelligence",
                "Financial Technology",
                "Banking Automation",
                "Voice Agents",
                "Agentic AI",
                "Risk Management",
                "Compliance Technology"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              }
            })
          }}
        />

        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Isaac Tekeste Consulting",
              "description": "AI and Fintech consulting services for financial institutions",
              "serviceType": "Technology Consulting",
              "provider": {
                "@type": "Person",
                "name": "Isaac Tekeste"
              },
              "areaServed": "United Kingdom",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI-Powered Financial Transformation",
                      "description": "Elevate mortgage approvals, credit scoring, and underwriting with AI systems"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Strategic Investment & Advisory",
                      "description": "Deploy intelligent voice assistants for financial advisers and insurers"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Voice Agents & Conversational AI",
                      "description": "Invest and advise across fintech and AI-in-finance solutions"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <ClientBody
        className={`${lato.variable} ${inter.variable} font-lato antialiased`}
      >
        {children}
      </ClientBody>
    </html>
  );
}
