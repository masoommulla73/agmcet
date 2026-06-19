"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programmes", href: "/programmes" },
  { name: "Admissions", href: "/admissions" },
  { name: "Placement", href: "/placement" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="flex items-center gap-3" aria-label="A.G.M College Home">
              <div 
                onDoubleClick={(e) => {
                  e.preventDefault();
                  router.push('/admin/login');
                }}
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md overflow-hidden ring-2 ring-[#d4af37]/50 cursor-pointer"
              >
                <Image src="/logo.png" alt="A.G.M College Logo" fill className="object-contain p-1" sizes="48px" />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-lg font-bold leading-none text-[#0a192f] tracking-tight font-serif mb-1">A.G.M College</span>
                <span className="text-[10px] uppercase text-[#d4af37] font-bold tracking-wider">of Engineering & Technology</span>
              </div>
              <div className="flex md:hidden items-center text-lg font-black tracking-tight ml-1">
                <span className="text-[#0a192f]">AGM</span>
                <span className="text-[#d4af37] ml-1.5">CET</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group h-full flex items-center">
                <Link
                  href={link.href}
                  className={`text-[#0a192f] text-[13px] font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors py-8 flex items-center gap-1 ${link.name === "Programmes" ? "text-[#d4af37] border-b-2 border-[#d4af37]" : ""}`}
                >
                  {link.name}
                </Link>
                
                {/* Mega Menu for Programmes */}
                {link.name === "Programmes" && (
                  <div className="absolute top-full left-0 w-[350px] bg-white shadow-[0_15px_40px_rgb(0,0,0,0.08)] border-t border-[#d4af37] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-4 h-[2px] bg-[#d4af37]" />
                        <h4 className="text-xs font-bold tracking-widest text-[#0a192f] uppercase">Undergraduate B.E.</h4>
                      </div>
                      
                      <div className="flex flex-col space-y-5">
                        <Link href="/programmes?branch=cse" className="group/link flex flex-col">
                          <span className="text-[#0a192f] font-bold group-hover/link:text-[#d4af37] transition-colors">Computer Science & Engineering</span>
                          <span className="text-[11px] text-slate-500 mt-1">Core computing & software development</span>
                        </Link>
                        <Link href="/programmes?branch=aiml" className="group/link flex flex-col">
                          <span className="text-[#0a192f] font-bold group-hover/link:text-[#d4af37] transition-colors">Artificial Intelligence & ML</span>
                          <span className="text-[11px] text-slate-500 mt-1">Advanced AI, ML, & Data Science</span>
                        </Link>
                        <Link href="/programmes?branch=ece" className="group/link flex flex-col">
                          <span className="text-[#0a192f] font-bold group-hover/link:text-[#d4af37] transition-colors">Electronics & Communication</span>
                          <span className="text-[11px] text-slate-500 mt-1">Hardware, VLSI, & communication</span>
                        </Link>
                        <Link href="/programmes?branch=civil" className="group/link flex flex-col">
                          <span className="text-[#0a192f] font-bold group-hover/link:text-[#d4af37] transition-colors">Civil Engineering</span>
                          <span className="text-[11px] text-slate-500 mt-1">Infrastructure design & construction</span>
                        </Link>
                      </div>

                      <div className="mt-8 pt-5 border-t border-slate-100">
                        <Link href="/programmes" className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest hover:text-[#0a192f] transition-colors flex items-center gap-2">
                          Explore All <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#0a192f] hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg">
          <div className="space-y-2 px-4 pb-4 pt-4 sm:px-6 flex flex-col items-start">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="w-full text-center rounded-full border border-[#0a192f] px-4 py-2 text-base font-semibold text-[#0a192f] hover:bg-[#0a192f] hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
