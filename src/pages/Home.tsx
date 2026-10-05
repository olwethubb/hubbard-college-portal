import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { CurriculumSection } from "@/components/home/CurriculumSection";
import { Events } from "@/components/home/Events";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import { useSeo } from "@/hooks/useSeo";
import { SITE_NAME } from "@/lib/site";

export default function Home() {
  useSeo({ title: SITE_NAME, path: "/" });

  return (
    <div className="min-h-screen font-inter">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <CurriculumSection />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
