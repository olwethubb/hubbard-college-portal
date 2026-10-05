import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scrolls to an in-page anchor such as "#contact". */
export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  el?.scrollIntoView({ behavior: "smooth" });
}
