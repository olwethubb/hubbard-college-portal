import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONTACT, FACEBOOK_URL } from "@/lib/site";

const CONTACT_DETAILS = [
  { icon: Phone, label: "Call Us", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: MapPin, label: "Visit", value: CONTACT.location },
];

const SUBJECTS = [
  { value: "sales", label: "Sales Workshop" },
  { value: "management", label: "Management Training" },
  { value: "staff", label: "Staff Training" },
  { value: "coaching", label: "Executive Coaching" },
  { value: "consulting", label: "Management Consulting" },
  { value: "analysis", label: "Free Business Analysis" },
  { value: "other", label: "Other" },
];

const labelClass = "text-xs font-inter font-medium text-muted-foreground mb-1.5 block";
const socialClass =
  "w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:border-accent/50 hover:text-accent transition-colors";

export function Contact() {
  const [sent, setSent] = useState(false);

  // Same as the original: acknowledge for 3 seconds (the form has no backend).
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-inter font-semibold text-sm tracking-widest uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground font-inter text-lg leading-relaxed mb-10">
              Whether you're looking for management training, workshop information, or a free business analysis — we'd
              love to hear from you.
            </p>

            <address className="space-y-6 not-italic">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-inter uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground font-inter font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </address>

            <div className="flex gap-3 mt-10">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialClass}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className={socialClass}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 lg:p-10 shadow-sm">
              <h3 className="text-xl font-playfair font-bold text-foreground mb-6">Send Us a Message</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contact-first-name" className={labelClass}>
                    First Name
                  </label>
                  <Input id="contact-first-name" name="firstName" autoComplete="given-name" placeholder="John" className="font-inter" />
                </div>
                <div>
                  <label htmlFor="contact-last-name" className={labelClass}>
                    Last Name
                  </label>
                  <Input id="contact-last-name" name="lastName" autoComplete="family-name" placeholder="Doe" className="font-inter" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="font-inter"
                />
              </div>
              <div className="mb-4">
                <label id="contact-subject-label" className={labelClass}>
                  Subject
                </label>
                <Select name="subject">
                  <SelectTrigger aria-labelledby="contact-subject-label" className="font-inter">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us about your needs..."
                  rows={4}
                  className="font-inter resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full py-3.5 bg-accent text-primary font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {sent ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="sr-only" role="status" aria-live="polite">
                {sent ? "Message sent" : ""}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
