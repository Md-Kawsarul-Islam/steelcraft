import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileNav from "@/components/MobileNav";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kawsar — Custom Steel & Metal Fabrication",
    template: "%s | Kawsar",
  },
  description:
    "Custom MS & stainless-steel fabrication, railings, gates, shutters, canopies, CNC cutting and metal works in Bangladesh.",
  applicationName: "Kawsar",
  keywords: [
    "steel fabrication",
    "metal fabrication",
    "stainless steel railing",
    "steel gate",
    "steel shutter",
    "Bangladesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kawsar",
    title: "Kawsar — Custom Steel & Metal Fabrication",
    description:
      "Measured, fabricated, fitted and finished metalwork solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawsar — Custom Steel & Metal Fabrication",
    description:
      "Custom steel and stainless-steel fabrication solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#111827",
};

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link
              href="/"
              className="brand"
              aria-label="Kawsar home"
            >
              KAW<span>SAR</span>
            </Link>

            <nav
              className="site-nav"
              aria-label="Main navigation"
            >
              {nav.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}

              <Link
                className="btn btn-primary"
                href="/contact?type=quote"
              >
                Get a Quote
              </Link>
            </nav>
            <MobileNav/>
          </div>
        </header>

        {children}

        {/* Floating WhatsApp Sales Button */}
        <WhatsAppButton />

        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <h3>KAWSAR</h3>
              <p>
                Custom MS & stainless-steel fabrication, fitting
                and finishing.
              </p>
            </div>

            <div>
              <h4>Products</h4>
              <p>
                Steel Shutter
                <br />
                Stair & Railing
                <br />
                Main Gate
                <br />
                Canopy
                <br />
                Cable Tray
              </p>
            </div>

            <div>
              <h4>Contact</h4>
              <p>
                Dhaka, Bangladesh
                <br />
                <a href="tel:+966530950767">
                  +966 53 095 0767
                </a>
                <br />
                <a href="mailto:info@example.com">
                  info@example.com
                </a>
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            © 2026 Kawsar. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}