"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Eye,
  Target,
  Star,
  GraduationCap,
  Users,
  Quote,
  Leaf,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "about" | "founder" | "president" | "principal";

const TABS: { id: Tab; label: string }[] = [
  { id: "about", label: "About Us" },
  { id: "founder", label: "Founder's Message" },
  { id: "president", label: "President's Message" },
  { id: "principal", label: "Principal's Message" },
];

// ── Breadcrumb ──────────────────────────────────────────────────────────────
function Breadcrumb({ activeTab }: { activeTab: Tab }) {
  const tabLabel = TABS.find((t) => t.id === activeTab)?.label ?? "About Us";
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-bold">
      <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#d4af37] transition-colors">
        <Home className="w-3 h-3" /> Home
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <Link href="/about" className="text-slate-400 hover:text-[#d4af37] transition-colors">
        About Us
      </Link>
      {activeTab !== "about" && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#d4af37]">{tabLabel}</span>
        </>
      )}
    </nav>
  );
}

// ── Hero Banner ─────────────────────────────────────────────────────────────
function HeroBanner({ activeTab }: { activeTab: Tab }) {
  const label = TABS.find((t) => t.id === activeTab)?.label ?? "About Us";
  return (
    <div className="relative bg-[#0a192f] overflow-hidden">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#d4af37 1px,transparent 1px),linear-gradient(90deg,#d4af37 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* right-side decorative glow */}
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

// ── Tab Navigation Bar ───────────────────────────────────────────────────────
function TabBar({
  activeTab,
  onSelect,
}: {
  activeTab: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <div className="sticky top-[80px] z-40 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex overflow-x-auto hide-scrollbar -mb-px gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`shrink-0 px-5 sm:px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#d4af37] text-[#0a192f]"
                  : "border-transparent text-slate-400 hover:text-[#0a192f] hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ABOUT US CONTENT ─────────────────────────────────────────────────────────
const CORE_VALUES = [
  {
    icon: GraduationCap,
    title: "Holistic Development",
    desc: "Pursue a successful career in Engineering utilizing knowledge and contribute to the profession as an excellent employee or entrepreneur.",
  },
  {
    icon: Users,
    title: "Student Centric Learning",
    desc: "Apply knowledge of mathematics & fundamentals to analyze & formulate solutions to solve real-time problems.",
  },
  {
    icon: Star,
    title: "Center of Excellence",
    desc: "Exhibit professional and ethical values, communication & teamwork skills, lifelong learning, and multidisciplinary approach to address engineering and societal issues.",
  },
  {
    icon: Leaf,
    title: "Environmental Consciousness",
    desc: "Make use of modern tools for creating innovative career paths to be an entrepreneur and desire for higher studies.",
  },
];

const MISSION_POINTS = [
  "To mould the young minds as emerging technocrats by cultivating innovative teaching and learning, with high standards of professionalism and ethics to serve the society.",
  "To face development challenges and evolving appropriate solutions for sustainable integrated growth.",
  "To inculcate the values of technical education with an affordable system.",
];

function AboutUsContent() {
  return (
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20">

        {/* Vision + Mission — side by side cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-[#0a192f] rounded-2xl p-8 sm:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/5 rounded-bl-full" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#d4af37]/10 text-[#d4af37] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#d4af37] mb-3">Our Vision</h2>
              <p className="text-white text-base sm:text-lg leading-relaxed font-serif">
                To impart quality technical education for young minds and empower the rural sectors by synergizing comprehensive education with social responsibility and ethical values to serve the nation.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37] rounded-l-2xl" />
            <div className="pl-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0a192f]/5 text-[#0a192f] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#d4af37] mb-4">Our Mission</h2>
              <ul className="space-y-4">
                {MISSION_POINTS.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0a192f]">
              Core <span className="text-[#d4af37]">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={i}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0a192f] text-[#d4af37] mb-5 group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[#0a192f] font-bold text-sm mb-3 leading-snug">{val.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── MESSAGE TEMPLATE ─────────────────────────────────────────────────────────
function MessageContent({
  name,
  role,
  imageSrc,
  imageAlt,
  tagline,
  paragraphs,
}: {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  tagline: string;
  paragraphs: string[];
}) {
  return (
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Label */}
        <p className="text-[#d4af37] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">{role}</p>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0a192f]">
            {name}
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Image card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-slate-200">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              {/* name plate */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent pt-12 pb-5 px-5">
                <p className="text-white font-bold text-base font-serif leading-snug">{name}</p>
                <p className="text-[#d4af37] text-[10px] tracking-widest uppercase font-bold mt-1">{role}</p>
              </div>
            </div>
          </div>

          {/* Message card */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10 relative overflow-hidden">
            {/* top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />

            {/* large quote icon */}
            <Quote className="w-10 h-10 text-[#d4af37]/20 mb-4" />

            {/* tagline */}
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6">{tagline}</p>

            {/* message body */}
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function AboutContent() {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  return (
    <>
      <HeroBanner activeTab={activeTab} />
      <TabBar activeTab={activeTab} onSelect={setActiveTab} />

      {activeTab === "about" && <AboutUsContent />}

      {activeTab === "founder" && (
        <MessageContent
          name="Acharya Shri 108 Gundhar Nandi Ji Maharaj"
          role="Founder's Message"
          imageSrc="/images/about/swami.png"
          imageAlt="Acharya Shri 108 Gundhar Nandi Ji Maharaj - Founder"
          tagline="A Message of Vision & Inspiration"
          paragraphs={[
            "It is a matter of great privilege and immense pleasure for me to be associated with family AGM Rural College of Engineering & Technology. The Students of our college will learn professional and quality skills besides technical expertise. Our holistic approach stimulates innovation among students by inspiring new ideas with creative thinking.",
            "I extend my best wishes to all the students in reaching their objectives and goals that lead to true success in their career path. I feel proud when our students reach new heights by achieving excellence in academics and lead society and nation in the fore front.",
            '"Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society."',
          ]}
        />
      )}

      {activeTab === "president" && (
        <MessageContent
          name="Swasti Shri 105 Bhatarak Pattachrya Swamiji"
          role="President's Message"
          imageSrc="/images/about/president.png"
          imageAlt="Swasti Shri 105 Bhatarak Pattachrya Swamiji - President"
          tagline="A Message of Excellence & Commitment"
          paragraphs={[
            "Welcome to A.G.M. Rural College of Engineering and Technology, Varur, a proud institution under the aegis of the prestigious SDM Jain Mutt Group of Institutions. It is our mission to nurture talent, promote innovation, and instill values that shape the engineers of tomorrow.",
            "At AGMRCET, we believe in providing a holistic educational environment that combines academic excellence with character building. Our Online Grievance Redressal Cell ensures that every stakeholder's voice is heard and addressed impartially, fostering a secure and conducive atmosphere for all-around development.",
            "We are committed to empowering our students with the skills and knowledge required to excel in their professional journeys and contribute meaningfully to society. Together, let us strive for greatness and build a brighter future.",
          ]}
        />
      )}

      {activeTab === "principal" && (
        <MessageContent
          name="Dr. Ravindra Patil"
          role="Principal's Message"
          imageSrc="/images/about/principal.png"
          imageAlt="Dr. Ravindra Patil - Principal"
          tagline="A Message of Achievement & Pride"
          paragraphs={[
            "A.G.M College of Engineering & Technology is been a known Institute since a decade, for its qualitative teaching. I have seen students, even with low grades reaching their highest possibility in terms of academic results. The environment around enhances the students to aim at their best as they are free from urban hazards.",
            "I, on behalf of entire management congratulate my Staff fraternity for reaping their efforts to leave no stone unturned to build a quality bunch of Engineers into the society to serve for the betterment of our nation. In the present pandemic scenario wherein the word 'positive' itself is bulky enough to quench the zeal in an individual. The only aid from our end is to make sure that, no aspirant is left behind the reach of Education.",
            "This noble cause is been addressed for this academic year, with the sole intention that, just an Aspiration evolving into Achievement transcending the barriers, which now exists to encrypt your story in Golden words. I extend my best wishes to all the students in reaching their objectives and goals that lead to true success in their career path.",
            '"Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society."',
          ]}
        />
      )}
    </>
  );
}
