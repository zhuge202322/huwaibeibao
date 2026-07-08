import type { Metadata } from "next";
import { Montserrat, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import B2BSupportSidebar from "@/components/B2BSupportSidebar";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import siteSettings from "@/data/siteSettings.json";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: siteSettings.siteName,
  description:
    "Professional B2B outdoor gear manufacturing, OEM/ODM product development, high-durability materials and bulk production services.",
  icons: {
    icon: siteSettings.faviconUrl || siteSettings.logoUrl || "/logo.png",
    shortcut: siteSettings.faviconUrl || siteSettings.logoUrl || "/logo.png",
    apple: siteSettings.faviconUrl || siteSettings.logoUrl || "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${montserrat.variable} ${workSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body-md relative">
        {/* Global technical blueprint grid alignment lines */}
        <div className="absolute inset-y-0 left-6 w-[1px] border-l border-dashed border-outline-variant/10 pointer-events-none z-0 hidden xl:block" />
        <div className="absolute inset-y-0 right-6 w-[1px] border-l border-dashed border-outline-variant/10 pointer-events-none z-0 hidden xl:block" />
        
        <LanguageProvider>
          <Navbar />
          <B2BSupportSidebar />
          <main className="flex-grow pt-20 relative z-10">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
