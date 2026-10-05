import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Starting offset. Defaults to a 20px rise, matching the original's section headers. */
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
};

/** Fade/slide in once when scrolled into view — the original's `whileInView` pattern. */
export function Reveal({ y = 20, x = 0, delay = 0, duration = 0.6, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      {...props}
    />
  );
}
