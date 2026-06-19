"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, Briefcase, Award, Users, Library, TrendingUp, Shield, Map, Star, Laptop, Trophy, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const PROGRAMMES = [
  { 
    name: "Computer Science And\nEngineering", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    intake: 90,
    href: "/programmes?branch=cse"
  },
  { 
    name: "CSE - Artificial Intelligence\nAnd Machine Learning", 
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    intake: 120,
    href: "/programmes?branch=aiml"
  },
  { 
    name: "Electronics &\nCommunication\nEngineering", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    intake: 60,
    href: "/programmes?branch=ece"
  },
  { 
    name: "Civil\nEngineering", 
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop",
    intake: 30,
    href: "/programmes?branch=civil"
  },
];

const BENTO_FEATURES = [
  {
    title: "Modern Infrastructure",
    description: "Safe & student-friendly campus with state-of-the-art facilities.",
    className: "md:col-span-2 md:row-span-2 bg-[#0a192f] text-white shadow-lg",
    icon: Building2,
  },
  {
    title: "Industry Projects",
    description: "Integrated projects with leading tech companies.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Briefcase,
  },
  {
    title: "Affordable Fees",
    description: "Scholarships available for deserving students.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Award,
  },
  {
    title: "Expert Faculty",
    description: "Dedicated & well-experienced professors.",
    className: "md:col-span-2 bg-[#d4af37] text-white shadow-lg",
    icon: Users,
  },
  {
    title: "Modern Library",
    description: "Well-stocked with the latest journals and books.",
    className: "md:row-span-2 bg-slate-50 text-[#0a192f] border border-slate-200 shadow-sm",
    icon: Library,
  },
  {
    title: "Top Placements",
    description: "Higher salary packages in reputed MNCs.",
    className: "md:col-span-2 bg-[#0a192f] text-white shadow-lg",
    icon: TrendingUp,
  },
  {
    title: "Holistic Growth",
    description: "Focus on personality development and soft skills.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Shield,
  },
  {
    title: "Industrial Visits",
    description: "Regular tours to leading manufacturing and IT hubs.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Map,
  },
  {
    title: "Value Additions",
    description: "Specialized certification programmes.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Star,
  },
  {
    title: "Internships",
    description: "Hands-on experience before graduation.",
    className: "md:col-span-2 bg-slate-100 text-slate-900 border border-slate-200 shadow-sm",
    icon: Laptop,
  },
  {
    title: "Sports & Culture",
    description: "Vibrant campus life with diverse activities.",
    className: "bg-white text-slate-900 border border-slate-100 shadow-sm",
    icon: Trophy,
  },
];

const TRANSPORT_ROUTES = ["Chikkodi", "Hukkeri", "Nippani", "Ichalkaranji", "Raibag", "Kagawad"];

const INNOVATION_LOGOS_TOP = [
  "/logos/1.jpg", "/logos/10.jpeg", "/logos/11.jpeg", "/logos/12.jpeg", "/logos/13.jpeg",
  "/logos/2.webp", "/logos/3.jpg"
];

const INNOVATION_LOGOS_BOTTOM = [
  "/logos/4.jpg", "/logos/5.png", "/logos/6.png", 
  "/logos/7.jpg", "/logos/8.jpeg", "/logos/9.jpeg"
];

// ── Rotating Messages data ──────────────────────────────────────────────────
const MESSAGES = [
  {
    role: "Founder's Message",
    name: "Acharya Shri 108 Gundhar Nandi Ji Maharaj",
    image: "/images/about/swami.png",
    paragraphs: [
      "It is a matter of great privilege and immense pleasure for me to be associated with A.G.M College of Engineering & Technology, Nej-Shamanewadi, Tq: Chikkodi, Dist: Belagavi, Karnataka - 591239. The Students of our college will learn professional and quality skills besides technical expertise. Our holistic approach stimulates innovation among students by inspiring new ideas with creative thinking.",
      "I extend my best wishes to all the students in reaching their objectives and goals that lead to true success in their career path. I feel proud when our students reach new heights by achieving excellence in academics and lead society and nation in the fore front.",
    ],
    quote: "Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society.",
  },
  {
    role: "President's Message",
    name: "Swasti Shri 105 Bhatarak Pattachrya Swamiji",
    image: "/images/about/president.png",
    paragraphs: [
      "Welcome to A.G.M College of Engineering & Technology, Nej-Shamanewadi, a proud institution under the aegis of the prestigious SDM Jain Mutt Group of Institutions. It is our mission to nurture talent, promote innovation, and instill values that shape the engineers of tomorrow.",
      "We are committed to empowering our students with the skills and knowledge required to excel in their professional journeys and contribute meaningfully to society. Together, let us strive for greatness and build a brighter future.",
    ],
    quote: "Together, let us strive for greatness and build a brighter future for every student who walks through our doors.",
  },
  {
    role: "Principal's Message",
    name: "Dr. Ravindra Patil",
    image: "/images/principal.jpeg",
    paragraphs: [
      "A.G.M College of Engineering & Technology is a known Institute since a decade for its qualitative teaching. I have seen students, even with low grades, reaching their highest possibility in terms of academic results. The environment enhances students to aim at their best as they are free from urban hazards.",
      "I extend my best wishes to all students in reaching their objectives and goals that lead to true success in their career path. I feel proud when our students reach new heights by achieving excellence in academics and lead society and nation in the fore front.",
    ],
    quote: "Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society.",
  },
];

