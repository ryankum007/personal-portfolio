import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Philosophy from "@/components/sections/Philosophy";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <About />
      <Timeline />
      <Philosophy />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills />
      <Experience />
      <SectionDivider />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
}
