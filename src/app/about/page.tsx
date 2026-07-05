"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Compass, Award, Eye, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline animation
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-node");
    if (timelineItems) {
      gsap.fromTo(
        timelineItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Values animation
    const valueCards = valuesRef.current?.querySelectorAll(".value-card");
    if (valueCards) {
      gsap.fromTo(
        valueCards,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full">
      
      {/* About Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920')`
        }} />
        <div className="absolute inset-0 z-5 engineering-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-teal opacity-65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 to-[#0f172a]/30 z-10" />
        <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
          <div className="max-w-2xl">
            <span className="font-label-sm text-xs text-high-vis-orange bg-white/5 border border-white/10 px-3 py-1 mb-6 inline-block font-mono tracking-widest uppercase">
              SINCE 1998
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl md:text-display-xl text-white mb-6 uppercase leading-tight md:leading-none">
              ENGINEERED FOR EXTREME PERFORMANCE & RELIABILITY
            </h1>
            <p className="font-body-lg text-sm text-surface-variant/90 max-w-lg">
              From high-precision sample development to large-scale intelligent manufacturing, Ideas Cool builds the safety barriers that handle harsh outdoor environments.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section ref={timelineRef} className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden bg-white">
        <div className="absolute inset-0 engineering-dots opacity-40 pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">OUR MILESTONES</span>
          <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-bold">The Journey of Craftsmanship</h2>
          <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative z-10">
          {/* Horizontal connecting dotted line on desktop */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-transparent border-t-2 border-dashed border-outline-variant -z-10" />
          
          {/* 1998 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0 bg-white border border-outline-variant/60 p-6 tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br hover:shadow-xl transition-all duration-300">
            <div className="w-5 h-5 bg-white border-2 border-high-vis-orange rounded-full absolute top-[38px] left-6 flex items-center justify-center hover:border-high-vis-orange transition-colors duration-300 z-20">
              <span className="w-2 h-2 bg-high-vis-orange rounded-full animate-pulse" />
            </div>
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">1998</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Humble Beginnings</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Founded as a specialized sewing workshop, supplying heavy-duty tactical stitching to regional gear traders, laying the cornerstone of premium craftsmanship.
            </p>
          </div>

          {/* 2008 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0 bg-white border border-outline-variant/60 p-6 tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br hover:shadow-xl transition-all duration-300">
            <div className="w-5 h-5 bg-white border-2 border-high-vis-orange rounded-full absolute top-[38px] left-6 flex items-center justify-center hover:border-high-vis-orange transition-colors duration-300 z-20">
              <span className="w-2 h-2 bg-high-vis-orange rounded-full animate-pulse" />
            </div>
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">2008</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Outdoor Transition & Expansion</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Fully introduced internal frame hiking backpack lines, achieved ISO 9001 certification, and established our first industrial park in Shenzhen.
            </p>
          </div>

          {/* 2018 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0 bg-white border border-outline-variant/60 p-6 tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br hover:shadow-xl transition-all duration-300">
            <div className="w-5 h-5 bg-white border-2 border-high-vis-orange rounded-full absolute top-[38px] left-6 flex items-center justify-center hover:border-high-vis-orange transition-colors duration-300 z-20">
              <span className="w-2 h-2 bg-high-vis-orange rounded-full animate-pulse" />
            </div>
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">2018</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Waterproof & QC Testing Center</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Established our high-frequency seamless welding line and materials testing lab, equipped with air pressure, high-low temp, and impact vibration testers.
            </p>
          </div>

          {/* 2026 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0 bg-white border border-outline-variant/60 p-6 tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br hover:shadow-xl transition-all duration-300">
            <div className="w-5 h-5 bg-white border-2 border-high-vis-orange rounded-full absolute top-[38px] left-6 flex items-center justify-center hover:border-high-vis-orange transition-colors duration-300 z-20">
              <span className="w-2 h-2 bg-high-vis-orange rounded-full animate-pulse" />
            </div>
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">2026</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Smart & Sustainable Era</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Fully adopted GRS recycled fabrics, built a digital supply chain network, and currently serving over 150 international outdoor brand partners.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Factory Infrastructure */}
      <section className="bg-surface-container-low py-section-gap w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-bold">Scale & Intelligent Manufacturing</h2>
              <p className="font-body-lg text-secondary text-sm mt-2">
                Over 12,000 sqm of modern facility, housing 500+ skilled sewing masters and complete testing labs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 items-center font-label-sm text-[11px] text-outline uppercase font-mono">
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> 12k sqm Facility</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> 500+ Sewing Masters</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> BSCI / CE Certified</span>
            </div>
          </div>

          {/* Bento layout */}
          <div className="grid grid-cols-12 gap-gutter h-auto lg:h-[720px]">
            
            {/* Left large box - Interactive Video Tour */}
            <div className="col-span-12 lg:col-span-8 group relative overflow-hidden border border-outline-variant h-[350px] lg:h-auto bg-black flex items-center justify-center">
              <video 
                src="/images/gongchang.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-85 transition-all duration-500 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full pointer-events-none">
                <span className="font-label-sm text-xs text-high-vis-orange uppercase font-mono">Factory In-Action Video</span>
                <h4 className="font-headline-md text-white font-bold mt-1">24 Modular Smart Assembly & Sewing Lines</h4>
              </div>
            </div>

            {/* Right column - Single Full-Height Facility Showcase */}
            <div 
              onClick={() => setActiveLightboxImage("/images/about.png")}
              className="col-span-12 lg:col-span-4 group relative overflow-hidden border border-outline-variant h-[350px] lg:h-auto cursor-zoom-in"
            >
              <Image 
                src="/images/about.png" 
                alt="Ideas Cool Factory Showcase"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full pointer-events-none">
                <h4 className="font-headline-md text-base text-white font-bold">Ideas Cool Showroom & Intelligent Facility</h4>
              </div>
            </div>

          </div>

          {/* Core Testing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-gutter">
            <div className="bg-white p-8 border border-outline-variant">
              <span className="font-label-sm text-xs text-primary uppercase font-mono tracking-widest block mb-2">METRIC 01</span>
              <h4 className="font-headline-md text-base text-primary mb-2 font-bold">Strap Tension & Impact Drop Testing</h4>
              <p className="text-secondary text-sm">Drop testing applies up to 300kg of repeating gravitational pull to verify strap and buckle structural integrity under sudden impact.</p>
            </div>
            <div className="bg-white p-8 border border-outline-variant">
              <span className="font-label-sm text-xs text-primary uppercase font-mono tracking-widest block mb-2">METRIC 02</span>
              <h4 className="font-headline-md text-base text-primary mb-2 font-bold">Hydrostatic Water Head Leak Lab</h4>
              <p className="text-secondary text-sm">Digital tester subjects fabrics to 2000mm water column without any leakage, guaranteeing rain protection under monsoon conditions.</p>
            </div>
            <div className="bg-white p-8 border border-outline-variant">
              <span className="font-label-sm text-xs text-primary uppercase font-mono tracking-widest block mb-2">METRIC 03</span>
              <h4 className="font-headline-md text-base text-primary mb-2 font-bold">Salt Spray Corrosion & Abrasion Testing</h4>
              <p className="text-secondary text-sm">All metal hardware, buckles, and zippers undergo a 48-hour salt spray test to ensure smooth movement under coastal or humid mountain climates.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Certifications strip */}
      <section className="py-20 bg-white border-y border-outline-variant w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-10 font-mono">
            GLOBAL FACTORY CERTIFICATIONS
          </span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <div className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <ShieldCheck size={40} className="text-primary" />
              <span className="font-label-sm text-[10px] font-bold font-mono">ISO 9001:2015</span>
            </div>
            <div className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Award size={40} className="text-primary" />
              <span className="font-label-sm text-[10px] font-bold font-mono">BSCI COMPLIANCE</span>
            </div>
            <div className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Compass size={40} className="text-primary" />
              <span className="font-label-sm text-[10px] font-bold font-mono">CE STANDARDS</span>
            </div>
            <div className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Eye size={40} className="text-primary" />
              <span className="font-label-sm text-[10px] font-bold font-mono">SGS AUDITED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="border-l-4 border-high-vis-orange pl-8 py-4 value-card opacity-0">
            <h3 className="font-headline-lg text-lg text-primary uppercase font-bold mb-4">Quality First</h3>
            <p className="font-body-md text-sm text-secondary leading-relaxed">
              Quality is the lifeline of B2B partnership. We strictly use premium buckles and thread, executing 4 full inspection cycles to guarantee zero-defect bulk delivery.
            </p>
          </div>

          <div className="border-l-4 border-high-vis-orange pl-8 py-4 value-card opacity-0">
            <h3 className="font-headline-lg text-lg text-primary uppercase font-bold mb-4">Technological Innovation</h3>
            <p className="font-body-md text-sm text-secondary leading-relaxed">
              Continuously exploring anti-rip composite fabrics and heat-seal technologies. We offer 3D prototyping to translate ideas into high-performance structures.
            </p>
          </div>

          <div className="border-l-4 border-high-vis-orange pl-8 py-4 value-card opacity-0">
            <h3 className="font-headline-lg text-lg text-primary uppercase font-bold mb-4">Ecological Responsibility</h3>
            <p className="font-body-md text-sm text-secondary leading-relaxed">
              Committed to clean production. Factory runs on solar power, water is recycled in finishing processes, and we support GRS-certified marine plastics and plastic-free packaging.
            </p>
          </div>

        </div>
      </section>

      {/* Company Profile Section */}
      <section className="bg-primary text-white py-section-gap relative overflow-hidden w-full">
        <div className="absolute inset-0 topographic-bg opacity-10 pointer-events-none" />
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div>
            <span className="font-label-sm text-high-vis-orange uppercase tracking-widest block mb-2 font-mono">COMPANY PROFILE</span>
            <h2 className="font-headline-lg text-headline-lg uppercase font-bold text-white">Ideas Cool Co., Limited</h2>
            <div className="h-1 w-20 bg-high-vis-orange mt-4" />
          </div>

          {/* Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-body-lg text-sm leading-relaxed text-surface-variant/90">
            {/* Column 1: History & Core Products */}
            <div className="space-y-6">
               <p>
                <strong>Ideas Cool</strong> is a professional bags manufacturer located in Fujian Province, China. We specially deal with all kinds of bags, including school bags, sports bags, cosmetic bags, bicycle bags, ice bags, backpacks, trolley bags, wallets, cooler bags, travel bags, gift bags, and more.
              </p>
              <p>
                At the same time, most of our high-quality carrying products are exported to American, European countries, and other international markets, earning high trust from B2B partners worldwide.
              </p>
            </div>

            {/* Column 2: Facility Scale & Production Capacity */}
            <div className="space-y-6">
              <p>
                Our manufacturing plant occupies a modern area of <strong>8,000 square meters</strong> and features a highly convenient logistics and transport network. Equipped with advanced professional technicians and superior quality control processes, we currently employ a dedicated team of more than <strong>200 skilled staff</strong>.
              </p>
              <p>
                We have a total annual production capacity of <strong>1,200,000 pieces</strong>, exporting successfully to Europe, North America, South America, India, Pakistan, the Middle East, and other global destinations.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-surface-variant/20 font-mono">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-high-vis-orange">8k+ m²</div>
              <div className="font-label-sm text-[10px] uppercase tracking-widest text-surface-variant mt-2">Facility Area</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-high-vis-orange">200+</div>
              <div className="font-label-sm text-[10px] uppercase tracking-widest text-surface-variant mt-2">Skilled Staff</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-high-vis-orange">1.2M</div>
              <div className="font-label-sm text-[10px] uppercase tracking-widest text-surface-variant mt-2">Annual Capacity (Pcs)</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-high-vis-orange">100%</div>
              <div className="font-label-sm text-[10px] uppercase tracking-widest text-surface-variant mt-2">Export Oriented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveLightboxImage(null); }}
            className="absolute top-6 right-6 text-white hover:text-high-vis-orange transition-colors p-2 z-[310] cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={36} />
          </button>
          <div className="relative max-w-full max-h-[85vh] aspect-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeLightboxImage} 
              alt="Zoomed Facility View" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

    </div>
  );
}
