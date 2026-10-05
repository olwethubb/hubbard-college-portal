import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-8">
              <Quote className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
          </motion.div>

          <figure>
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-medium text-foreground leading-tight mb-8"
            >
              "The only <span className="text-accent italic">richness</span> there is, is{" "}
              <span className="text-accent italic">understanding</span>."
            </motion.blockquote>
            <motion.figcaption
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground font-inter text-lg mb-12"
            >
              — L. Ron Hubbard
            </motion.figcaption>
          </figure>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground font-inter text-lg leading-relaxed">
              Hubbard College of Administration South Africa delivers the most comprehensive collection of workable
              management knowledge available. Our courses strike the perfect balance between theory and practical
              application — with emphasis on true understanding, which is the foundation of successful implementation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
