import type { Metadata, Viewport } from "next";
import { Noto_Sans, PT_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { publicWebsiteUrl } from "@/lib/product-site";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});
const ptSans = PT_Sans({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});
const siteUrl = publicWebsiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3003"),
  title: BRAND.name,
  description: BRAND.tagline,
  applicationName: BRAND.name,
  formatDetection: { telephone: false },
};
export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${notoSans.variable} ${ptSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
