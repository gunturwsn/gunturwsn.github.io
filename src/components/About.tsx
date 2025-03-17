// components/About.tsx
import Image from "next/image";
import { skills } from "@/content/skills";

export default function About() {
  return (
    <section className="py-20 px-4 bg-light-navy" id="about">
      {/* Container dengan flex di mobile dan grid di desktop */}
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 md:gap-8 items-center">
        {/* Avatar Container - Dengan Elemen Geometris yang Lebih Kecil */}
        <div className="w-full flex justify-center md:flex md:justify-end md:pr-10">
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            {/* Elemen geometris background - offset lebih kecil */}
            <div className="absolute w-full h-full rounded-xl bg-green/20 -right-3 -bottom-3 border border-green/30"></div>
            <div className="absolute w-full h-full rounded-xl bg-lightest-slate/10 -left-3 -top-3 border border-lightest-slate/20"></div>

            {/* Foto dengan bingkai persegi */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-green shadow-lg z-10">
              <Image
                src="/images/avatar.webp"
                alt="Foto Profil"
                fill
                priority
                className="object-cover hover:brightness-110 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* Konten About */}
        <div className="text-center md:text-left md:pl-8 mt-10 md:mt-0">
          {" "}
          {/* Tambahkan padding kiri untuk desktop */}
          <h3 className="text-3xl font-bold text-lightest-slate mb-4">
            About Me
          </h3>
          <p className="text-slate mb-6">
            Software Engineer with 4+ years of experience in developing scalable
            web applications and systems. Proficient in Java, Go, Python,
            JavaScript, and TypeScript, with expertise in Spring, Django, and
            Vue.js. Skilled in optimizing business processes and delivering
            innovative solutions to enhance operational efficiency and user
            experience.
          </p>
          {/* List Skill */}
          <div className="flex justify-center md:justify-start">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mx-auto md:mx-0">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-green">▹</span>
                  <span className="text-lightest-slate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
