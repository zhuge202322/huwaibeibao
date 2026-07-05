"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Globe, ShieldCheck, PhoneCall, Award } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-outline-variant h-20 flex items-center shadow-sm">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-full">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/logo.png" 
              alt="Ideas Cool Logo" 
              width={120} 
              height={40} 
              className="object-contain h-10 w-auto"
            />
            <span className="font-body text-lg md:text-xl font-semibold text-primary tracking-normal normal-case group-hover:text-high-vis-orange transition-colors">
              Ideas Cool Co., Limited
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
            <span className="text-on-surface-variant font-label-sm uppercase tracking-wider text-xs font-mono">
              EN
            </span>
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
