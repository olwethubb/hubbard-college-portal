import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ClipboardCheck, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/site";
import { SalesWorkshopModal } from "./SalesWorkshopModal";

const SERVICES = [
  {
    icon: BookOpen,
    title: "Workshops & Seminars",
    description:
      "Attend hands-on workshops that take you through essential management steps in a balanced manner, giving you confidence to apply what you've learned.",
    image: asset("images/site/service-workshops.webp"),
    tag: "Interactive",
    opensModal: true,
  },
  {
    icon: TrendingUp,
    title: "Management Training",
    description:
      "Get practical knowledge in specific areas of management. Learn to manage projects, tasks, and people with greater control and effectiveness.",
    image: asset("images/site/service-management.webp"),
    tag: "Comprehensive",
  },
  {
    icon: ClipboardCheck,
    title: "Free Business Analysis",
    description:
      "Stop guessing what's wrong in your business. Take our comprehensive assessment that identifies trouble areas and maps a clear path forward.",
    image: asset("images/site/service-analysis.webp"),
    tag: "Complimentary",
  },
];

export function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <SalesWorkshopModal open={modalOpen} onClose={closeModal} />
      <section id="services" className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Our Core Services"
            description="Practical, results-driven programs designed to transform your management capabilities and business performance."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    width={1184}
                    height={864}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-xs font-inter font-semibold rounded-full">
                    {service.tag}
                  </span>
                </div>
                <div className="p-7">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                    <service.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-5">{service.description}</p>
                  <button
                    onClick={service.opensModal ? () => setModalOpen(true) : undefined}
                    aria-haspopup={service.opensModal ? "dialog" : undefined}
                    className="group/btn inline-flex items-center gap-2 text-accent font-inter font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Learn More
                    <span className="sr-only"> about {service.title}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
