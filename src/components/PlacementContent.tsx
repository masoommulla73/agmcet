"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Users,
  BookOpen,
  Target,
  Quote,
  Briefcase,
  Brain,
  MessageCircle,
  Clock,
  Presentation,
  Zap,
} from "lucide-react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
type Tab = "cell" | "training";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "cell",     label: "Training & Placement Cell", icon: Users    },
  { id: "training", label: "Training Details",          icon: BookOpen },
];

const OBJECTIVES = [
  "Encompassing every dimension of the Placement Process",
  "Understanding the dynamically changing needs of the corporate through formal structured interactions",
  "Detailed Profiling of the students to identify their aspirations, strengths, weaknesses and potentials",
  "Embarking upon a Fully Enablement Format which will address every issue from competency to career",
  "Students' exposure to Corporate expectations by enabling direct contact in every stage",
  "A 365-Day commitment to the cause that underlines Significance and Preparedness",
  "Focused Competency Enhancement of students in both Technical and Soft-skill areas for Day-One Employability",
];

const TRAINING_EVENTS = [
  {
    title: "Placement Readiness Training Program",
    desc: "Explaining the significance of soft skills and the process of learning, logical reasoning, aptitude, etc.",
  },
  {
    title: "Soft Skill Training by Pentagon Space",
    desc: "Explaining the significance of soft skills and the process of learning, logical reasoning, aptitude, etc.",
  },
  {
    title: "Enhancing English Language Proficiency in Engineering",
    desc: "Explaining communication skills in English and its importance in the engineering field.",
  },
  {
    title: "Bridging the Gap: Communication Skills for Engineers",
    desc: "Explaining the importance of communication skills in the engineering field.",
  },
  {
    title: "Ignition to Yoga",
    desc: "Demonstrating different yoga poses and explaining the health benefits of various asanas.",
  },
  {
    title: 'Protection of "SHE" Nature Through Going Organic',
    desc: "Explaining women hygiene and use of organic products for overall health of women.",
  },
  {
    title: "Application of MATLAB",
    desc: "Explaining MATLAB Software, its installation, and its application in Electrical & Electronics Systems.",
  },
  {
    title: "Simulation of Systems using Bondgraph Technique",
    desc: "Explaining Bondgraph Software, its installation, and its application in Electrical Systems.",
  },
  {
    title: "Interaction Session on How to Crack Bank Exams",
    desc: "Interacting with students on how to crack bank exams, tips and tricks, and facing bank sector interviews.",
  },
  {
    title: "Career Guidance Opportunities",
    desc: "Educating students about career opportunities in the public sector, exam tips, and tricks.",
  },
];

const TRAINING_MODULES = [
  { label: "Aptitude Training",            icon: Brain          },
  { label: "Presentation Skills",          icon: Presentation   },
  { label: "Group Discussion",             icon: MessageCircle  },
  { label: "Personal Grooming",            icon: Users          },
  { label: "Face-to-Face Interview",       icon: Briefcase      },
  { label: "Interpersonal Skills",         icon: Target         },
  { label: "Brain Strain",                 icon: Brain          },
  { label: "Speed Mathematics",            icon: Zap            },
  { label: "Team Building",               icon: Users          },
  { label: "Planning & Goal Setting",      icon: Target         },
  { label: "Listening Skills",             icon: BookOpen       },
  { label: "Logical Reasoning",            icon: Brain          },
  { label: "Situational Conversation",     icon: MessageCircle  },
  { label: "Time Management",              icon: Clock          },
  { label: "Sentence & Para Construction", icon: BookOpen       },
];

const INNOVATION_LOGOS_TOP = [
  "/logos/1.jpg", "/logos/10.jpeg", "/logos/11.jpeg", "/logos/12.jpeg",
  "/logos/13.jpeg", "/logos/2.webp", "/logos/3.jpg",
];
const INNOVATION_LOGOS_BOTTOM = [
  "/logos/4.jpg", "/logos/5.png", "/logos/6.png",
  "/logos/7.jpg", "/logos/8.jpeg", "/logos/9.jpeg",
];

