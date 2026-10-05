import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Search, ShoppingCart } from "lucide-react";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { useSeo } from "@/hooks/useSeo";
import { useUser } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { listCourses, type Course } from "@/lib/courses";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Courses() {
  const user = useUser();
  const { addToCart, totalItems, cart } = useCart();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    listCourses(50).then((list) => {
      if (!active) return;
      setCourses(list);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useSeo({
    title: `Course Catalog | ${SITE_NAME}`,
    description: "Browse Hubbard College courses and add them to your cart — a Sales Advisor will reach out to guide you.",
    path: "/courses",
    jsonLd: courses.length
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: courses.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Course",
              name: c.name,
              description: c.description,
              ...(c.image_url && { image: SITE_URL + c.image_url }),
              provider: { "@type": "CollegeOrUniversity", name: "Hubbard College of Administration South Africa" },
            },
          })),
        }
      : undefined,
  });

  const handleAdd = (course: Course) => {
    addToCart(course);
    setJustAdded((prev) => new Set([...prev, course.id]));
    setTimeout(
      () =>
        setJustAdded((prev) => {
          const next = new Set(prev);
          next.delete(course.id);
          return next;
        }),
      2000,
    );
  };

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category).filter((c): c is string => Boolean(c))))],
    [courses],
  );

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(q) || (c.category || "").toLowerCase().includes(q);
    return matchesSearch && (category === "All" || c.category === category);
  });

  const inCart = (id: string) => cart.some((i) => i.id === id);

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-white/60 text-sm font-inter">
            Welcome, {user?.full_name || user?.email}
          </span>
          <Link
            to="/cart"
            aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </PortalHeader>

      <div className="bg-primary py-14 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4"
          >
            Browse Our Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 font-inter text-lg mb-8 max-w-2xl mx-auto"
          >
            Add courses to your cart and a Sales Advisor will reach out to guide you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
              aria-hidden="true"
            />
            <Input
              aria-label="Search courses"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
            />
          </motion.div>

          {!loading && categories.length > 1 && (
            <motion.div
              role="group"
              aria-label="Filter by category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mt-5"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-inter font-semibold transition-all",
                    category === cat
                      ? "bg-accent text-white shadow-md shadow-accent/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12" aria-busy={loading}>
        {loading ? (
          <div className="flex justify-center py-24" role="status">
            <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="sr-only">Loading courses…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground font-inter">No courses found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                index={i}
                inCart={inCart(course.id)}
                justAdded={justAdded.has(course.id)}
                onAdd={handleAdd}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
