import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Projects } from "./components/Projects";
import { RevealObserver } from "./components/RevealObserver";
import { SiteNav } from "./components/SiteNav";
import { Skills } from "./components/Skills";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Highlights />
        <Projects />
        <Skills />
        <Certificates />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <RevealObserver />
    </>
  );
}
