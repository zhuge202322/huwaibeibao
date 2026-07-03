import type { Metadata } from "next";
import { Montserrat, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import B2BSupportSidebar from "@/components/B2BSupportSidebar";

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
  title: "Ideas Cool Co., Limited",
  description: "Ideas Cool Co., Limited - 全球领先的专业技术背包与各类箱包 OEM/ODM 制造商。提供端到端的产品开发、高耐用性材料规格与大规模量产服务，年产能达120万件。",
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
        
        <Navbar />
        <B2BSupportSidebar />
        <main className="flex-grow pt-20 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
