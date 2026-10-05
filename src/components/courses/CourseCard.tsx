import { motion } from "framer-motion";
import { Check, GraduationCap, Plus } from "lucide-react";
import type { Course } from "@/lib/courses";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  index: number;
  inCart: boolean;
  /** True for ~2s after the course was added, showing the green "Added" state. */
  justAdded: boolean;
  onAdd: (course: Course) => void;
}

export function CourseCard({ course, index, inCart, justAdded, onAdd }: CourseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden bg-muted">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.name}
            width={330}
            height={286}
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-muted-foreground/40" aria-hidden="true" />
          </div>
        )}
        {course.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-white text-xs font-inter font-semibold rounded-full">
            {course.category}
          </span>
        )}
        {inCart && (
          <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
            <span className="bg-accent text-white text-xs font-inter font-bold px-3 py-1 rounded-full">In Cart</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="font-inter font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">{course.name}</h2>
        {course.duration && <p className="text-xs text-muted-foreground font-inter mb-3">{course.duration}</p>}
        {course.description && (
          <p className="text-xs text-muted-foreground font-inter leading-relaxed mb-4 line-clamp-2">
            {course.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-accent font-inter font-semibold">Contact for Pricing</span>
          <button
            onClick={() => onAdd(course)}
            aria-label={`Add ${course.name} to cart`}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-inter font-semibold transition-all",
              justAdded ? "bg-green-500 text-white" : "bg-accent text-white hover:bg-accent/90",
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
