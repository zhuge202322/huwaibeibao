"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Globe, Award, ShieldCheck, HelpCircle, Send } from "lucide-react";
import siteSettings from "@/data/siteSettings.json";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const settings = siteSettings;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant py-section-gap px-margin-mobile md:px-margin-desktop w-full">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Company Info */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className="flex items-center gap-2.5">
            <Image 
              src={settings.logoUrl || "/logo.png"}
              alt={`${settings.siteName} Logo`}
              width={120} 
              height={40} 
              className="object-contain h-10 w-auto"
            />
            <span className="font-body text-lg font-semibold text-primary normal-case">
              {settings.siteName}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            Professional B2B outdoor gear manufacturing solutions. Since 1998, providing high-durability outdoor packs and manufacturing services to global partners.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer rounded-full">
              <Globe size={18} />
            </div>
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer rounded-full">
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>

        {/* Quick Links 1 */}
        <div className="col-span-6 md:col-span-2 space-y-4">
          <h4 className="font-body text-base font-semibold text-primary">Manufacturing</h4>
          <ul className="space-y-3 font-body text-base text-on-surface-variant">
            <li>
              <Link href="/products" className="hover:text-primary transition-colors">
                Product Catalog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                OEM/ODM Customization
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                Factory Tour
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div className="col-span-6 md:col-span-2 space-y-4">
          <h4 className="font-body text-base font-semibold text-primary">Company</h4>
          <ul className="space-y-3 font-body text-base text-on-surface-variant">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="col-span-12 md:col-span-4 bg-surface p-8 border border-outline-variant">
          <h4 className="font-body text-xl font-semibold text-primary mb-4">Manufacturing Bulletin</h4>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Stay updated on our latest B2B manufacturing updates, fabric innovations, and factory price catalogs.
          </p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input 
              className="flex-grow bg-white border border-outline-variant px-4 font-body focus:ring-2 focus:ring-primary focus:outline-none rounded-none text-sm"
              placeholder="Business Email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="bg-primary text-white px-6 py-3 font-bold hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer">
              {subscribed ? "Subscribed" : <Send size={16} />}
            </button>
          </form>
        </div>

      </div>

      {/* Certifications and Copyright */}
      <div className="max-w-container-max mx-auto mt-20 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-sm text-on-surface-variant opacity-70">
          © 2026 {settings.siteName}. All rights reserved. Professional B2B bags provider.
        </p>
        <div className="flex gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Award size={18} className="text-primary" />
            <span className="font-body text-xs font-semibold">ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <ShieldCheck size={18} className="text-primary" />
            <span className="font-body text-xs font-semibold">CE Standard</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <HelpCircle size={18} className="text-primary" />
            <span className="font-body text-xs font-semibold">SGS Verified Factory</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
