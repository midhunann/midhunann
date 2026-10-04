import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import Recognition from '@/components/Recognition';

export default function Page() {
  return (
    <>
      <Intro />
      <Experience />
      <Projects />
      <Recognition />
      <Contact />
      <Footer />
    </>
  );
}
