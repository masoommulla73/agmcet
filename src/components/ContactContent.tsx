"use client";

import Link from "next/link";
import {
  Home,
  ChevronRight,
  Smartphone,
  Mail,
  MapPin,
  ExternalLink,
  Send,
  Building2,
} from "lucide-react";
import { useState } from "react";

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-1.5 text-[11px] tracking-widest uppercase font-bold"
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-slate-400 hover:text-[#d4af37] transition-colors"
      >
        <Home className="w-3 h-3" /> Home
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400" />
      <span className="text-[#d4af37]">Contact Us</span>
    </nav>
  );
}

// ── Hero Banner ───────────────────────────────────────────────────────────────
function HeroBanner() {
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
        <Breadcrumb />
        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white uppercase leading-none tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
          To moulds the future Engineers, Developers, Manufacturers, Designers and Leaders in the
          field of Engineering by making students learn new Technologies &amp; Engineering.
        </p>
      </div>
    </div>
  );
}

// ── Contact Info cards ────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  {
    icon: Smartphone,
    label: "Contact 1",
    value: "+91 76193 55570",
    href: "tel:+917619355570",
    highlight: true,
  },
  {
    icon: Smartphone,
    label: "Contact 2",
    value: "+91 91087 90808",
    href: "tel:+919108790808",
    highlight: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "principalagmcet@gmail.com",
    href: "mailto:principalagmcet@gmail.com",
    highlight: false,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Nej-Shamanewadi\nTq: Chikkodi, Dist: Belagavi\nKarnataka - 591239",
    href: "https://www.google.com/maps/search/Nej-Shamanewadi+Tq:+Chikkodi,+Dist:+Belagavi+Karnataka+-+591239/@16.5437762,74.4814357,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
    highlight: false,
  },
];

// ── Quick Enquiry Form ────────────────────────────────────────────────────────
function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | string>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "New Contact Us Message – AGM College",
          from_name: "AGM College Website",
          ...Object.fromEntries(formData),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data as { success?: boolean }).success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus(`error:${(data as { message?: string }).message || `Status ${res.status}`}`);
      }
    } catch (err: unknown) {
      setStatus(`error:${(err as Error).message || 'Network error'}`);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] mb-4">
          <Send className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#0a192f] mb-2 font-serif">Message Sent!</h3>
        <p className="text-slate-500 text-sm">Thank you! We will get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#0a192f] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status.startsWith("error") && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
          {status.replace("error:", "") || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-name" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
            Full Name <span className="text-[#d4af37]">*</span>
          </label>
          <input
            id="ct-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={50}
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-phone" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
            Phone <span className="text-[#d4af37]">*</span>
          </label>
          <input
            id="ct-phone"
            name="phone"
            type="tel"
            required
            minLength={10}
            maxLength={15}
            pattern="[0-9\+\-\s]+"
            placeholder="+91 00000 00000"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ct-email" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
          Email <span className="text-[#d4af37]">*</span>
        </label>
        <input
          id="ct-email"
          name="email"
          type="email"
          required
          maxLength={100}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ct-message" className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">
          Message <span className="text-[#d4af37]">*</span>
        </label>
        <textarea
          id="ct-message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          placeholder="Tell us how we can help…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto bg-[#d4af37] text-white px-10 py-3.5 rounded-full font-bold text-sm shadow-lg hover:bg-[#b5952f] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        {status !== "loading" && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
      </button>
    </form>
  );
}

// ── Map Card ─────────────────────────────────────────────────────────────────
const MAPS_URL =
  "https://www.google.com/maps/search/Nej-Shamanewadi+Tq:+Chikkodi,+Dist:+Belagavi+Karnataka+-+591239/@16.5437762,74.4814357,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";

const MAPS_EMBED =
  "https://www.google.com/maps?q=16.5437762,74.4814357&z=14&output=embed";

function MapCard() {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
      aria-label="View college location on Google Maps"
    >
      {/* Embedded map preview */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[25/9] bg-slate-100 overflow-hidden">
        <iframe
          src={MAPS_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: "none" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="A.G.M College Location"
          className="absolute inset-0 w-full h-full"
        />
        {/* Transparent overlay so click goes to the <a> */}
        <div className="absolute inset-0" />
      </div>

      {/* Bottom info strip */}
      <div className="bg-[#0a192f] px-5 sm:px-7 py-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">A.G.M College of Engineering &amp; Technology</p>
            <p className="text-slate-400 text-xs mt-0.5 truncate">
              Nej-Shamanewadi, Tq: Chikkodi, Dist: Belagavi, Karnataka – 591239
            </p>
            <p className="text-slate-500 text-[10px] mt-0.5">Landmark: OPP VRL</p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 bg-[#d4af37] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-full group-hover:bg-white group-hover:text-[#0a192f] transition-all duration-300 whitespace-nowrap">
          Open Maps <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export function ContactContent() {
  return (
    <>
      <HeroBanner />

      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* AGM CET intro strip */}
          <div className="bg-[#0a192f] rounded-2xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-[#d4af37]/20 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
            <div className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-1">A.G.M CET</p>
              <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl">
                At A.G.M we are empowering the generation. Join AGM community, to shift your future to bright.
              </p>
            </div>
          </div>

          {/* Top Row: left = contact cards, right = form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14">

            {/* LEFT: Contact Info */}
            <div className="flex flex-col gap-6">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 bg-[#d4af37] rounded-full shrink-0" />
                  <h2 className="text-xl font-serif font-extrabold text-[#0a192f]">Contact Info</h2>
                </div>

                <div className="flex flex-col gap-4">
                  {CONTACT_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={i}
                        href={item.href}
                        target={item.label === "Address" ? "_blank" : undefined}
                        rel={item.label === "Address" ? "noopener noreferrer" : undefined}
                        className={`group flex items-start gap-4 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                          item.highlight
                            ? "bg-[#0a192f] border-[#d4af37]/20 hover:border-[#d4af37]/50"
                            : "bg-white border-slate-100 hover:border-[#d4af37]/30"
                        }`}
                      >
                        <div
                          className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 ${
                            item.highlight
                              ? "bg-[#d4af37]/10 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white"
                              : "bg-[#0a192f]/5 text-[#0a192f] group-hover:bg-[#d4af37] group-hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${
                              item.highlight ? "text-[#d4af37]" : "text-slate-400"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p
                            className={`text-sm font-semibold leading-snug break-words whitespace-pre-line ${
                              item.highlight ? "text-white" : "text-[#0a192f]"
                            }`}
                          >
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT: Enquiry Form */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
                {/* top gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] to-[#0a192f]" />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-7 bg-[#d4af37] rounded-full shrink-0" />
                    <h2 className="text-xl font-serif font-extrabold text-[#0a192f]">Quick Enquiry</h2>
                  </div>
                  <EnquiryForm />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Full Width Map */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 bg-[#d4af37] rounded-full shrink-0" />
              <h2 className="text-xl font-serif font-extrabold text-[#0a192f]">Find Us</h2>
            </div>
            <MapCard />
          </div>
        </div>
      </section>
    </>
  );
}
