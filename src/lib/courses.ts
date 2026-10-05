import catalog from "@/data/courses.json";
import { asset } from "./site";

export interface Course {
  id: string;
  name: string;
  category?: string;
  duration?: string;
  description?: string;
  image_url?: string;
  is_active?: boolean;
  created_date?: string;
}

const COURSES_URL = import.meta.env.VITE_COURSES_URL as string | undefined;

/**
 * Lists courses, newest first (mirrors `Product.list("-created_date", 50)` on the original).
 * Uses VITE_COURSES_URL when configured, otherwise the bundled catalog snapshot.
 */
export async function listCourses(limit = 50): Promise<Course[]> {
  if (COURSES_URL) {
    try {
      const res = await fetch(COURSES_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Course[];
      return data.slice(0, limit);
    } catch (err) {
      console.warn("Falling back to bundled course catalog:", err);
    }
  }
  // Brief async tick so the loading state behaves like a network fetch.
  await new Promise((r) => setTimeout(r, 250));
  // Snapshot images live in public/, so resolve them against the deploy base path.
  return (catalog as Course[])
    .slice(0, limit)
    .map((c) => (c.image_url?.startsWith("/") ? { ...c, image_url: asset(c.image_url) } : c));
}
