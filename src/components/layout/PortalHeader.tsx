import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LOGO_SRC } from "@/lib/site";

/** Sticky navy header used on the catalog and cart pages: logo home link + page-specific actions. */
export function PortalHeader({ children }: { children: ReactNode }) {
  return (
    <header className="bg-primary sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" aria-label="Hubbard College home">
          <img src={LOGO_SRC} alt="HCA Logo" width={172} height={68} className="h-10 w-auto object-contain" />
        </Link>
        {children}
      </div>
    </header>
  );
}
