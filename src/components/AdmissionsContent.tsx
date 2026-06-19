"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ClipboardList,
  BarChart3,
  CheckCircle2,
  MessageSquarePlus,
  Send,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "procedure" | "intake" | "eligibility" | "enquiry";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "procedure",   label: "Admission Procedure",  icon: ClipboardList       },
  { id: "intake",      label: "Intake",               icon: BarChart3           },
  { id: "eligibility", label: "Eligibility Criteria", icon: CheckCircle2        },
  { id: "enquiry",     label: "Admission Enquiry",    icon: MessageSquarePlus   },
];

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ activeTab }: { activeTab: Tab }) {
  const label = TABS.find((t) => t.id === activeTab)?.label ?? "";
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] tracking-widest uppercase font-bold">
      <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#d4af37] transition-colors">
        <Home className="w-3 h-3" /> Home
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <Link href="/admissions" className="text-slate-400 hover:text-[#d4af37] transition-colors">
        Admissions
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <span className="text-[#d4af37]">{label}</span>
    </nav>
  );
}

// ── Hero Banner ───────────────────────────────────────────────────────────────
function HeroBanner({ activeTab }: { activeTab: Tab }) {
  const label = TABS.find((t) => t.id === activeTab)?.label ?? "";
  return (
    <div className="relative bg-[#0a192f] overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#d4af37 1px,transparent 1px),linear-gradient(90deg,#d4af37 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Right glow */}
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

// ── Tab Bar ───────────────────────────────────────────────────────────────────
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
                className={`shrink-0 flex items-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#d4af37] text-[#0a192f]"
                    : "border-transparent text-slate-400 hover:text-[#0a192f] hover:border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Section heading helper ────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-8 bg-[#d4af37] rounded-full shrink-0" />
      <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#0a192f]">{children}</h2>
    </div>
  );
}

// ── ADMISSION PROCEDURE ───────────────────────────────────────────────────────
const REQUIREMENTS = [
  {
    program: "Bachelor Of Engineering (1st Year)",
    requirement: "10 + 2 (PCM) with CET / COMED-K",
  },
  {
    program: "Bachelor Of Engineering (2nd Year)",
    requirement: "10 + 3 (for lateral entry via Diploma) with DCET",
  },
];

function AdmissionProcedureTab() {
  return (
    <div className="py-14 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-14">

        {/* Requirement */}
        <div>
          <SectionHeading>Requirement</SectionHeading>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200 hide-scrollbar">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#0a192f]">
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-[#d4af37] w-1/2">
                    Programme
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-[#d4af37] w-1/2">
                    Requirement
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {REQUIREMENTS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-[#0a192f] font-semibold text-sm align-top">
                      {row.program}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm align-top">
                      {row.requirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Procedure */}
        <div>
          <SectionHeading>Admission Procedure</SectionHeading>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#d4af37]" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Admissions to A.G.M Engineering College are as per the regulations of{" "}
                <span className="font-semibold text-[#0a192f]">Karnataka State Govt.</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#d4af37]" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The students have to appear for the{" "}
                <span className="font-semibold text-[#0a192f]">Common Entrance Test (CET)</span>{" "}
                conducted by Govt. of Karnataka for CET/Management Seats or{" "}
                <span className="font-semibold text-[#0a192f]">ComedK Entrance Test</span> for
                ComedK/Management Seats or{" "}
                <span className="font-semibold text-[#0a192f]">
                  All India Engineering Entrance Test (AIEEE)
                </span>{" "}
                for Management seats.
              </p>
            </div>
          </div>
        </div>

        {/* Info chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "CET / Management", desc: "Karnataka CET conducted by Govt. of Karnataka" },
            { label: "ComedK", desc: "ComedK Entrance Test for ComedK/Management seats" },
            { label: "AIEEE", desc: "All India Engineering Entrance Test for Management seats" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#0a192f] rounded-xl p-5 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors"
            >
              <p className="text-[#d4af37] font-bold text-xs tracking-widest uppercase mb-2">{item.label}</p>
              <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── INTAKE ────────────────────────────────────────────────────────────────────
const INTAKE_DATA = [
  { programme: "Civil Engineering",                                    intake: 30,  color: "from-slate-700 to-slate-800" },
  { programme: "Computer Science Engineering",                         intake: 90,  color: "from-[#0a192f] to-[#0f2442]"  },
  { programme: "Artificial Intelligence & Machine Learning",           intake: 120, color: "from-[#1a3a6f] to-[#0a192f]"  },
  { programme: "Electronics & Communication Engineering",              intake: 60,  color: "from-[#0f2442] to-slate-800"  },
];

const TOTAL_INTAKE = INTAKE_DATA.reduce((s, r) => s + r.intake, 0);

function IntakeTab() {
  return (
    <div className="py-14 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-10">

        <SectionHeading>Programme Intake</SectionHeading>

        {/* Visual cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {INTAKE_DATA.map((row) => (
            <div
              key={row.programme}
              className={`bg-gradient-to-br ${row.color} rounded-2xl p-6 sm:p-8 flex items-end justify-between gap-4 group hover:-translate-y-1 transition-all duration-300 shadow-md`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#d4af37] mb-2">B.E. Programme</p>
                <p className="text-white font-bold text-base sm:text-lg leading-snug">{row.programme}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-5xl sm:text-6xl font-extrabold text-[#d4af37] leading-none">{row.intake}</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-1">Seats</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table view */}
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200 hide-scrollbar">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#0a192f]">
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">Programme</th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-[#d4af37] w-28">Intake</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {INTAKE_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-[#0a192f] font-semibold text-sm">{row.programme}</td>
                  <td className="px-6 py-4 text-center font-bold text-[#d4af37] text-lg">{row.intake}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-t-2 border-[#d4af37]">
                <td className="px-6 py-4 text-[#0a192f] font-extrabold text-sm uppercase tracking-wide">Total Intake</td>
                <td className="px-6 py-4 text-center font-extrabold text-[#0a192f] text-xl">{TOTAL_INTAKE}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// ── ELIGIBILITY ───────────────────────────────────────────────────────────────
const ELIGIBILITY_BLOCKS = [
  {
    tag: "1st Year / 1st Semester — B.E. / B.Tech",
    title: "Direct Entry Eligibility",
    points: [
      {
        label: "Option A",
        text: `Passed 2nd PUC / 12th Standard examination with English as one of the Languages, Physics and Mathematics as compulsory subjects along with Chemistry / Bio-Technology / Biology / Electronics / Computer Science.`,
      },
      {
        label: "Option B",
        text: `Students who passed a qualifying examination other than the PUC II examination of the Pre-University Education Board of Karnataka must obtain an eligibility certificate for seeking admission to BE/B.Tech Degree Programme from Visvesvaraya Technological University, Belagavi.`,
      },
    ],
  },
  {
    tag: "2nd Year — Lateral Entry (B.E.)",
    title: "Lateral Entry Eligibility",
    points: [
      {
        label: "Option A",
        text: `Passed any Engineering Diploma examination or equivalent and obtained an aggregate minimum of 45% marks taken together in all subjects of the final year (Fifth and Sixth semester) diploma examination. SC / ST / Backward Classes of Karnataka candidates require 40% of marks.`,
      },
      {
        label: "Option B",
        text: `Candidates who have completed Engineering Diploma from outside Karnataka shall provide the Equivalence / Eligibility Certificate issued from the Director of Technical Education, Karnataka (State Govt. Order ED210 TEC 2018 dt: 26-02-2019 and VTU circular dt: 20-3-2019).`,
      },
    ],
  },
];

function EligibilityTab() {
  return (
    <div className="py-14 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-10">

        <SectionHeading>Eligibility Criteria For Admission</SectionHeading>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
          Academic eligibility to seek admission to B.E. / B.Tech. programmes — applicable for the academic year{" "}
          <span className="font-bold text-[#0a192f]">2021-22 onwards</span> as specified below.
        </p>

        {ELIGIBILITY_BLOCKS.map((block, bi) => (
          <div key={bi} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* card header */}
            <div className="bg-[#0a192f] px-6 py-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-[#d4af37] rounded-full shrink-0" />
              <div>
                <p className="text-[#d4af37] text-[9px] font-bold tracking-widest uppercase">{block.tag}</p>
                <p className="text-white font-bold text-sm sm:text-base">{block.title}</p>
              </div>
            </div>
            {/* card body */}
            <div className="p-6 sm:p-8 space-y-6">
              {block.points.map((pt, pi) => (
                <div key={pi} className="flex items-start gap-4">
                  <span className="shrink-0 mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-extrabold">
                    {pi === 0 ? "i" : "ii"}
                  </span>
                  <div>
                    {block.points.length > 1 && (
                      <span className="inline-block mb-1 text-[9px] font-bold tracking-widest uppercase bg-[#0a192f] text-[#d4af37] rounded px-2 py-0.5 mr-2">
                        {pt.label}
                      </span>
                    )}
                    {pi > 0 && (
                      <span className="inline-block mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">OR</span>
                    )}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

// ── ADMISSION ENQUIRY FORM ────────────────────────────────────────────────────
const COURSES = [
  "Computer Science Engineering (CSE)",
  "Artificial Intelligence & Machine Learning (AI & ML)",
  "Electronics & Communication Engineering (ECE)",
  "Civil Engineering",
];

const EDUCATION_LEVELS = ["12th (PUC)", "Diploma", "Other"];

function EnquiryTab() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | string>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const email = process.env.NEXT_PUBLIC_FORM_EMAIL || "yourgmail@gmail.com";
      
      // We use no-cors to bypass browser CORS blocks. The response will be opaque,
      // meaning we can't read the status, but the request will successfully reach FormSubmit.
      await fetch(`https://formsubmit.co/${email}`, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // With no-cors, we assume success if the network request completed
      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      setStatus(`Error: ${(err as Error).message || 'Network error'}`);
    }
  }

  if (status === "success") {
    return (
      <div className="py-14 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d4af37]/10 text-[#d4af37] mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-[#0a192f] mb-3 font-serif">Application Submitted!</h3>
          <p className="text-slate-500 mb-8 max-w-md">
            Thank you for applying. Our admissions counsellor will get in touch with you within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="bg-[#0a192f] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-slate-800 transition-all duration-300"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

        <SectionHeading>Admission Enquiry</SectionHeading>

        <p className="text-slate-500 text-sm mb-10 leading-relaxed">
          Fill in the form below and our admissions counsellor will get in touch with you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10 space-y-6 relative overflow-hidden">
          {status !== "idle" && status !== "loading" && status !== "success" && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center break-words">
              Oops! Something went wrong.<br/>
              <strong>{status}</strong>
            </div>
          )}

          <input type="hidden" name="_captcha" value="false" />
          
          {/* Top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="adm-name" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
              Full Name <span className="text-[#d4af37]">*</span>
            </label>
            <input
              id="adm-name"
              name="Full Name"
              type="text"
              required
              minLength={2}
              maxLength={50}
              placeholder="e.g. Rahul Kumar"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
            />
          </div>

          {/* Mobile + Email side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adm-mobile" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
                Mobile Number <span className="text-[#d4af37]">*</span>
              </label>
              <input
                id="adm-mobile"
                name="Mobile Number"
                type="tel"
                required
                minLength={10}
                maxLength={15}
                pattern="[0-9\+\-\s]+"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adm-email" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
                Email ID <span className="text-[#d4af37]">*</span>
              </label>
              <input
                id="adm-email"
                name="Email"
                type="email"
                required
                maxLength={100}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="adm-city" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
              Your City <span className="text-[#d4af37]">*</span>
            </label>
            <input
              id="adm-city"
              name="City"
              type="text"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-z\s\-]+"
              placeholder="e.g. Belagavi"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
            />
          </div>

          {/* Education + Course side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adm-education" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
                Education <span className="text-[#d4af37]">*</span>
              </label>
              <select
                id="adm-education"
                name="Education"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select qualification</option>
                {EDUCATION_LEVELS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="adm-course" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
                Course Interested In <span className="text-[#d4af37]">*</span>
              </label>
              <select
                id="adm-course"
                name="Course"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a branch</option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-[#d4af37] text-white px-10 py-3.5 rounded-full font-bold text-sm shadow-lg hover:bg-[#b5952f] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
            >
              {status === "loading" ? "Submitting..." : "Apply Now"}
              {status !== "loading" && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
function AdmissionsContentInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab") as Tab | null;

  const validTabs: Tab[] = ["procedure", "intake", "eligibility", "enquiry"];
  const initialTab = tabQuery && validTabs.includes(tabQuery) ? tabQuery : "procedure";

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (tabQuery && validTabs.includes(tabQuery)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tabQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabQuery]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <HeroBanner activeTab={activeTab} />
      <TabBar activeTab={activeTab} onSelect={handleTabChange} />

      {activeTab === "procedure"   && <AdmissionProcedureTab />}
      {activeTab === "intake"      && <IntakeTab />}
      {activeTab === "eligibility" && <EligibilityTab />}
      {activeTab === "enquiry"     && <EnquiryTab />}
    </>
  );
}

export function AdmissionsContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <AdmissionsContentInner />
    </Suspense>
  );
}
