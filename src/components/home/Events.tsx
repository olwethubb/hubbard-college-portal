import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/site";

const EVENTS = [
  {
    image: asset("images/site/event-sales-workshop.webp"),
    badge: "Featured",
    title: "SALES Workshop",
    description:
      "Learn skills which will get the majority of your deals to the CLOSE! This hands-on workshop gives you REAL tools to make your sales successful and consistent.",
    date: "Upcoming",
    duration: "2-Day Intensive",
    location: "Johannesburg, SA",
  },
  {
    image: asset("images/site/event-emotions-workplace.webp"),
    badge: "Weekly",
    title: "Emotions in the Workplace",
    description:
      "Learn the secrets of how to select the best staff, avoid hiring the wrong ones, and induce more productivity from your current team.",
    date: "Every Thursday",
    duration: "46 Minutes",
    location: "Online & In-Person",
  },
];

export function Events() {
  return (
    <section id="events" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Don't Miss Out"
          title="Upcoming Events"
          description="Join our upcoming workshops and seminars to accelerate your professional growth."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EVENTS.map((event, i) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  width={1248}
                  height={832}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-primary text-xs font-inter font-bold rounded-full">
                  {event.badge}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3">{event.title}</h3>
                <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-5">{event.description}</p>
                <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground font-inter">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    {event.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    {event.location}
                  </span>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground font-inter font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
                  Book Now
                  <span className="sr-only">: {event.title}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
