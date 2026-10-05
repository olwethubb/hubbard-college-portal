import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const STATS = [
  { value: "60+", label: "Professional Courses" },
  { value: "1000+", label: "Happy Attendees" },
  { value: "50+", label: "Workshop Locations" },
  { value: "25+", label: "Years Experience" },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/site/hero-team.webp"
          alt="Professional business team collaborating"
          width={1344}
          height={768}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm font-inter font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
              South Africa's Premier Management College
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-6"
          >
            Transform Your <span className="text-white/80 italic">Management</span>
            <br />
            Capabilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white/70 font-inter leading-relaxed mb-10 max-w-lg"
          >
            Practical workshops, proven management courses, and hands-on training that equip you with the skills to
            lead with confidence and drive real results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-white font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-black/20"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <button
              onClick={() => scrollToSection("#about")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 text-white font-inter font-medium rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Learn More
            </button>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse text-center md:text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <dt className="text-sm text-white/60 font-inter">{stat.label}</dt>
              <dd className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-1">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
