"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Factory, Award, Globe, Leaf, ArrowRight, Star, Users, Cpu, Barcode, Layers, ShieldAlert, Zap, ThermometerSun, Activity, Bike, Backpack, Heart, Compass, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeCategoryLabel, localizeProduct } from "@/i18n/productLocalization";

// Register ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_SLIDES = [
  {
    image: "https://sc02.alicdn.com/kf/H4c630229a2d94284ba9fe77aa0e566eeH.jpg",
    tag: "INDUSTRIAL-GRADE GEAR • OEM/ODM SPECIALIST",
    title: "ENGINEERED FOR EXTREME ENVIRONMENTS",
    desc: "Direct-to-factory wholesale solutions. 15+ years of supplying high-load, weather-resistant outdoor gear to world-class brands.",
  },
  {
    image: "https://sc02.alicdn.com/kf/Hec2951bf31884dfb88f7485f1c30d7e0u.jpg",
    tag: "HIGH-FREQUENCY SEAMLESS BONDING",
    title: "100% WATERPROOF DRY BAG SOLUTIONS",
    desc: "IPX6 certified airtight waterproof structures. Perfect for marine exploration, paddleboarding, and extreme storm protection.",
  },
  {
    image: "https://sc02.alicdn.com/kf/Hc1f85db72c7d421a886a35ac7fddd8cd8.png",
    tag: "RUGGED RIDER & BIKE PACKS",
    title: "INNOVATIVE MOTORCYCLE & CYCLING LUGGAGE",
    desc: "Equipped with quick-release locks, anti-abrasion back panels, and heavy-duty load bearing. Ready for heavy adventure touring.",
  }
];const HOMEPAGE_CATEGORIES = [
  {
    name: "Running Vest",
    slug: "running_vest",
    image: "/images/products/prod_1601053928392.jpg",
  },
  {
    name: "Bicycle Bag",
    slug: "bicycle_bag",
    image: "/images/products/prod_1600163590335.jpg",
  },
  {
    name: "Motorcycle Bag",
    slug: "motorcycle_bag",
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
  },
  {
    name: "Hiking Outdoor Bag",
    slug: "hiking_outdoor_bag",
    image: "/images/products/prod_1600627082207.jpg",
  },
  {
    name: "Waterproof Bag",
    slug: "waterproof_bag",
    image: "https://sc02.alicdn.com/kf/H623d4e0b82374152bfe93a92f3341081Q.png",
  },
];

import productsData from "./products/productsData.json";

interface FeaturedProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  material: string;
  moq: number;
  leadTime: number;
  image: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = (productsData as any[])
  .filter((p) => p.isBest || p.isNew)
  .slice(0, 16)
  .map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category,
    material: p.material,
    moq: p.moq,
    leadTime: p.leadTime,
    image: p.image
  }));

