import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Light text for sections on the navy background. */
  inverted?: boolean;
}

/** Centered eyebrow + H2 + lead paragraph used by Services, Courses and Events. */
export function SectionHeading({ eyebrow, title, description, inverted }: SectionHeadingProps) {
  return (
    <Reveal className="text-center mb-16">
      <span
        className={cn(
          "font-inter font-semibold text-sm tracking-widest uppercase mb-4 block",
          inverted ? "text-white/60" : "text-accent",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-2xl mx-auto font-inter text-lg",
          inverted ? "text-white/60" : "text-muted-foreground",
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}
