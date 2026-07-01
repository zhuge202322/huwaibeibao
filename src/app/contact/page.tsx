"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, FileText, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    region: "Select Region",
    subject: "",
    interest: "Outdoor Backpacks",
    quantity: 500,
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        region: "Select Region",
        subject: "",
        interest: "Outdoor Backpacks",
        quantity: 500,
        message: ""
      });
      // Clear success state after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <div className="topographic-bg min-h-screen pb-section-gap font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12">
        
        {/* Hero Header */}
        <div className="mb-16 border-l-8 border-primary pl-8">
          <h1 className="font-display-xl text-display-xl text-primary mb-4 font-bold uppercase">
            Bulk Inquiry & Partnerships
          </h1>
          <p className="font-body-lg text-secondary max-w-2xl text-sm">
            Connect with our engineering and accounts department. We provide factory-direct solutions tailored to your technical drawings, tensile strength specs, GRS recycling standards, and FOB/CIF timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Direct Contact & Factory map */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
            
            {/* Contact cards */}
            <div className="space-y-8">
              
              <div>
                <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4 opacity-60 font-mono">
                  Manufacturing HQ
                </h3>
                <div className="flex items-start gap-4 text-sm text-secondary">
                  <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    No. 102 Pingshan Industrial Avenue, Pingshan District,<br />
                    Shenzhen, Guangdong Province, China<br />
                    Blink Dreams Industrial Park, Bldg East, R&D Center<br />
                    ZIP Code: 518118
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4 opacity-60 font-mono">
                    VIP Hotline
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <Phone size={18} className="text-primary" />
                    <p className="font-bold font-mono">+86 (755) 5550-1234</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4 opacity-60 font-mono">
                    Direct Email
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <Mail size={18} className="text-primary" />
                    <p className="font-bold font-mono text-xs">operation@ideascool.net</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-outline-variant pt-8">
                <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4 opacity-60 font-mono">
                  Instant Messengers
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold">
                  <div className="flex items-center gap-2 bg-white border border-outline-variant px-4 py-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                    <span>WhatsApp: +86 138 0000 1234</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-outline-variant px-4 py-2">
                    <MessageSquare size={14} className="text-primary" />
                    <span>WeChat: EX_GEAR_B2B</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Satellite Map */}
            <div className="relative overflow-hidden aspect-video border border-outline-variant bg-surface-container group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
                alt="Plant Map Grid" 
                fill 
                className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 left-4 z-20 bg-primary text-white p-4 font-mono text-[10px] tracking-wider">
                PLANT 01: ASSEMBLY & INTERNATIONAL LOGISTICS HUB
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="col-span-12 lg:col-span-7 bg-white p-8 md:p-12 border-2 border-outline-variant">
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-300 text-green-800 text-sm flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <span>Inquiry submitted successfully! Our B2B sales engineer will contact you within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm" 
                    placeholder="e.g. Robert Jensen" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm" 
                    placeholder="Company LLC" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Business Email
                  </label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm" 
                    placeholder="professional@company.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Target Region / Country
                  </label>
                  <select 
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm appearance-none focus:outline-none"
                  >
                    <option value="Select Region">Select Country / Region</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                  Subject
                </label>
                <input 
                  type="text" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm" 
                  placeholder="e.g. Q4 Bulk Order Inquiry for Outdoor Backpacks" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Product Line Interest
                  </label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm appearance-none focus:outline-none"
                  >
                    <option value="Outdoor Backpacks">Outdoor Backpacks Series</option>
                    <option value="Bicycle Bags">Bicycle & Motorcycle Bags</option>
                    <option value="Laptop Bags">Business Laptop Backpacks</option>
                    <option value="Waterproof Bags">Seamless Waterproof Bags (OEM)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                    Order Quantity (MOQ 500+)
                  </label>
                  <input 
                    type="number" 
                    min="100"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 500 })}
                    className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none text-sm" 
                    placeholder="Min 500 pcs" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-xs text-on-surface-variant block uppercase tracking-wider font-mono">
                  Detailed Specifications & Custom Demands
                </label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-transparent py-2 font-body outline-none resize-none text-sm" 
                  placeholder="Describe fabric specs, zip requirements (e.g. YKK), buckle choices (e.g. Duraflex), and preferred shipping terms..."
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-5 font-headline-md text-base font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-transform active:scale-[0.98] duration-100 ease-in-out cursor-pointer hover:bg-black"
                >
                  {submitting ? "SUBMITTING..." : (
                    <>
                      <span>SUBMIT BULK INQUIRY</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>

        {/* B2B Services Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-container p-12 border border-outline-variant">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary flex items-center justify-center shrink-0 text-white">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h4 className="font-headline-md text-base text-primary mb-2 font-bold">24-Hour Quote Commitment</h4>
              <p className="text-secondary text-sm leading-relaxed">
                Our sales managers and fabric engineers review your specifications sheets to issue a detailed cost breakdown and freight estimation within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary flex items-center justify-center shrink-0 text-white">
              <FileText size={32} />
            </div>
            <div>
              <h4 className="font-headline-md text-base text-primary mb-2 font-bold">Pre-Production Sampling</h4>
              <p className="text-secondary text-sm leading-relaxed">
                For established partnerships matching bulk requirements, we provide rapid prototype sampling to verify tensile, abrasion, and field performance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