function RotatingMessagesSection() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const msg = MESSAGES[active];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0a192f]">
            Messages from <span className="text-[#d4af37]">Leadership</span>
          </h2>
        </div>

        {/* Tab indicators */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {MESSAGES.map((m, i) => (
            <button
              key={i}
              onClick={() => { setFade(false); setTimeout(() => { setActive(i); setFade(true); }, 200); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                active === i
                  ? "bg-[#0a192f] text-[#d4af37] border-[#0a192f]"
                  : "bg-white text-slate-400 border-slate-200 hover:border-[#0a192f] hover:text-[#0a192f]"
              }`}
            >
              {m.role}
            </button>
          ))}
        </div>

        {/* Fixed-size card */}
        <div
          className={`transition-opacity duration-400 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">

              {/* Image side */}
              <div className="lg:col-span-4 relative min-h-[280px] lg:min-h-0 bg-[#0a192f]">
                <Image
                  src={msg.image}
                  alt={msg.name}
                  fill
                  className="object-cover object-top opacity-90"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/20 to-transparent" />
                {/* name plate pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-1">{msg.role}</p>
                  <p className="text-white font-bold text-base font-serif leading-snug">{msg.name}</p>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
                {/* Gold top bar */}
                <div className="hidden lg:block absolute top-0 right-0 w-8/12 h-1 bg-gradient-to-r from-transparent to-[#d4af37]" />

                <div className="space-y-4 flex-1">
                  {msg.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">{p}</p>
                  ))}
                </div>

                {/* Quote */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-[#0a192f] font-serif italic text-base sm:text-lg leading-relaxed">
                    &quot;{msg.quote}&quot;
                  </p>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-6">
                  {MESSAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setFade(false); setTimeout(() => { setActive(i); setFade(true); }, 200); }}
                      className={`rounded-full transition-all duration-500 ${
                        active === i ? "w-8 h-2 bg-[#d4af37]" : "w-2 h-2 bg-slate-200 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to message ${i + 1}`}
                    />
                  ))}
                  <Link href="/about" className="ml-auto text-[10px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#0a192f] transition-colors">
                    Read Full Message →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Admissions Quick-Links section ─────────────────────────────────────────
const ADMISSION_ITEMS = [
  {
    number: "01",
    title: "Admission Procedure",
    desc: "CET / ComedK / AIEEE — as per Karnataka State Govt. regulations.",
    href: "/admissions",
    icon: "📋",
  },
  {
    number: "02",
    title: "Intake",
    desc: "300+ seats across 4 B.E. programmes — CSE, AI&ML, ECE, Civil.",
    href: "/admissions",
    icon: "🎓",
  },
  {
    number: "03",
    title: "Eligibility Criteria",
    desc: "10+2 PCM with CET/ComedK for 1st year; Diploma with DCET for lateral.",
    href: "/admissions",
    icon: "✅",
  },
  {
    number: "04",
    title: "Admission Enquiry",
    desc: "Fill our quick enquiry form and our counsellors will reach out within 24 hrs.",
    href: "/admissions",
    icon: "💬",
  },
];

function AdmissionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const { top } = el.getBoundingClientRect();
      // Once the section top has scrolled past the top of the viewport → apply the effect
      setScrolled(top < 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0a192f] text-white relative overflow-hidden"
      style={{
        borderBottomLeftRadius:  scrolled ? "6rem" : "0",
        borderBottomRightRadius: scrolled ? "6rem" : "0",
        transition: "border-radius 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* bg glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Admissions 2026–27</h2>
          <p className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            Your Journey Starts Here
          </p>
        </div>

        {/* Same list style as Salient Features */}
        <div className="grid grid-cols-2 gap-x-4 lg:gap-x-12 border-t border-white/10 mt-8">
          {ADMISSION_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative py-5 lg:py-7 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-pointer overflow-hidden block"
            >
              {/* hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:gap-4">
                {/* Number + title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                  <span className="text-xs lg:text-sm font-bold text-[#d4af37] opacity-60 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                    {item.number}.
                  </span>
                  <h3 className="text-sm lg:text-2xl font-bold uppercase tracking-tight text-white/60 group-hover:text-white transition-all duration-300 sm:group-hover:translate-x-2 leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Desc + arrow icon */}
                <div className="flex items-center gap-4 shrink-0 sm:w-[280px] mt-1 sm:mt-0">
                  <p className="text-[10px] lg:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 flex-1 leading-snug hidden sm:block">
                    {item.desc}
                  </p>
                  <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-300 shrink-0">
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#0a192f] transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/admissions"
            className="group flex items-center gap-2 bg-[#d4af37] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg hover:bg-[#b5952f] transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore All Admissions Info
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Hero() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col font-sans overflow-x-hidden bg-slate-50">
      
      {/* Top Text Section (Matches Spice Garden Layout Reference) */}
      <section className="pt-6 lg:pt-10 pb-4 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <p className="text-[#d4af37] font-bold tracking-widest uppercase mb-4 text-sm">S.D.M. Jainmatt Trust®</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-[#0a192f] mb-4 leading-none uppercase">
            A.G.M College of <br className="hidden md:block"/> Engineering & Technology
          </h1>
          <h2 className="text-xl md:text-4xl font-serif italic text-slate-700 mb-4">
            Admissions Open for B.E. Course 2026-27
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-6 text-sm md:text-base leading-relaxed">
            Join the radiant beacon of hope for technical excellence. Affiliated to Visvesvaraya Technological University, Belagavi. Approved by AICTE, New Delhi. Recognised by Government of Karnataka.
          </p>
          

        </div>
      </section>

      {/* 4 Stats Blocks Row */}
      <section className="pb-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left border-t border-slate-200 pt-8 pb-4">
            <div>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest mb-2 uppercase">Location</p>
              <p className="text-sm font-bold text-[#0a192f] uppercase mb-1">Nej-Shamanewadi</p>
              <p className="text-[11px] text-slate-500 leading-tight">Tq: Chikkodi, Dist: Belagavi<br/>Karnataka - 591239</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest mb-2 uppercase">Affiliation</p>
              <p className="text-sm font-bold text-[#0a192f] uppercase mb-1">VTU, Belagavi</p>
              <p className="text-[11px] text-slate-500 leading-tight">Visvesvaraya Technological<br/>University</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest mb-2 uppercase">Approval</p>
              <p className="text-sm font-bold text-[#0a192f] uppercase mb-1">AICTE, New Delhi</p>
              <p className="text-[11px] text-slate-500 leading-tight">All India Council for<br/>Technical Education</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest mb-2 uppercase">Programmes</p>
              <p className="text-sm font-bold text-[#0a192f] uppercase mb-1">4 B.E. Courses</p>
              <p className="text-[11px] text-slate-500 leading-tight">CSE, AI & ML, ECE, Civil<br/>Total Intake: 300+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Large Hero Video */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <VideoCard />
      </section>

      {/* Inspirational Message Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-[#d4af37] mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <p className="text-lg md:text-xl xl:text-2xl text-[#0a192f] leading-relaxed font-serif italic text-balance">
            &quot;Under the divine grace and sacred inspiration of His Holiness Rashtrasanta Acharya Shri 108 Gunadharanandi Maharaj, a blessed new chapter dawns. For the first time in Karnataka, the sanctified &apos;Gunadhar Teerth&apos; rises at Dharmanagari Shamanewadi, a radiant beacon of hope devoted to the upliftment of the poor and needy.&quot;
          </p>
        </div>
      </section>

      {/* ── Our Story Section ── */}
      <section id="our-story" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0a192f] tracking-tight">
              Our <span className="text-[#d4af37]">Story</span>
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Campus Image */}
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-slate-200 flex items-center justify-center">
                <Image
                  src="/images/story.png"
                  alt="A.G.M College Campus"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 md:hidden"
                />
                <Image
                  src="/images/desk.png"
                  alt="A.G.M College Campus"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 hidden md:block"
                />
                {/* Gold accent bar on bottom-left */}
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#d4af37]" />
              </div>
              {/* floating stat chip */}
              <div className="absolute -bottom-5 -right-4 hidden sm:flex items-center gap-3 bg-[#0a192f] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#d4af37]/30">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#d4af37] leading-none">300+</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">Annual Intake</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-xl font-bold text-[#d4af37] leading-none">4</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">B.E. Programmes</p>
                </div>
              </div>
            </div>

            {/* Right — Text content */}
            <div className="flex flex-col lg:pt-4">
              {/* overline */}
              <p className="text-[#d4af37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Empowering rural Karnataka through quality education
              </p>

              {/* Body text — split into two readable paragraphs */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                Our institution is committed to delivering quality technical education that empowers young minds and contributes to the growth of society, particularly in rural communities. We strive to nurture future technocrats through innovative teaching methodologies, practical learning experiences, and a strong foundation of professionalism, ethics, and social responsibility.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                By fostering critical thinking, problem-solving abilities, and technical excellence, we prepare students to address real-world challenges. Through student-centric learning, modern technological tools, and collaborative teamwork, we inspire innovation, academic excellence, and meaningful contributions to both the engineering profession and society at large.
              </p>

              {/* CTA link — styled like the reference image */}
              <div className="flex items-center gap-8">
                <a
                  href="/about"
                  className="group flex items-center gap-2 font-bold text-sm text-[#0a192f] hover:text-[#d4af37] transition-colors duration-300 uppercase tracking-widest"
                >
                  Discover More
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-current group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300">
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 10 L10 2 M5 2 H10 V7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Rotating Messages Section ── */}
      <RotatingMessagesSection />

      {/* Academic Programmes Section (Smoky Carousel) */}
      <section id="programmes" className="py-24 bg-slate-50 overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Academic Programs</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-[#0a192f] leading-tight">
              Where engineers are made,<br />not just taught.
            </p>
          </div>

          {/* Horizontally Scrollable Smoky Cards Container (Mobile/Tablet) | Grid (Desktop) */}
          <div 
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto lg:overflow-x-visible pb-8 pt-4 px-2 -mx-2 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PROGRAMMES.map((prog, index) => (
              <Link
                href={prog.href}
                key={index} 
                className="group relative min-w-[320px] w-[85vw] sm:min-w-[400px] sm:w-[450px] lg:min-w-0 lg:w-full h-[450px] lg:h-[550px] shrink-0 snap-start rounded-[1.5rem] overflow-hidden shadow-lg border border-slate-100 cursor-pointer bg-white block"
              >
                {/* Full Background Image */}
                <Image
                  src={prog.image}
                  alt={prog.name.replace('\n', ' ')}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 450px, 25vw"
                />
                
                {/* Smoky White Overlay (Fades on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/50 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* Hover Dark Overlay (Appears on hover to keep text readable and invert theme) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 lg:p-6 z-10">
                  <h3 className="text-3xl lg:text-3xl xl:text-[34px] font-black italic uppercase leading-none tracking-tighter text-[#d4af37] drop-shadow-sm transition-colors duration-500 group-hover:text-white mb-6 whitespace-pre-line">
                    {prog.name}
                  </h3>
                  
                  <div className="pt-5 border-t border-slate-300 group-hover:border-white/20 flex items-center gap-2 mt-auto transition-colors duration-500">
                    <span className="text-[#d4af37] text-[11px] xl:text-[12px] font-extrabold tracking-widest uppercase transition-colors duration-500">
                      Explore Programme
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#d4af37] transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Carousel Nav Buttons placed below the cards to the left side ("other side"). Hidden on desktop as it's a grid. */}
          <div className="flex lg:hidden items-center gap-4 mt-6 px-2">
            <button 
              onClick={scrollLeft} 
              className="w-14 h-14 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-[#0a192f] hover:bg-slate-100 text-[#0a192f] transition-all shadow-sm" 
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button 
              onClick={scrollRight} 
              className="w-14 h-14 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-[#0a192f] hover:bg-slate-100 text-[#0a192f] transition-all shadow-sm" 
              aria-label="Scroll right"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </section>

      {/* Salient Features Section (Awwwards Style) */}
      <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Campus Highlights</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Salient Features
            </p>
          </div>

          {/* Interactive Modern Grid List (Side-by-side on Mobile) */}
          <div className="grid grid-cols-2 gap-x-4 lg:gap-x-12 border-t border-white/10 mt-8">
            {BENTO_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative py-4 lg:py-6 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Subtle Gradient Reveal */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:gap-4">
                    
                    {/* Number and Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                      <span className="text-xs lg:text-sm font-bold text-[#d4af37] opacity-60 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-sm lg:text-2xl font-bold uppercase tracking-tight text-white/60 group-hover:text-white transition-all duration-300 sm:group-hover:translate-x-2 leading-tight">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description & Icon */}
                    <div className="flex items-center gap-4 shrink-0 sm:w-[250px] mt-1 sm:mt-0">
                      <p className="text-[10px] lg:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 flex-1 leading-snug hidden sm:block">
                        {feature.description}
                      </p>
                      <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4 text-white/40 group-hover:text-[#0a192f] transition-all duration-500 -rotate-45 group-hover:rotate-0" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Admissions Quick-Links Section ── */}
      <AdmissionsSection />

      {/* Transport Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Connectivity</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-[#0a192f] leading-tight">
              College Bus Transportation
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-16 shadow-sm relative mt-8">
            <p className="text-slate-500 mb-8 font-medium text-lg text-center mx-auto max-w-2xl">
              All routes seamlessly connect and converge at our state-of-the-art campus, ensuring reliable daily commutes for students.
            </p>
            
            <div className="relative pt-8 md:pt-12 pb-4">
              
              {/* SVG Connecting Dashed Lines Background */}
              {/* Desktop Hub & Spoke */}
              <div className="absolute inset-0 z-0 hidden md:block">
                <svg className="w-full h-full text-[#0a192f]" preserveAspectRatio="none">
                  <defs>
                    <mask id="desktop-line-mask">
                      <motion.rect 
                        x="0" 
                        y="0" 
                        width="100%" 
                        height="100%" 
                        fill="white" 
                        initial={{ y: "100%" }} 
                        whileInView={{ y: "0%" }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 1.5, ease: "easeOut" }} 
                      />
                    </mask>
                  </defs>
                  <g mask="url(#desktop-line-mask)">
                    <line x1="50%" y1="12%" x2="8.33%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="12%" x2="25%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="12%" x2="41.66%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="12%" x2="58.33%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="12%" x2="75%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="12%" x2="91.66%" y2="82%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                  </g>
                </svg>
              </div>

              {/* Mobile Hub & Spoke (2 Columns) */}
              <div className="absolute inset-0 z-0 block md:hidden">
                <svg className="w-full h-full text-[#0a192f]" preserveAspectRatio="none">
                  <defs>
                    <mask id="mobile-line-mask">
                      <motion.rect 
                        x="0" 
                        y="0" 
                        width="100%" 
                        height="100%" 
                        fill="white" 
                        initial={{ y: "100%" }} 
                        whileInView={{ y: "0%" }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 1.5, ease: "easeOut" }} 
                      />
                    </mask>
                  </defs>
                  <g mask="url(#mobile-line-mask)">
                    <line x1="50%" y1="5%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="5%" x2="75%" y2="30%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="5%" x2="25%" y2="60%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="5%" x2="75%" y2="60%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="5%" x2="25%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                    <line x1="50%" y1="5%" x2="75%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
                  </g>
                </svg>
              </div>

              {/* Top Level: The College */}
              <div className="flex justify-center relative z-10 mb-16 md:mb-24">
                <div className="flex flex-col items-center gap-4 group cursor-default relative z-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a192f] border-4 border-[#d4af37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-20">
                    <Building2 className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <div className="bg-[#0a192f] text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-xl border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 text-center">
                    A.G.M College
                  </div>
                </div>
              </div>

              {/* Bottom Level: The Routes */}
              <div className="grid grid-cols-2 md:grid-cols-6 relative z-10 gap-x-4 gap-y-12 md:gap-y-0">
                {TRANSPORT_ROUTES.map((route, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 group cursor-default relative z-20">
                    {/* Route Node */}
                    <div className="w-8 h-8 rounded-full bg-[#0a192f] border-2 border-[#d4af37] flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-500 relative z-20">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    </div>
                    {/* Route Label */}
                    <div className="bg-[#0a192f] text-white px-3 py-2 w-full max-w-[130px] rounded-xl text-sm font-bold shadow-lg border border-white/10 group-hover:-translate-y-2 group-hover:border-[#d4af37]/50 transition-all duration-500 text-center">
                      {route}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Centers Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Research & Development</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-[#0a192f] leading-tight">
              Innovation & Learning Centres
            </p>
          </div>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-4xl">
            Virtual Labs, Autodesk, Oracle Academy, Intel, NVIDIA GPU Education Center, Texas Instruments, e-Yantra, NPTEL, Bentley, Tata Ready Engineer, VLSI, Foss Lab, WSN Lab, Tech Mahindra, Center of Excellence for Data Science & SAP ABAP.
          </p>

          {/* Animated Marquees (Responsive) */}
          <div className="flex relative mt-8 md:mt-12 w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[40px] md:before:w-[60px] before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[40px] md:after:w-[60px] after:bg-gradient-to-l after:from-slate-50 after:to-transparent flex-col gap-4 md:gap-6 py-4">
            
            {/* Custom Marquee Animation Style */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scroll-left {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @keyframes scroll-right {
                from { transform: translateX(-50%); }
                to { transform: translateX(0); }
              }
              .animate-scroll-left {
                animation: scroll-left 35s linear infinite;
              }
              .animate-scroll-right {
                animation: scroll-right 30s linear infinite;
              }
              .animate-scroll-left:hover, .animate-scroll-right:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Top Row: Scrolls Left */}
            <div className="flex animate-scroll-left items-center w-max">
              <div className="flex items-center gap-8 pr-8">
                {INNOVATION_LOGOS_TOP.map((logo, i) => (
                  <div key={`t1-${i}`} className="flex-shrink-0 w-32 h-20 sm:w-56 sm:h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4 sm:p-6 group hover:shadow-md transition-all hover:scale-105 duration-300 cursor-pointer">
                    <Image 
                      src={logo} 
                      alt="Innovation Logo" 
                      width={180} 
                      height={100} 
                      className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-8 pr-8">
                {INNOVATION_LOGOS_TOP.map((logo, i) => (
                  <div key={`t2-${i}`} className="flex-shrink-0 w-32 h-20 sm:w-56 sm:h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4 sm:p-6 group hover:shadow-md transition-all hover:scale-105 duration-300 cursor-pointer">
                    <Image 
                      src={logo} 
                      alt="Innovation Logo" 
                      width={180} 
                      height={100} 
                      className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Scrolls Right */}
            <div className="flex animate-scroll-right items-center w-max">
              <div className="flex items-center gap-8 pr-8">
                {INNOVATION_LOGOS_BOTTOM.map((logo, i) => (
                  <div key={`b1-${i}`} className="flex-shrink-0 w-32 h-20 sm:w-56 sm:h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4 sm:p-6 group hover:shadow-md transition-all hover:scale-105 duration-300 cursor-pointer">
                    <Image 
                      src={logo} 
                      alt="Innovation Logo" 
                      width={180} 
                      height={100} 
                      className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-8 pr-8">
                {INNOVATION_LOGOS_BOTTOM.map((logo, i) => (
                  <div key={`b2-${i}`} className="flex-shrink-0 w-32 h-20 sm:w-56 sm:h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4 sm:p-6 group hover:shadow-md transition-all hover:scale-105 duration-300 cursor-pointer">
                    <Image 
                      src={logo} 
                      alt="Innovation Logo" 
                      width={180} 
                      height={100} 
                      className="max-h-full max-w-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Custom Video Component ──────────────────────────────────────────────────
function VideoCard() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    if (isHoveringVideo) {
      window.addEventListener("mousemove", moveCursor);
    }
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isHoveringVideo]);

  return (
    <div 
      className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-[#0a192f] flex items-center justify-center cursor-none group aspect-video sm:aspect-auto"
      onMouseEnter={() => setIsHoveringVideo(true)}
      onMouseLeave={() => setIsHoveringVideo(false)}
      onClick={() => setIsMuted(!isMuted)}
    >
      <video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-auto object-cover"
      />
      
      {/* Custom Cursor */}
      {isHoveringVideo && (
        <div 
          ref={cursorRef}
          className="fixed pointer-events-none z-[100] flex flex-col items-center justify-center w-20 h-20 bg-[#d4af37]/90 text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl backdrop-blur-sm transition-transform duration-100 ease-out"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-5 h-5 mb-1" />
              Unmute
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 mb-1" />
              Mute
            </>
          )}
        </div>
      )}
    </div>
  );
}
