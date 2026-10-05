import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheckBig, X } from "lucide-react";
import { asset } from "@/lib/site";

const TESTIMONIALS = [
  {
    quote:
      "I enrolled my whole team in the sales workshop. Every single one of them improved their sales. In the last quarter our sales increased by 100% over the previous quarter.",
    author: "EB",
  },
  {
    quote:
      "3 days after this workshop I beat my highest ever sale by almost 10 times — several weeks later, I nearly doubled that record. These techniques WORK!",
    author: "KG",
  },
  {
    quote:
      "I want to personally thank the Hubbard College for well-delivered sales training. We pulled off our highest-ever quarter that very next quarter.",
    author: "Chief Operating Officer, Diskeeper Corporation",
  },
  {
    quote:
      "This workshop was so good that I attended a second time. After the last workshop I produced a highest-ever for our office.",
    author: "EJ",
  },
];

const TOPICS = [
  "How to connect with your customer for a lasting relationship",
  "How to handle any objections",
  "What are the key skills any and all salespeople need to build a lasting future",
  "Each attendee walks away with a toolbox for sales and life",
];

interface SalesWorkshopModalProps {
  open: boolean;
  onClose: () => void;
}

export function SalesWorkshopModal({ open, onClose }: SalesWorkshopModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes; focus moves into the dialog and returns to the trigger afterwards.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sales-workshop-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img
                src={asset("images/site/sales-workshop-modal.jpg")}
                alt="Sales Workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <h2
                id="sales-workshop-title"
                className="absolute bottom-4 left-6 text-white font-playfair font-bold text-2xl"
              >
                SALES Workshop
              </h2>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6">
                <strong className="text-foreground">The Professional Selling Series: SALES Workshop!</strong> is based
                on the works of L. Ron Hubbard and is carefully designed for those who wish to master the art of
                influencing others. Your lead presenter <strong className="text-foreground">Kerushan Govender</strong>{" "}
                has an extensive career spanning technology and investment banking, including over 10 years in sales
                leadership roles at Microsoft.
              </p>

              <h3 className="font-playfair font-bold text-foreground text-lg mb-4">The 2-Day Workshop Covers:</h3>
              <ul className="space-y-3 mb-8">
                {TOPICS.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <CircleCheckBig className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground font-inter text-sm">{topic}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-playfair font-bold text-foreground text-lg mb-4">What Attendees Say:</h3>
              <div className="space-y-4 mb-8">
                {TESTIMONIALS.map((t) => (
                  <blockquote key={t.author} className="bg-muted/50 rounded-xl p-5 border-l-4 border-accent">
                    <p className="text-muted-foreground font-inter text-sm italic leading-relaxed mb-2">"{t.quote}"</p>
                    <cite className="text-xs font-inter font-semibold text-accent not-italic">— {t.author}</cite>
                  </blockquote>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-accent text-white font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all"
              >
                Book This Workshop
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
