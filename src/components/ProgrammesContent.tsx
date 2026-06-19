"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Laptop,
  Brain,
  Cpu,
  Building,
  Target,
  Quote,
  Lightbulb,
} from "lucide-react";

// ── Shared Data ───────────────────────────────────────────────────────────────
const COMMON_POS = [
  { id: "PO1", title: "Engineering knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
  { id: "PO2", title: "Problem analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
  { id: "PO3", title: "Design/development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
  { id: "PO4", title: "Conduct investigations of complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
  { id: "PO5", title: "Modern tool usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations." },
  { id: "PO6", title: "The engineer and society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
  { id: "PO7", title: "Environment and sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
  { id: "PO8", title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
  { id: "PO9", title: "Individual and team work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
  { id: "PO10", title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
  { id: "PO11", title: "Project management and finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
  { id: "PO12", title: "Life-long learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." },
];

type BranchId = "cse" | "aiml" | "ece" | "civil";

interface BranchData {
  id: BranchId;
  name: string;
  icon: React.ElementType;
  about: string;
  vision: string;
  mission: string[];
  hodMessage: string[];
  hodQuote?: string;
  psos: { id: string; desc: string }[];
}

const BRANCHES: Record<BranchId, BranchData> = {
  cse: {
    id: "cse",
    name: "Computer Science & Engineering",
    icon: Laptop,
    about:
      "Welcome to the Department of Computer Science & Engineering. The Department was established in the year 2010 and offers undergraduate program (B.E.) in Computer Science & Engineering with an intake of 60. The department is bound to produce not just skilled engineers but citizens who are responsible towards society. We are a team of highly qualified, experienced & dedicated faculties. Department has sufficient number of Well-equipped laboratories, class rooms & library for imparting quality education.",
    vision:
      '"To provide quality technical education through innovative approach in the field of Computer Science and Engineering."',
    mission: [
      "To enable young minds to emerge as professionals and ethical coders in the field of computer science and engineering",
      "To ensure high quality training to empower knowledge, skills, values to serve the society.",
    ],
    hodMessage: [
      "It is a matter of great privilege and immense pleasure for me to be associated with family AGM Rural College of Engineering & Technology. The Students of our college will learn professional and quality skills besides technical expertise. Our holistic approach stimulates innovation among students by inspiring new ideas with creative thinking.",
      "I extend my best wishes to all the students in reaching their objectives and goals that lead to true success in their career path. I feel proud when our students reach new heights by achieving excellence in academics and lead society and nation in the fore front.",
    ],
    hodQuote: "Motivating students with a sense of purpose is the only way to deliver innovate product and insure the quality to society",
    psos: [
      { id: "PSO1", desc: "Investigate, Device , Develop and Enhance the solutions in Python, Java, NET technology and Android Based Applications." },
      { id: "PSO2", desc: "Design and Develop Computer Based Systems with Varied Degrees of Complexity in the field of Networking, Web design, Cloud Computing Algorithms, Internet of Things and data Analytics & Machine Learning." },
    ],
  },
  aiml: {
    id: "aiml",
    name: "CSE (Artificial Intelligence & Machine Learning)",
    icon: Brain,
    about:
      "Welcome to the Department of Computer Science & Engineering (Artificial Intelligence and Machine Learning). The Department was established in the year 2023 and offers undergraduate program (B.E.) in Computer Science & Engineering with an intake of 30. The department is bound to produce not just skilled engineers but citizens who are responsible towards society. We are a team of highly qualified, experienced & dedicated faculties. Department has sufficient number of Well-equipped laboratories, class rooms & library for imparting quality education.",
    vision:
      '"To emerge as a center of excellence in Artificial Intelligence and Machine Learning education, fostering innovation, research, and ethical practices to empower students to shape the future through cutting-edge technologies and impactful solutions."',
    mission: [
      "To deliver comprehensive and Industry-aligned AIML education through experiential learning, advanced curriculum, and state-of-the-art infrastructure.",
      "To promote a culture of creativity, critical thinking, and research, enabling students to contribute novel solutions to real-world problems using AIML technologies.",
    ],
    hodMessage: [
      "We are thrilled to announce the establishment of our new (Artificial Intelligence and Machine Learning) Department at A.G.M Rural College of Engineering and Technology. As we continue to evolve in the dynamic landscape of technology, embracing AI and ML becomes not just a necessity but a strategic imperative for our growth and competitiveness by keeping this vision our distinct leader Director Sandeep Kaytanavar added feathers to cap by starting AIML Department.",
      "In the AIML Department, we believe in learning by doing. Our state-of-the-art labs and resources provide the platform to experiment, innovate, and turn your ideas into reality. We encourage to question, explore, and, most importantly, to never stop learning.",
    ],
    hodQuote: "Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society",
    psos: [
      { id: "PSO1", desc: "Ability to apply knowledge and techniques in domains such as Python, Data Structures, Database Management Systems, and Artificial Neural Networks." },
      { id: "PSO2", desc: "Ability to analyze multidisciplinary, computationally intensive problems and develop optimized solutions using modern Machine Learning tools and techniques." },
    ],
  },
  ece: {
    id: "ece",
    name: "Electronics & Communication Engineering",
    icon: Cpu,
    about:
      "Department of Electronics & Communication Engineering AGMRCET. has established in the year 2010 with an intake of 60. Department of Electronics and Communication Engineering strives for increasing the knowledge, enhancing the critical thinking, ability to change information into knowledge and power of analyzing the things technically of each and every student in the ever changing society.\n\nWe also intend to impart knowledge through a closed knit family of highly competent faculty. Our Laboratories have been very well established not only to cover complete syllabus but to motivate students to learn beyond the syllabus which definitely develops complete knowledge of the subject (both the practical and theoretical) and develop skill sets of students to become promising engineers in future.",
    vision:
      '"To achieve immeasurable growth towards technical education in the field of Electronics and communication engineering."',
    mission: [
      "To inculcate the contemporary technical education in the field of electronics and communication engineering.",
      "To practice innovative teaching and learning in the field of engineering and communication engineering.",
    ],
    hodMessage: [
      "The Electronics and Communication (E&C) Engineering Department was established in the year 2010. The department has highly qualified faculty members with Ph.Ds. in diverse fields. The faculty focus on molding quality engineers who are capable of making great contributions for a better tomorrow. The department has state-of-the-art laboratories for enabling students to pursue their desire for attaining excellence in research and academics. The facilities encourage students to have hands-on training in modern engineering tools.",
      "The department regularly organizes seminars, guest lectures, short-term training programs and workshops for the professional development of students and faculty within and beyond the institute. Furthermore, the department strives to develop collaborative research and development linkages with leading organizations in India and abroad.",
    ],
    hodQuote: "Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society",
    psos: [
      { id: "PSO1", desc: "Recognize the complex problems and Develop solutions in diverse fields of Communication System." },
      { id: "PSO2", desc: "Acquire specific knowledge to promote research and career excellence in the areas of VLSI and Embedded System." },
    ],
  },
  civil: {
    id: "civil",
    name: "Civil Engineering",
    icon: Building,
    about:
      "The Department of Civil Engineering was established in 2010 with an intake of 60. The Department of Civil Engineering strives for increasing knowledge, enhancing critical thinking, ability to change information into knowledge and power of analysing the things technically of each and every student in the ever changing society.\n\nWe also intend to impart knowledge through a close-knit family of highly competent faculty. Our laboratories have been very well established not only to cover the complete syllabus but to motivate students to learn beyond the syllabus, which definitely develops complete knowledge of the subject (both practical and theoretical) and develop the skill sets of students to become promising engineers in future.",
    vision:
      '"To be an eminent department in order to transmit valuable technical education, producing civil engineers who are brilliant, innovative, and professionally competent with a social conscience responsibility and ethical standards to serve the nation."',
    mission: [
      "Encourage students to be planners designers, constructors and operators who are competent, collaborative and ethical to serve society.",
      "To ensconce budding civil engineers to be entrepreneurs and pursue higher education in reputed institutions.",
    ],
    hodMessage: [
      "It is a matter of great privilege and immense pleasure for me to be associated with family AGM Rural College of Engineering & Technology. The Students of our college will learn professional and quality skills besides technical expertise. Our holistic approach stimulates innovation among students by inspiring new ideas with creative thinking.",
      "I extend my best wishes to all the students in reaching their objectives and goals that lead to true success in their career path. I feel proud when our students reach new heights by achieving excellence in academics and lead society and nation in the fore front.",
    ],
    hodQuote: "Motivating students with a sense of purpose is the only way to deliver innovative products and ensure quality to society",
    psos: [
      { id: "PSO1", desc: "Investigate, Device , Develop and Enhance the solutions in Python, Java, NET technology and Android Based Applications." },
      { id: "PSO2", desc: "Design and Develop Computer Based Systems with Varied Degrees of Complexity in the field of Networking, Web design, Cloud Computing Algorithms, Internet of Things and data Analytics & Machine Learning." },
    ],
  },
};

const TAB_KEYS: BranchId[] = ["cse", "aiml", "ece", "civil"];

// ── UI Components ─────────────────────────────────────────────────────────────

function Breadcrumb({ activeTab }: { activeTab: BranchId }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] tracking-widest uppercase font-bold">
      <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#d4af37] transition-colors">
        <Home className="w-3 h-3" /> Home
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <span className="text-slate-400">Programmes</span>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <span className="text-[#d4af37]">{BRANCHES[activeTab].name}</span>
    </nav>
  );
}

function HeroBanner({ activeTab }: { activeTab: BranchId }) {
  const branch = BRANCHES[activeTab];
  return (
    <div className="relative bg-[#0a192f] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#d4af37 1px,transparent 1px),linear-gradient(90deg,#d4af37 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative py-10 sm:py-14">
        <Breadcrumb activeTab={activeTab} />
        <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white uppercase leading-none tracking-tight">
          {branch.name}
        </h1>
      </div>
    </div>
  );
}

function TabBar({ activeTab, onSelect }: { activeTab: BranchId; onSelect: (t: BranchId) => void }) {
  return (
    <div className="sticky top-[80px] z-40 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex overflow-x-auto hide-scrollbar -mb-px">
          {TAB_KEYS.map((key) => {
            const branch = BRANCHES[key];
            const Icon = branch.icon;
            const shortName = key === "aiml" ? "AI & ML" : key.toUpperCase();
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`shrink-0 flex items-center gap-2 px-5 sm:px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === key
                    ? "border-[#d4af37] text-[#0a192f]"
                    : "border-transparent text-slate-400 hover:text-[#0a192f] hover:border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {shortName}
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

// ── Branch Content ────────────────────────────────────────────────────────────
function ProgrammesContentInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const branchQuery = searchParams.get("branch") as BranchId | null;

  const [activeTab, setActiveTab] = useState<BranchId>(
    branchQuery && TAB_KEYS.includes(branchQuery) ? branchQuery : "cse"
  );

  useEffect(() => {
    if (branchQuery && TAB_KEYS.includes(branchQuery)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(branchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchQuery]);

  const handleTabChange = (tab: BranchId) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("branch", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const branch = BRANCHES[activeTab];

  return (
    <>
      <HeroBanner activeTab={activeTab} />
      <TabBar activeTab={activeTab} onSelect={handleTabChange} />
      
      <div className="py-14 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-16">
          
          {/* About Department */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />
            <div className="p-6 sm:p-10">
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-4">About Department</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {branch.about}
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div>
            <SectionHeading>Vision &amp; Mission</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Vision Card */}
              <div className="bg-[#0a192f] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-md group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
                <Lightbulb className="w-8 h-8 text-[#d4af37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-serif text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-[#d4af37] pl-4">
                  {branch.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm group hover:-translate-y-1 transition-transform duration-300">
                <Target className="w-8 h-8 text-[#0a192f] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-[#0a192f] font-serif text-xl font-bold mb-4">Our Mission</h3>
                <ul className="space-y-3">
                  {branch.mission.map((m: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                      <p className="text-slate-600 text-sm leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* HOD Message */}
          <div>
            <SectionHeading>HOD Message</SectionHeading>
            <div className="bg-[#0a192f] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
              <Quote className="w-10 h-10 text-[#d4af37]/20 mb-4" />
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6">
                From the Desk of the Head of Department
              </p>
              <div className="space-y-4 relative z-10">
                {branch.hodMessage.map((p: string, i: number) => (
                  <p key={i} className="text-slate-300 text-sm sm:text-base leading-relaxed">{p}</p>
                ))}
                {branch.hodQuote && (
                  <p className="text-[#d4af37] font-serif italic text-base sm:text-lg leading-relaxed mt-4">
                    &quot;{branch.hodQuote}&quot;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* POs & PSOs - Tabbed view or Accordion style lists */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* PSOs taking 1/3 width or full width, let's stack PSOs then POs */}
            <div className="lg:col-span-12">
              <SectionHeading>Program Specific Outcomes (PSOs)</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branch.psos.map((pso, i: number) => (
                  <div key={i} className="bg-white border border-[#d4af37]/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] font-extrabold text-xs px-3 py-1 rounded-full mb-3">
                      {pso.id}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">{pso.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-12 pt-6">
              <SectionHeading>Program Outcomes (POs)</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {COMMON_POS.map((po, i) => (
                  <div key={i} className="group bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-[#d4af37]/50 transition-colors flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-[#0a192f] text-white flex items-center justify-center font-bold text-[10px] group-hover:bg-[#d4af37] transition-colors">
                      {po.id}
                    </div>
                    <div>
                      <h4 className="text-[#0a192f] font-bold text-sm mb-1">{po.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{po.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export function ProgrammesContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <ProgrammesContentInner />
    </Suspense>
  );
}
