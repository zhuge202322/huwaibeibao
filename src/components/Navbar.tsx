"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageProvider";
import siteSettings from "@/data/siteSettings.json";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language: selectedLanguage, setLanguage } = useLanguage();
  const settings = siteSettings;

  const handleLanguageSelect = (languageCode: typeof SUPPORTED_LANGUAGES[number]["code"]) => {
    setLanguage(languageCode);
    setLanguageMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-outline-variant h-20 flex items-center shadow-sm">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-full">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src={settings.logoUrl || "/logo.png"}
              alt={`${settings.siteName} Logo`}
              width={120} 
              height={40} 
              className="object-contain h-10 w-auto"
            />
            <span className="font-body text-xl md:text-2xl font-semibold text-primary tracking-normal normal-case group-hover:text-high-vis-orange transition-colors">
              {settings.siteName}
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            <Link href="/" className="text-primary font-bold hover:text-high-vis-orange transition-colors duration-200 py-1">
              Home
            </Link>
            <Link href="/products" className="text-secondary font-medium hover:text-primary transition-colors duration-200 py-1">
              Products
            </Link>
            <Link href="/about" className="text-secondary font-medium hover:text-primary transition-colors duration-200 py-1">
              About Us
            </Link>
            <Link href="/contact" className="text-secondary font-medium hover:text-primary transition-colors duration-200 py-1">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className="relative"
              onBlur={(event) => {
                const nextFocus = event.relatedTarget;
                if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
                  setLanguageMenuOpen(false);
                }
              }}
            >
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((open) => !open)}
                className="h-11 min-w-16 px-3 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-primary border border-transparent hover:border-outline-variant hover:bg-surface-container-low transition-all cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                aria-label="Select language"
              >
                <Globe size={15} />
                <span className="font-body text-sm font-semibold">{selectedLanguage}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${languageMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {languageMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-36 bg-white border border-outline-variant shadow-xl py-1 z-[150]"
                  role="menu"
                >
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageSelect(language.code)}
                      className={`w-full px-3 py-2.5 flex items-center justify-between text-left text-sm transition-colors cursor-pointer ${
                        selectedLanguage === language.code
                          ? "bg-surface-container-low text-primary font-semibold"
                          : "text-secondary hover:bg-surface-container-low hover:text-primary"
                      }`}
                      role="menuitem"
                    >
                      <span className="font-body">{language.label}</span>
                      <span className="font-mono text-[10px]">{language.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact" className="hidden sm:inline-block">
              <button className="bg-high-vis-orange text-white px-5 py-2.5 font-headline-md text-[13px] uppercase tracking-widest font-bold hover:bg-primary transition-all duration-200 cursor-pointer">
                Get Quote
              </button>
            </Link>
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-primary p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Premium Mobile Nav Slide-Out Drawer (Moved outside <nav> to fix CSS filter containing block bug) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            style={{ zIndex: 201 }}
          />
          {/* Slide-out Panel */}
          <div 
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-8 border-l border-outline-variant animate-slide-in-right"
            style={{ 
              backgroundColor: "#ffffff",
              zIndex: 202
            }}
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center pb-6 border-b border-outline-variant mb-8">
                <span className="font-label-sm text-[10px] text-outline font-mono">MENU NAVIGATION</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-secondary hover:text-primary cursor-pointer p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex flex-col space-y-6 text-lg font-bold">
                <Link 
                  href="/" 
                  className="text-primary hover:text-high-vis-orange transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-primary hover:text-high-vis-orange transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  B2B Product Catalog
                </Link>
                <Link 
                  href="/about" 
                  className="text-primary hover:text-high-vis-orange transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  OEM/ODM Factory Tour
                </Link>
                <Link 
                  href="/contact" 
                  className="text-primary hover:text-high-vis-orange transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact & RFQ
                </Link>
              </div>
            </div>

            {/* Bottom Info & Contact Inquiries inside Mobile Drawer */}
            <div className="space-y-6 pt-6 border-t border-outline-variant">
              <div className="space-y-2">
                <span className="font-label-sm text-[9px] text-outline font-mono uppercase block">FACTORY STANDARDS</span>
                <div className="flex gap-2.5 text-[10px] font-bold text-secondary font-mono">
                  <span className="bg-slate-100 px-2 py-1">ISO 9001</span>
                  <span className="bg-slate-100 px-2 py-1">GRS Recycled</span>
                  <span className="bg-slate-100 px-2 py-1">SGS Verified</span>
                </div>
              </div>
              
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block">
                <button className="w-full bg-high-vis-orange text-white py-3.5 font-headline-md text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all">
                  Get B2B Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
