import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { LOGIN_URL, LOGO_SRC } from "@/lib/site";
import { scrollToSection } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <img src={LOGO_SRC} alt="HCA Logo" width={172} height={68} className="h-12 w-auto object-contain" />

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                className="px-4 py-2 text-sm font-inter font-medium text-primary-foreground/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-inter font-medium text-white/70 hover:text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            >
              Login
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              onClick={() => go("#contact")}
              className="ml-2 px-5 py-2.5 bg-accent text-white font-inter font-semibold text-sm rounded-lg hover:bg-accent/90 transition-all"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-white"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => go(link.href)}
                  className="block w-full text-left px-4 py-3 text-white/80 hover:text-white font-inter text-sm rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => go("#contact")}
                className="w-full mt-3 px-5 py-3 bg-accent text-white font-inter font-semibold text-sm rounded-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
