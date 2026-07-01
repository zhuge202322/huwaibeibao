"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Compass, Award, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
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
      <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920')`
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
        <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
          <div className="max-w-2xl">
            <span className="font-label-sm text-xs text-primary-fixed-dim bg-primary px-3 py-1 mb-6 inline-block font-mono tracking-widest uppercase">
              SINCE 1998
            </span>
            <h1 className="font-display-xl text-display-xl text-white mb-6 uppercase leading-none">
              ENGINEERED FOR EXTREME PERFORMANCE & RELIABILITY
            </h1>
            <p className="font-body-lg text-sm text-surface-variant/90 max-w-lg">
              From high-precision sample development to large-scale intelligent manufacturing, Ideas Cool builds the safety barriers that handle harsh outdoor environments.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section ref={timelineRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto topographic-bg">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-bold">Our Milestones</h2>
          <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
          {/* Horizontal Line on Desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-outline-variant z-0" />
          
          {/* 1998 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0">
            <div className="w-4 h-4 bg-primary border-4 border-surface absolute top-10 left-0" />
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">1998</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Humble Beginnings</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Founded as a specialized sewing workshop, supplying heavy-duty tactical stitching to regional gear traders, laying the cornerstone of premium craftsmanship.
            </p>
          </div>

          {/* 2008 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0">
            <div className="w-4 h-4 bg-primary border-4 border-surface absolute top-10 left-0" />
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">2008</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Outdoor Transition & Expansion</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Fully introduced internal frame hiking backpack lines, achieved ISO 9001 certification, and established our first industrial park in Shenzhen.
            </p>
          </div>

          {/* 2018 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0">
            <div className="w-4 h-4 bg-primary border-4 border-surface absolute top-10 left-0" />
            <div className="font-headline-md text-headline-md text-high-vis-orange mb-2 font-mono">2018</div>
            <h3 className="font-headline-md text-sm mb-3 text-primary uppercase font-bold">Waterproof & QC Testing Center</h3>
            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Established our high-frequency seamless welding line and materials testing lab, equipped with air pressure, high-low temp, and impact vibration testers.
            </p>
          </div>

          {/* 2026 */}
          <div className="relative z-10 pt-16 timeline-node opacity-0">
            <div className="w-4 h-4 bg-primary border-4 border-surface absolute top-10 left-0" />
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
            
            {/* Left large box */}
            <div className="col-span-12 lg:col-span-8 group relative overflow-hidden border border-outline-variant h-[350px] lg:h-auto">
              <Image 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" 
                alt="Main assembly line"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <span className="font-label-sm text-xs text-[#FF6B35] uppercase font-mono">Assembly Operations</span>
                <h4 className="font-headline-md text-white font-bold mt-1">24 Modular Smart Assembly & Sewing Lines</h4>
              </div>
            </div>

            {/* Right stack */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
              
              <div className="h-[250px] lg:h-1/2 group relative overflow-hidden border border-outline-variant">
                <Image 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600" 
                  alt="Quality check"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h4 className="font-headline-md text-base text-white font-bold">Precision Quality Control & Inspection</h4>
                </div>
              </div>

              <div className="h-[250px] lg:h-1/2 group relative overflow-hidden border border-outline-variant">
                <Image 
                  src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600" 
                  alt="Fabric testing lab"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h4 className="font-headline-md text-base text-white font-bold">Air Tightness & Hydrostatic Testing Station</h4>
                </div>
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
          
          <div className="border-l-4 border-primary pl-8 py-4 value-card opacity-0">
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

          <div className="border-l-4 border-on-primary-container pl-8 py-4 value-card opacity-0">
            <h3 className="font-headline-lg text-lg text-primary uppercase font-bold mb-4">Ecological Responsibility</h3>
            <p className="font-body-md text-sm text-secondary leading-relaxed">
              Committed to clean production. Factory runs on solar power, water is recycled in finishing processes, and we support GRS-certified marine plastics and plastic-free packaging.
            </p>
          </div>

        </div>
      </section>

      {/* Team portrait CTA */}
      <section className="bg-primary text-white py-section-gap relative overflow-hidden w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="font-headline-lg text-headline-lg uppercase font-bold">Professional OEM/ODM R&D Team</h2>
            <p className="font-body-lg text-sm text-surface-variant/80 leading-relaxed">
              Our crew includes master tailors, polymer materials specialists, and international B2B logistics coordinators. We go deep into workshop rows to ensure every seam meets extreme tension and global compliance standards.
            </p>
            <div className="grid grid-cols-2 gap-8 font-mono">
              <div>
                <div className="text-4xl font-bold text-high-vis-orange">45+</div>
                <div className="font-label-sm text-xs uppercase tracking-widest text-surface-variant mt-1">Dedicated R&D Engineers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-high-vis-orange">24h</div>
                <div className="font-label-sm text-xs uppercase tracking-widest text-surface-variant mt-1">Fast English & Spanish Response</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 border border-surface-variant/20" />
            <div className="relative h-[320px] md:h-[400px] w-full border border-outline-variant">
              <Image 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800" 
                alt="Executive team portrait" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