export default function Home() {
  const { language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const valPropRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const strengthRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-play slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);  useEffect(() => {
    // Shared high-performance animation config
    const animConfig = {
      duration: 0.8,
      ease: "power2.out",
      force3D: true, // Force hardware acceleration
    };

    // 1. Value Proposition Animations - Slow organic fade-up
    const valCards = valPropRef.current?.querySelectorAll(".val-card");
    if (valCards) {
      gsap.fromTo(
        valCards,
        { opacity: 0, y: 40 },
        {
          ...animConfig,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: valPropRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // 2. Scenario Category trigger animation - Elegant reveal
    const scenarioCards = scenarioRef.current?.querySelectorAll(".scenario-card");
    if (scenarioCards) {
      gsap.fromTo(
        scenarioCards,
        { opacity: 0, y: 40 },
        {
          ...animConfig,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: scenarioRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // 3. Material Bento Grid Animations - Subtle scale
    const bentoCards = bentoRef.current?.querySelectorAll(".bento-card");
    if (bentoCards) {
      gsap.fromTo(
        bentoCards,
        { opacity: 0, scale: 0.98, y: 30 },
        {
          ...animConfig,
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // 4. Product Showcase Animations - Waterfall staggered reveal
    const prodCards = showcaseRef.current?.querySelectorAll(".prod-card");
    if (prodCards) {
      gsap.fromTo(
        prodCards,
        { opacity: 0, y: 40 },
        {
          ...animConfig,
          opacity: 1,
          y: 0,
          stagger: 0.08,
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // 5. Strength Section Animations - Smooth horizontal slide
    const strengthItems = strengthRef.current?.querySelectorAll(".strength-item");
    if (strengthItems) {
      gsap.fromTo(
        strengthItems,
        { opacity: 0, x: -30 },
        {
          ...animConfig,
          opacity: 1,
          x: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: strengthRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // 6. OEM Customization Timeline Animation - Soft float in
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-step");
    if (timelineItems) {
      gsap.fromTo(
        timelineItems,
        { opacity: 0, y: 30 },
        {
          ...animConfig,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
          }
        }
      );
    }
    
    // Refresh ScrollTrigger to recalculate positions after initial render layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, []);

  return (
    <div className="w-full relative overflow-x-hidden bg-white text-on-surface">
           {/* 1. Hero Section (Autoplay Slideshow) */}
      <section 
        ref={heroRef}
        className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-[#0f172a]"
      >
        {/* Tech HUD overlay grid */}
        <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none z-15" />
        <div className="absolute inset-x-6 top-6 bottom-6 border border-white/5 pointer-events-none z-15 hidden md:block">
          {/* Corner crosshairs and stats */}
          <div className="absolute top-4 left-4 text-white/30 font-mono text-[9px] tracking-widest">SYS: ACTIVE [LOC: XM_CN]</div>
          <div className="absolute top-4 right-4 text-white/30 font-mono text-[9px] tracking-widest">IDEAS_COOL // R&D_CORE</div>
          <div className="absolute bottom-4 left-4 text-white/30 font-mono text-[9px] tracking-widest">[ LAT 24.7069 / LON 118.1413 ]</div>
          <div className="absolute bottom-4 right-4 text-white/30 font-mono text-[9px] tracking-widest">REF: 361110_STATION</div>
          <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/20" />
          <div className="absolute top-0 left-0 w-[1px] h-4 bg-white/20" />
          <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/20" />
          <div className="absolute top-0 right-0 w-[1px] h-4 bg-white/20" />
          <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-white/20" />
          <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-white/20" />
          <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-white/20" />
          <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-white/20" />
        </div>

        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('${slide.image}')`
            }} />
            {/* Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-[#0f172a]/30 z-10" />

            {/* Slide Content */}
            <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full h-full flex items-center text-white">
              <div className="max-w-3xl">
                <span className="font-label-sm text-high-vis-orange uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">
                  {slide.tag}
                </span>
                <h1 className="font-display-xl text-3xl sm:text-4xl md:text-5xl lg:text-display-xl mb-4 sm:mb-6 leading-tight lg:leading-none uppercase">
                  {slide.title}
                </h1>
                <p className="font-body-lg text-xs sm:text-sm md:text-body-lg mb-8 sm:mb-10 text-white/80 max-w-xl">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link href="/products">
                    <button className="bg-high-vis-orange text-white px-6 py-3.5 sm:px-10 sm:py-5 font-headline-md text-xs sm:text-base uppercase font-bold hover:bg-high-vis-orange/90 transition-all cursor-pointer rounded-none">
                      View Catalog
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="border border-white/30 text-white hover:bg-white/10 px-6 py-3.5 sm:px-10 sm:py-5 font-headline-md text-xs sm:text-base uppercase font-bold transition-all cursor-pointer rounded-none">
                      Request a Quote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-35 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "bg-high-vis-orange w-6" : "bg-white/50 hover:bg-white w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Value Proposition */}
      <section ref={valPropRef} className="py-20 bg-surface-container-low border-b border-outline-variant relative overflow-hidden">
        <div className="absolute inset-0 engineering-dots pointer-events-none opacity-40" />
        <div className="absolute -top-40 -left-40 w-96 h-96 glow-teal pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 glow-orange pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          <div className="px-5 py-8 md:px-6 border border-high-vis-orange bg-white hover:border-primary hover:shadow-xl transition-all group val-card opacity-0 relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            <Factory className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">Direct Factory Price</h3>
            <p className="text-secondary text-sm">Direct connection to factory quotes. No middleman markups, ensuring healthy margins and price transparency.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-high-vis-orange bg-white hover:border-primary hover:shadow-xl transition-all group val-card opacity-0 relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            <Award className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">15+ Years Expertise</h3>
            <p className="text-secondary text-sm">Decades of research in technical fabrics and structural weight distribution, engineered to withstand extreme climates.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-high-vis-orange bg-white hover:border-primary hover:shadow-xl transition-all group val-card opacity-0 relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            <Globe className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">Global Logistics</h3>
            <p className="text-secondary text-sm">Experienced in international freight, supporting multi-port LCL container consolidations and smooth customs clearance.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-high-vis-orange bg-white hover:border-primary hover:shadow-xl transition-all group val-card opacity-0 relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            <Leaf className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">GRS Recycled Tech</h3>
            <p className="text-secondary text-sm">Supplying certified recycled nylon fabrics and PFC-free water-resistant coating to meet international ecological compliance.</p>
          </div>

        </div>
      </section>

      {/* Tech Divider 01 */}
      <div className="w-full h-[1px] bg-primary/30 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[8px] font-mono text-outline tracking-[0.2em] border border-primary/20 flex items-center gap-1.5 pointer-events-none uppercase">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span>IDEAS_COOL // CAPABILITY_MODULE</span>
          <span className="text-[10px] font-bold text-primary">+</span>
        </div>
      </div>

      {/* 3. Product Categories Grid */}
      <section ref={scenarioRef} className="py-20 bg-[#f4f5f0] border-y border-outline-variant w-full relative overflow-hidden">
        {/* Subtle grid and glows */}
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-teal opacity-20 pointer-events-none" />

        {/* Huge technical watermark text */}
        <div className="absolute -top-6 -left-10 text-[90px] md:text-[160px] font-black text-on-surface/[0.03] uppercase tracking-[0.2em] font-mono pointer-events-none select-none">
          CATALOG
        </div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16 animate-fade-trigger">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">WHOLESALE CATALOG</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Explore All Product Categories</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {HOMEPAGE_CATEGORIES.map((cat, index) => {
              const catProducts = (productsData as any[]).filter((p) => p.category === cat.slug);
              const count = catProducts.length;
              const firstProduct = catProducts[0];
              const usesConfiguredImage = ["running_vest", "bicycle_bag", "hiking_outdoor_bag"].includes(cat.slug);
              const categoryImage = usesConfiguredImage ? cat.image : firstProduct?.image || cat.image;

              // Create an irregular bento grid layout for exactly 5 items
              let spanClass = "col-span-1 row-span-1";
              if (index === 0) spanClass = "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2";
              else if (index === 1) spanClass = "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1";
              else if (index === 2) spanClass = "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1";
              else if (index === 3) spanClass = "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1";
              else if (index === 4) spanClass = "md:col-span-1 lg:col-span-2 md:row-span-1 lg:row-span-1";

              const localizedCategoryName = localizeCategoryLabel(cat.slug, language);

              return (
                <Link 
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className={`bg-white border border-outline-variant hover:border-primary hover:shadow-xl transition-all duration-500 group flex flex-col scenario-card opacity-0 relative overflow-hidden ${spanClass}`}
                >
                  {/* Image Area - flex-grow to fill the staggered grid cell */}
                  <div className="relative flex-grow w-full overflow-hidden bg-white">
                    <Image 
                      src={categoryImage} 
                      alt={localizedCategoryName}
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 md:p-10 transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Item Count Overlay Badge */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-md text-primary text-[9px] sm:text-[10px] font-bold font-mono px-2 py-0.5 sm:px-3 sm:py-1 border border-outline-variant shadow-sm rounded-sm">
                      {count} Items
                    </div>
                  </div>
                  {/* Text Area */}
                  <div className="p-4 sm:p-6 text-center bg-white border-t border-outline-variant/30 flex-shrink-0">
                    <h3 className={`font-headline-md font-bold mb-1 group-hover:text-primary transition-colors ${index === 0 ? 'text-lg sm:text-2xl text-primary' : 'text-sm sm:text-base text-on-surface'}`}>
                      {localizedCategoryName}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] text-secondary group-hover:text-primary transition-colors font-mono tracking-wider uppercase flex items-center justify-center gap-1">
                      Explore Collection <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Divider 02 */}
      <div className="w-full h-[1px] bg-primary/30 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[8px] font-mono text-outline tracking-[0.2em] border border-primary/20 flex items-center gap-1.5 pointer-events-none uppercase">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span>IDEAS_COOL // PRODUCT_CATALOG</span>
          <span className="text-[10px] font-bold text-primary">+</span>
        </div>
      </div>

      {/* 4. Material & Technology Bento Grid */}
      <section ref={bentoRef} className="py-section-gap w-full relative overflow-hidden bg-white">
        <div className="absolute inset-0 engineering-dots opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 glow-teal pointer-events-none" />

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">CRAFT & MATERIALS</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Advanced Materials & Technology</h2>
            <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
          </div>

          {/* Bento Layout Grid */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Big Box 1: Cordura (Solid Primary Green) */}
            <div className="col-span-12 md:col-span-8 bg-primary text-white rounded-3xl p-8 md:p-12 flex flex-col justify-between group bento-card opacity-0 min-h-[300px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex justify-between items-start">
                <Layers className="text-white group-hover:rotate-12 transition-transform duration-500" size={40} />
                <span className="font-label-sm text-[10px] text-white border border-white/30 px-4 py-1.5 rounded-full font-mono uppercase bg-white/5 backdrop-blur-sm">Tensile Core</span>
              </div>
              <div className="mt-8">
                <h3 className="font-headline-lg text-2xl md:text-3xl text-white font-bold mb-3">High-Density Ripstop Fabric</h3>
                <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
                  We utilize high-density Cordura® & 420D double-line ripstop nylon with premium polyurethane DWR coatings. Tested to withstand extreme tearing forces and direct friction.
                </p>
              </div>
            </div>

            {/* Box 2: High frequency welding (Light Gray) */}
            <div className="col-span-12 md:col-span-4 bg-surface-container rounded-3xl p-8 flex flex-col justify-between group bento-card opacity-0 min-h-[300px] hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex justify-between items-start">
                <Zap className="text-primary group-hover:scale-110 transition-transform duration-500" size={40} />
                <span className="font-label-sm text-[10px] text-primary border border-primary/30 px-3 py-1 rounded-full font-mono uppercase bg-white/50">100% Sealed</span>
              </div>
              <div className="mt-8">
                <h3 className="font-headline-lg text-lg text-on-surface font-bold mb-3">Seamless Welding</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Using electro-magnetic energy to fuse layers, forming seamless water-tight bonds that easily handle IPX6 submersions.
                </p>
              </div>
            </div>

            {/* Box 3: Ergo Mesh (Warm Stone) */}
            <div className="col-span-12 md:col-span-4 bg-[#f4f5f0] rounded-3xl p-8 flex flex-col justify-between group bento-card opacity-0 min-h-[300px] hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex justify-between items-start">
                <ThermometerSun className="text-primary group-hover:-translate-y-2 transition-transform duration-500" size={40} />
                <span className="font-label-sm text-[10px] text-primary border border-primary/30 px-3 py-1 rounded-full font-mono uppercase bg-white/50">Air Flow</span>
              </div>
              <div className="mt-8">
                <h3 className="font-headline-lg text-lg text-on-surface font-bold mb-3">Ergo-Vent Systems</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Suspended mesh panels combined with dual-density foam decrease contact back temperatures by up to 3°C.
                </p>
              </div>
            </div>

            {/* Big Box 4: Impact Hardshell (Deep Slate Blue) */}
            <div className="col-span-12 md:col-span-8 bg-[#0f172a] text-white rounded-3xl p-8 md:p-12 flex flex-col justify-between group bento-card opacity-0 min-h-[300px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex justify-between items-start">
                <ShieldAlert className="text-high-vis-orange group-hover:scale-110 transition-transform duration-500" size={40} />
                <span className="font-label-sm text-[10px] text-white border border-white/30 px-4 py-1.5 rounded-full font-mono uppercase bg-white/5 backdrop-blur-sm">Rider Protect</span>
              </div>
              <div className="mt-8">
                <h3 className="font-headline-lg text-2xl md:text-3xl text-white font-bold mb-3">Impact Hardshell & Polycarbonate Armor</h3>
                <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">
                  Specially designed for cycling and motorcycle luggage lines. Molded rigid composite shields resist dynamic impact forces, protecting sensitive inner items in extreme environments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Divider 03 */}
      <div className="w-full h-[1px] bg-primary/30 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[8px] font-mono text-outline tracking-[0.2em] border border-primary/20 flex items-center gap-1.5 pointer-events-none uppercase">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span>IDEAS_COOL // MATERIAL_SCIENCE</span>
          <span className="text-[10px] font-bold text-primary">+</span>
        </div>
      </div>

      {/* 5. Product Showcase */}
      <section ref={showcaseRef} className="py-20 bg-primary text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.05] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 glow-teal opacity-50 pointer-events-none" />

        {/* Huge technical watermark text */}
        <div className="absolute -top-6 -right-10 text-[90px] md:text-[160px] font-black text-white/[0.03] uppercase tracking-[0.2em] font-mono pointer-events-none select-none">
          BEST_SELL
        </div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-high-vis-orange uppercase tracking-widest block mb-2 font-mono">BEST SELLERS</span>
            <h2 className="font-headline-lg text-headline-lg text-white font-bold uppercase">Featured Wholesale Products</h2>
            <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
          </div>

          {/* 4x4 Grid (16 Product Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {FEATURED_PRODUCTS.map((prod) => {
              const localizedProduct = localizeProduct(prod, language);

              return (
              <div 
                key={prod.id}
                className="border border-high-vis-orange bg-white flex flex-col group prod-card opacity-0 relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br hover:shadow-xl hover:border-primary transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
                  <Image 
                    src={prod.image} 
                    alt={localizedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white font-label-sm px-3 py-1 uppercase tracking-tight text-[10px] font-mono border border-white/10">
                    MOQ {prod.moq}
                  </span>
                </div>
                <div className="p-6 border-t border-outline-variant bg-white flex-grow flex flex-col justify-between">
                  <div>
                    <p className="font-label-sm text-primary/80 mb-1 font-mono text-[10px]">SKU: {prod.sku}</p>
                    <h4 className="font-headline-md text-sm mb-4 text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/products/${prod.id}`}>
                        {localizedProduct.name}
                      </Link>
                    </h4>
                  </div>
                  <div className="flex justify-between items-center text-xs text-secondary border-t border-outline-variant pt-4 font-mono">
                    <span>MOQ: {prod.moq} pcs</span>
                    <span>Lead: {prod.leadTime} Days</span>
                  </div>
                </div>
              </div>
            )})}
          </div>

          {/* More Button */}
          <div className="flex justify-center mt-16">
            <Link href="/products">
              <button className="bg-primary text-white px-10 py-5 font-headline-md text-sm uppercase font-bold hover:bg-high-vis-orange transition-all cursor-pointer rounded-none">
                View More Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Divider 04 */}
      <div className="w-full h-[1px] bg-primary/30 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[8px] font-mono text-outline tracking-[0.2em] border border-primary/20 flex items-center gap-1.5 pointer-events-none uppercase">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span>IDEAS_COOL // BEST_SELLERS</span>
          <span className="text-[10px] font-bold text-primary">+</span>
        </div>
      </div>

      {/* 6. Manufacturing Strength */}
      <section ref={strengthRef} className="py-20 bg-primary text-white relative overflow-hidden w-full">
        <div className="absolute inset-0 topographic-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-teal opacity-30 pointer-events-none" />
        
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center relative z-10">
          
          <div className="space-y-8">
            <span className="font-label-sm text-high-vis-orange uppercase tracking-widest block font-mono">FACTORY CAPABILITY</span>
            <h2 className="font-headline-lg text-headline-lg text-white">Industrial Scale & R&D Excellence</h2>
            
            <div className="space-y-8">
              
              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6 border border-white/10">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">R&D and Engineering Depth</h4>
                  <p className="text-white/60 text-sm">Dedicated design lab with 45 experienced R&D technicians and structural engineers specializing in ergonomic load distribution.</p>
                </div>
              </div>

              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6 border border-white/10">
                  <Cpu className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">State-of-the-Art Equipment</h4>
                  <p className="text-white/60 text-sm">24 modular lean sewing lines, equipped with CNC smart lasers and computerized automatic bar-tacking stations.</p>
                </div>
              </div>

              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6 border border-white/10">
                  <Barcode className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">Traceable Digital Inspection</h4>
                  <p className="text-white/60 text-sm">Rigorous 4-stage quality control from imported yarn inspection to final carton packing, fully registered in our supply trace system.</p>
                </div>
              </div>

            </div>

            <Link href="/contact" className="inline-block mt-4">
              <button className="border border-high-vis-orange text-high-vis-orange px-8 py-4 font-label-sm uppercase font-bold hover:bg-high-vis-orange hover:text-white transition-colors cursor-pointer rounded-none">
                Schedule Factory Video Tour
              </button>
            </Link>
          </div>

          {/* Styled Tech frame for Video */}
          <div className="relative h-[480px] md:h-[600px] w-full border border-white/20 p-3 bg-white/5 backdrop-blur-sm relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br shadow-2xl">
            {/* Live indicator badge */}
            <div className="absolute top-6 left-6 z-20 bg-red-600/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase animate-pulse flex items-center gap-1.5 shadow-md border border-white/10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-ping" />
              LIVE STREAM // CAM_01
            </div>
            
            <div className="w-full h-full relative overflow-hidden bg-black">
              <video 
                src="/images/gongchang.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* Tech Divider 05 */}
      <div className="w-full h-[1px] bg-primary/30 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[8px] font-mono text-primary/80 tracking-[0.2em] border border-primary/20 flex items-center gap-1.5 pointer-events-none uppercase">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span>IDEAS_COOL // FACTORY_OVERVIEW</span>
          <span className="text-[10px] font-bold text-primary">+</span>
        </div>
      </div>

      {/* 7. OEM/ODM B2B custom process interactive timeline */}
      <section ref={timelineRef} className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative overflow-hidden bg-[#f4f5f0] border-y border-outline-variant">
        <div className="absolute inset-0 engineering-dots opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-teal opacity-20 pointer-events-none" />

        {/* Huge technical watermark text */}
        <div className="absolute -bottom-10 -right-10 text-[90px] md:text-[160px] font-black text-on-surface/[0.03] uppercase tracking-[0.2em] font-mono pointer-events-none select-none">
          PROCESS
        </div>
        
        <div className="text-center mb-16 relative z-10">
          <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">PARTNERSHIP PROCESS</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">OEM/ODM Customization Timeline</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
          {/* Horizontal connecting dotted line on desktop */}
          <div className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-transparent border-t-2 border-dashed border-outline-variant -z-10" />

          {/* Step 1 */}
          <div className="bg-white border border-outline-variant p-6 hover:shadow-xl hover:border-primary transition-all text-center group timeline-step opacity-0 relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant text-primary flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
              01
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Inquiry & RFQ</h4>
            <p className="text-secondary text-xs">Send specifications, drawings or sketches. 24h fast feedback.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-outline-variant p-6 hover:shadow-xl hover:border-primary transition-all text-center group timeline-step opacity-0 relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant text-primary flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
              02
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Design & CAD</h4>
            <p className="text-secondary text-xs">CAD modeling, material verification, and quote options within 3 Days.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-outline-variant p-6 hover:shadow-xl hover:border-primary transition-all text-center group timeline-step opacity-0 relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant text-primary flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
              03
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Prototyping</h4>
            <p className="text-secondary text-xs">Fast sample room cutting and stitch preparation in 5 Days.</p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-outline-variant p-6 hover:shadow-xl hover:border-primary transition-all text-center group timeline-step opacity-0 relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant text-primary flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
              04
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Bulk Manufacture</h4>
            <p className="text-secondary text-xs">24 modular lean assembly sewing lines complete bulk orders in 20-30 Days.</p>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-outline-variant p-6 hover:shadow-xl hover:border-primary transition-all text-center group timeline-step opacity-0 relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant text-primary flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
              05
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">QC & Delivery</h4>
            <p className="text-secondary text-xs">Materials test chamber certificate, final shipping and customs consolidation.</p>
          </div>
        </div>
      </section>

      {/* 8. Industry Trust / Testimonials */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full border-t border-outline-variant">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-1">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-4 block">INDUSTRY TRUST</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Client Testimonials</h2>
            <p className="text-secondary">Direct reviews from product managers and logistics coordinators who trust us with their annual supplies.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            
            <div className="bg-surface-container p-10 border-l-4 border-high-vis-orange space-y-4">
              <div className="flex text-high-vis-orange">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="font-body-lg italic text-sm text-on-surface">
                &ldquo;Ideas Cool's precision on seam stitching tension and robust frame support redefined our flagship technical pack line. They hit our exact specifications.&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary text-sm">Marcus Thorne</p>
                <p className="font-label-sm text-outline">Director of Product Design, NorthPeak Gear</p>
              </div>
            </div>

            <div className="bg-surface-container p-10 border-l-4 border-high-vis-orange space-y-4">
              <div className="flex text-high-vis-orange">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="font-body-lg italic text-sm text-on-surface">
                &ldquo;Thanks to their advanced high-frequency welding machines and leak pressure tests, we confidently expanded our waterproof order from 5,000 to 50,000 units.&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary text-sm">Elena Rodriguez</p>
                <p className="font-label-sm text-outline">VP of Supply Chain, AquaVentures</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Exhibition Showcase */}
      <section className="py-section-gap bg-surface-container-low border-t border-outline-variant w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">GLOBAL ENGAGEMENT</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Our Global Exhibitions</h2>
              <div className="h-1 w-20 bg-high-vis-orange mt-4" />
            </div>
            {/* Carousel navigation buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const track = document.getElementById("exhibition-track");
                  if (track) {
                    track.scrollBy({ left: -track.clientWidth * 0.75, behavior: "smooth" });
                  }
                }}
                className="w-10 h-10 flex items-center justify-center border border-high-vis-orange text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer font-bold font-mono"
                aria-label="Previous Slide"
              >
                &lt;
              </button>
              <button 
                onClick={() => {
                  const track = document.getElementById("exhibition-track");
                  if (track) {
                    track.scrollBy({ left: track.clientWidth * 0.75, behavior: "smooth" });
                  }
                }}
                className="w-10 h-10 flex items-center justify-center border border-high-vis-orange text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer font-bold font-mono"
                aria-label="Next Slide"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Horizontal scroll track with 4 avif images */}
          <div 
            id="exhibition-track"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 scroll-smooth"
          >
            {[
              "/images/1.avif",
              "/images/2.avif",
              "/images/5.avif",
              "/images/4.avif"
            ].map((src, index) => (
              <div 
                key={index} 
                onClick={() => setActiveLightboxImage(src)}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start relative aspect-[4/3] border border-outline-variant bg-white shadow-sm group overflow-hidden cursor-zoom-in"
              >
                <Image 
                  src={src} 
                  alt={`Exhibition Booth Showcase ${index + 1}`} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <span className="text-white font-mono text-xs uppercase tracking-wider">Ideas Cool Exhibition Booth #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-body-md text-secondary text-sm text-center mt-10 max-w-2xl mx-auto">
            Inspect our high-performance samples and meet our engineering team face-to-face at global trade shows. We welcome outdoor brands, retailers, and OEM/ODM distributors to build joint partnerships.
          </p>
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
              alt="Zoomed Exhibition View" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

    </div>
  );
}
