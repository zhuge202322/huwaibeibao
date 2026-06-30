"use client";

import Link from "next/link";
import { Mail, Settings, Download, MessageSquareCode } from "lucide-react";

export default function B2BSupportSidebar() {
  return (
    <aside className="fixed right-0 top-1/2 -translate-y-1/2 w-16 z-50 flex flex-col items-center py-4 bg-surface border-l border-y border-outline-variant shadow-md rounded-l-xl">
      <div className="mb-4 flex flex-col items-center group relative cursor-help">
        <MessageSquareCode size={20} className="text-primary animate-pulse" />
        <span className="text-[9px] font-bold text-primary mt-1 font-mono">B2B</span>
        <div className="absolute right-20 bg-surface p-4 border border-outline-variant shadow-xl w-48 hidden group-hover:block transition-all duration-200">
          <p className="font-headline-md text-sm text-primary font-bold">B2B Service Center</p>
          <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">Direct line to VIP support</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 w-full px-2">
        <Link 
          href="/contact" 
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Quick Inquiry"
        >
          <Mail size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Inquiry</span>
        </Link>
        
        <Link 
          href="/products/apex-50l" 
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Technical Specifications"
        >
          <Settings size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Specs</span>
        </Link>
        
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            alert("Generating PDF product catalog, please wait...");
          }}
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Download Catalog"
        >
          <Download size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Catalog</span>
        </a>
      </div>
    </aside>
  );
}
