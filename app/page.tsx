import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Beyond } from "./components/Beyond";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { RevealObserver } from "./components/RevealObserver";
import { SiteNav } from "./components/SiteNav";
import { Skills } from "./components/Skills";
import { ViewOnlyGuard } from "./components/ViewOnly";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Certificates />
        <About />
        <Education />
        <Beyond />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <RevealObserver />
      <ViewOnlyGuard />
    </>
  );
}
