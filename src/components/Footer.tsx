"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Phone, Smartphone, Mail, MapPin } from "lucide-react";

const NAV_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Programs & Faculties", href: "/programmes" },
      { label: "Admissions", href: "/admissions" },
      { label: "Scholarships", href: "#" },
      { label: "Campus Life", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Placements & Career", href: "/placement" },
      { label: "Library", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Sitemap", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    /* Outer wrapper — gives the floating card effect with gaps on all sides */
    <div className="bg-slate-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <footer className="bg-[#0a192f] text-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(10,25,47,0.25)]">

        {/* ── CTA strip ── */}
        <div className="border-b border-white/10 px-6 py-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 max-w-6xl mx-auto">
            <div>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-snug max-w-xl">
                Join A.G.M College — Begin Your Journey Toward Knowledge &amp; Growth
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg">
                Join a global community of learners and innovators at A.G.M College.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admissions?tab=enquiry"
                className="bg-[#d4af37] text-white px-5 py-2 rounded-full font-bold text-sm shadow-md hover:bg-[#b5952f] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 group"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main content grid ── */}
        <div className="px-6 pt-8 pb-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Brand + Contact */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="A.G.M College Home">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow ring-2 ring-[#d4af37]/40 overflow-hidden">
                <Image src="/logo.png" alt="A.G.M College Logo" fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold leading-none text-white font-serif mb-1">A.G.M College</span>
                <span className="text-[9px] uppercase text-[#d4af37] font-bold tracking-widest">of Engineering &amp; Technology</span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed mb-5 max-w-xs">
              Shaping bright minds with innovation, diversity, and excellence. Affiliated to VTU, Belagavi. Approved by AICTE, New Delhi.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] mt-0.5 shrink-0" />
                <span>Nej-Shamanewadi, Tq: Chikkodi, Dist: Belagavi, Karnataka — 591239</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="tel:+917619355570" className="hover:text-[#d4af37] transition-colors">+91 76193 55570</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="tel:+919108790808" className="hover:text-[#d4af37] transition-colors">+91 91087 90808</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="mailto:principalagmcet@gmail.com" className="hover:text-[#d4af37] transition-colors">principalagmcet@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Nav link groups */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:pl-10">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col">
                <h3 className="text-white font-bold mb-4 text-[10px] tracking-widest uppercase opacity-70">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.href === "#") e.preventDefault();
                        }}
                        className={`group flex items-center gap-1 transition-colors duration-300 w-max text-xs ${
                          link.href === "#" ? "text-slate-500 cursor-default" : "text-slate-400 hover:text-[#d4af37]"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.href !== "#" && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="px-6 pb-5 sm:px-10 lg:px-14 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-[10px]">
            © {new Date().getFullYear()} A.G.M College of Engineering &amp; Technology. All rights reserved.
          </p>
          <p className="text-slate-600 text-[10px]">
            Affiliated to VTU · Approved by AICTE
          </p>
        </div>

      </footer>
    </div>
  );
}
