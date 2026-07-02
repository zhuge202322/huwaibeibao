"use client";

import Link from "next/link";
import { Mail, MessageCircle, Store, ClipboardList } from "lucide-react";

export default function B2BSupportSidebar() {
  return (
    <aside className="fixed right-0 top-1/2 -translate-y-1/2 w-16 z-50 flex flex-col items-center py-4 bg-white border-l border-y border-outline-variant shadow-lg rounded-l-xl">
      <div className="mb-4 flex flex-col items-center group relative cursor-help">
        <Store size={20} className="text-primary animate-pulse" />
        <span className="text-[9px] font-bold text-primary mt-1 font-mono">B2B</span>
        <div className="absolute right-20 bg-white p-4 border border-outline-variant shadow-xl w-48 hidden group-hover:block transition-all duration-200" style={{ zIndex: 100 }}>
          <p className="font-headline-md text-sm text-primary font-bold">Blink Dreams B2B</p>
          <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">Direct support & storefront links</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 w-full px-2">
        {/* Alibaba Store */}
        <a 
          href="https://ideascool.en.alibaba.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Alibaba Store"
        >
          <Store size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Alibaba</span>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/8615160088966"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">WhatsApp</span>
        </a>
        
        {/* Email */}
        <a 
          href="mailto:info@ideascool.net"
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Send Email"
        >
          <Mail size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Email</span>
        </a>
        
        {/* RFQ / Inquiry */}
        <Link 
          href="/contact" 
          className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-300 hover:translate-x-[-4px]"
          title="Submit Inquiry / RFQ"
        >
          <ClipboardList size={18} />
          <span className="text-[9px] scale-90 uppercase mt-0.5 opacity-60">Inquiry</span>
        </Link>
      </div>
    </aside>
  );
}
