import { GraduationCap } from "lucide-react";

// The original renders these as non-navigating text items, not links.
const FOOTER_COLUMNS = {
  Services: ["Workshops & Seminars", "Management Training", "Executive Coaching", "Staff Development", "Business Analysis"],
  Courses: ["Communication", "Study Skills", "Management by Statistics", "Business Success Formulas", "Public Relations"],
  Company: ["About Us", "Events", "Blog", "Testimonials", "Contact"],
};

export function Footer() {
  return (
    <footer className="bg-primary pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <span className="text-white font-inter font-bold text-lg">Hubbard College</span>
                <span className="block text-white/50 text-xs font-inter tracking-widest uppercase">
                  of Administration SA
                </span>
              </div>
            </div>
            <p className="text-white/50 font-inter text-sm leading-relaxed max-w-sm mb-6">
              Delivering practical management knowledge and professional development programs in South Africa for over
              25 years. Something can be done about it.
            </p>
          </div>

          {Object.entries(FOOTER_COLUMNS).map(([heading, items]) => (
            <div key={heading}>
              <h2 className="text-white font-inter font-semibold text-sm mb-5">{heading}</h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-white/40 font-inter text-sm hover:text-accent cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-inter text-xs">
            © {new Date().getFullYear()} Hubbard College of Administration South Africa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-white/30 font-inter text-xs hover:text-white/60 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-white/30 font-inter text-xs hover:text-white/60 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
