import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Brain, ChartColumn, Megaphone, MessageSquare, Shield, Target, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURED_COURSES = [
  { icon: MessageSquare, title: "Grammar & Communication", num: "01" },
  { icon: BookOpen, title: "Basic Study Manual", num: "02" },
  { icon: ChartColumn, title: "Management by Statistics", num: "03" },
  { icon: Target, title: "Formulas for Business Success", num: "04" },
  { icon: Users, title: "Improving Business Through Communication", num: "05" },
  { icon: Shield, title: "Ethics for Business Survival", num: "06" },
  { icon: Brain, title: "How to Evaluate & Predict Behaviour", num: "07" },
  { icon: Megaphone, title: "Public Relations", num: "08" },
];

/** The "#courses" section on the homepage: featured curriculum + link to the full catalog. */
export function CurriculumSection() {
  return (
    <section id="courses" className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <SectionHeading
          inverted
          eyebrow="Our Curriculum"
          title="60+ Professional Courses"
          description="Each course includes materials, practical exercises, and drills designed for real-world application in your business."
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_COURSES.map((course, i) => (
            <motion.li
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
            >
              <span className="absolute top-4 right-4 text-xs text-white/20 font-inter font-bold" aria-hidden="true">
                {course.num}
              </span>
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <course.icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-white font-inter font-semibold text-sm leading-snug">{course.title}</h3>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-white/50 font-inter text-sm mb-4">
            Plus many more courses covering sales, project management, executive leadership, and more.
          </p>
          <Link
            to="/courses"
            className="inline-block px-7 py-3.5 bg-white text-primary font-inter font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg"
          >
            View Full Course Catalog
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
