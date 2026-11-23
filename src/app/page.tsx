import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Initiatives } from "@/components/sections/Initiatives";
import { Legacy } from "@/components/sections/Legacy";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 bg-ivory px-4 py-3 text-sm font-semibold text-charcoal focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Stats />
        <Projects />
        <Expertise />
        <Initiatives />
        <Legacy />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
