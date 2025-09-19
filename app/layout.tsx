import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3585118770961536`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics ga_id="G-HHXZSNQ65X" />
    </html>
  );
}