// ─────────────────────────────────────────────
// SHARED UI HELPERS
// ─────────────────────────────────────────────
function Breadcrumb({ activeTab }: { activeTab: Tab }) {
  const label = TABS.find((t) => t.id === activeTab)?.label ?? "";
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] tracking-widest uppercase font-bold">
      <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#d4af37] transition-colors">
        <Home className="w-3 h-3" /> Home
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <Link href="/placement" className="text-slate-400 hover:text-[#d4af37] transition-colors">
        Placement
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <span className="text-[#d4af37]">{label}</span>
    </nav>
  );
}

function HeroBanner({ activeTab }: { activeTab: Tab }) {
  const label = TABS.find((t) => t.id === activeTab)?.label ?? "";
  return (
    <div className="relative bg-[#0a192f] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#d4af37 1px,transparent 1px),linear-gradient(90deg,#d4af37 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative py-10 sm:py-14">
        <Breadcrumb activeTab={activeTab} />
        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white uppercase leading-none tracking-tight">
          {label}
        </h1>
      </div>
    </div>
  );
}

function TabBar({ activeTab, onSelect }: { activeTab: Tab; onSelect: (t: Tab) => void }) {
  return (
    <div className="sticky top-[80px] z-40 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex overflow-x-auto hide-scrollbar -mb-px">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelect(tab.id)}
                className={`shrink-0 flex items-center gap-2 px-5 sm:px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#d4af37] text-[#0a192f]"
                    : "border-transparent text-slate-400 hover:text-[#0a192f] hover:border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-8 bg-[#d4af37] rounded-full shrink-0" />
      <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#0a192f]">{children}</h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: TRAINING & PLACEMENT CELL
// ─────────────────────────────────────────────
function PlacementCellTab() {
  return (
    <div className="py-14 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">

        {/* Intro paragraphs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />
          <div className="p-6 sm:p-10 space-y-5">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our Placement and Training Cell at AGMCET is committed to nurturing student growth and enhancing the
              department&apos;s welfare. With a dedicated team, we have established an efficient recruitment system that
              cultivates a reliable pool of talent, reflecting the core values of our institute. We offer a range of
              facilities and resources to empower students to achieve academic excellence and prepare them for leadership
              roles and impactful careers across various fields.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The Placement Cell monitors employment opportunities and arranges campus recruitment process interviews for
              final-year students while providing internship opportunities for pre-final-year students. The placement
              process for pre-final semester students begins in the month of June, ensuring they are well-prepared for
              all types of interviews well in advance.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div>
          <SectionHeading>Our Objectives</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OBJECTIVES.map((obj, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0a192f] text-[#d4af37] font-extrabold text-xs group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* T&P Officer Message */}
        <div>
          <SectionHeading>Training &amp; Placement Officer&apos;s Message</SectionHeading>
          <div className="bg-[#0a192f] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
            <Quote className="w-10 h-10 text-[#d4af37]/20 mb-4" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6">
              A Message from Our T&amp;P Officer
            </p>
            <div className="space-y-4 relative z-10">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                It is a matter of great privilege and immense pleasure for me to be associated with family AGM Rural
                College of Engineering &amp; Technology. The Students of our college will learn professional and quality
                skills besides technical expertise. Our holistic approach stimulates innovation among students by
                inspiring new ideas with creative thinking.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I extend my best wishes to all the students in reaching their objectives and goals that lead to true
                success in their career path. I feel proud when our students reach new heights by achieving excellence
                in academics and lead society and nation in the fore front.
              </p>
              <p className="text-[#d4af37] font-serif italic text-base sm:text-lg leading-relaxed mt-4">
                &quot;Motivating students with a sense of purpose is the only way to deliver innovative products and
                ensure quality to society.&quot;
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: TRAINING DETAILS
// ─────────────────────────────────────────────
function TrainingDetailsTab() {
  return (
    <div className="bg-slate-50">

      {/* Training Events Cards */}
      <div className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-14">

          <div>
            <SectionHeading>Training Events &amp; Expert Sessions</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {TRAINING_EVENTS.map((ev, i) => (
                <div
                  key={i}
                  className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* card top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />
                  <div className="p-6 flex flex-col flex-1">
                    {/* number badge */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0a192f] text-[#d4af37] font-extrabold text-xs mb-4 group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#0a192f] font-bold text-sm sm:text-base leading-snug mb-3">{ev.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-auto">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Modules — Salient Features style (dark navy, list with dividers) */}
          <section className="rounded-2xl overflow-hidden">
            {/* Section header matching Hero.tsx Salient Features */}
            <div className="bg-[#0a192f] px-6 sm:px-10 pt-10 pb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Curriculum</h2>
                <p className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                  Training Modules
                </p>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-2xl">
                  Formulated to improve student skills for industry readiness and Day-One Employability.
                </p>
              </div>

              {/* List rows — grid-cols-2, matching Hero lines 371-408 exactly */}
              <div className="grid grid-cols-2 gap-x-4 lg:gap-x-12 border-t border-white/10">
                {TRAINING_MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative py-4 lg:py-5 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-pointer overflow-hidden"
                    >
                      {/* Subtle gradient reveal on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:gap-4">

                        {/* Number and Title */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                          <span className="text-xs lg:text-sm font-bold text-[#d4af37] opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300">
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <h3 className="text-sm lg:text-lg font-bold uppercase tracking-tight text-white/60 group-hover:text-white transition-all duration-300 sm:group-hover:translate-x-2 leading-tight">
                            {mod.label}
                          </h3>
                        </div>

                        {/* Icon circle */}
                        <div className="hidden sm:flex w-9 h-9 rounded-full border border-white/10 items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-300 shrink-0">
                          <Icon className="w-4 h-4 text-white/40 group-hover:text-[#0a192f] transition-all duration-500 -rotate-45 group-hover:rotate-0" />
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Innovation & Learning Centres (logos marquee) ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-10">
            <h2 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-3">Research &amp; Development</h2>
            <p className="text-3xl md:text-4xl font-serif font-bold text-[#0a192f] leading-tight">
              Innovation &amp; Learning Centres
            </p>
            <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl">
              Virtual Labs, Autodesk, Oracle Academy, Intel, NVIDIA GPU Education Center, Texas Instruments, e-Yantra,
              NPTEL, Bentley, Tata Ready Engineer, VLSI, Foss Lab, WSN Lab, Tech Mahindra, Center of Excellence for
              Data Science &amp; SAP ABAP.
            </p>
          </div>

          {/* Mobile: 4-column static grid */}
          <div className="grid grid-cols-4 gap-3 md:hidden mt-6">
            {[...INNOVATION_LOGOS_TOP, ...INNOVATION_LOGOS_BOTTOM].map((logo, i) => (
              <div
                key={`mob-${i}`}
                className="bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 aspect-[4/3]"
              >
                <Image
                  src={logo}
                  alt="Innovation partner logo"
                  width={100}
                  height={60}
                  className="max-h-full max-w-full object-contain grayscale opacity-70"
                />
              </div>
            ))}
          </div>

          {/* Desktop: dual animated marquees */}
          <div className="hidden md:flex relative mt-10 w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[80px] before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[80px] after:bg-gradient-to-l after:from-white after:to-transparent flex-col gap-6">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes pl-scroll-left  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
              @keyframes pl-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
              .pl-scroll-left  { animation: pl-scroll-left  35s linear infinite; }
              .pl-scroll-right { animation: pl-scroll-right 30s linear infinite; }
              .pl-scroll-left:hover, .pl-scroll-right:hover { animation-play-state: paused; }
            `}} />

            {/* Row 1 — left */}
            <div className="flex pl-scroll-left items-center w-max">
              {[...INNOVATION_LOGOS_TOP, ...INNOVATION_LOGOS_TOP].map((logo, i) => (
                <div key={`t-${i}`} className="flex-shrink-0 w-52 h-28 mx-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-5 group hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Image src={logo} alt="partner logo" width={160} height={80} className="max-h-full max-w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* Row 2 — right */}
            <div className="flex pl-scroll-right items-center w-max">
              {[...INNOVATION_LOGOS_BOTTOM, ...INNOVATION_LOGOS_BOTTOM].map((logo, i) => (
                <div key={`b-${i}`} className="flex-shrink-0 w-52 h-28 mx-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-5 group hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Image src={logo} alt="partner logo" width={160} height={80} className="max-h-full max-w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export function PlacementContent() {
  const [activeTab, setActiveTab] = useState<Tab>("cell");

  return (
    <>
      <HeroBanner activeTab={activeTab} />
      <TabBar activeTab={activeTab} onSelect={setActiveTab} />
      {activeTab === "cell"     && <PlacementCellTab />}
      {activeTab === "training" && <TrainingDetailsTab />}
    </>
  );
}
