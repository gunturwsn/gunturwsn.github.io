// components/Hero.tsx
import { Link as ScrollLink } from "react-scroll";
export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 bg-navy"
      id="hero"
    >
      <div className="text-center">
        <p className="sm:text-sm md:text-lg lg:text-xl text-green font-mono mb-4">
          Hi, my name is
        </p>
        <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-lightest-slate mb-4">
          Guntur Wicaksono
        </h1>
        {/* <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-6xl text-slate">
          I build things for the web and mobile apps.
        </h2> */}
        <p className="max-w-3xl mx-auto mt-4 text-slate">
          Software Engineer with 4+ years of experience in developing scalable
          web applications and systems.
        </p>
        <ScrollLink
          to="projects"
          spy={false}
          smooth={true}
          duration={500}
          className="inline-block mt-8 px-8 py-3 border border-green text-green rounded hover:bg-green/10 transition"
        >
          Project
        </ScrollLink>
      </div>
    </section>
  );
}
