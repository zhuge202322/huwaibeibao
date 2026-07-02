"use client";

import Link from "next/link";
import { Mail, MessageCircle, Store, ClipboardList } from "lucide-react";

export default function B2BSupportSidebar() {
  return (
    <aside className="fixed right-0 top-1/2 -translate-y-1/2 w-16 z-50 flex flex-col items-center py-4 bg-white border-l border-y border-outline-variant shadow-lg rounded-l-xl">
      <div className="flex flex-col gap-2 w-full px-2">
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
