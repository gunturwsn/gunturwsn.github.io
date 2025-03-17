// content/projects.ts
export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Note Me",
    description: "Simple note-taking app built with Nuxt.js, MySql, Prisma.",
    tech: ["Vue.js", "Nuxt.js", "MySQL", "Prisma"],
    image: "/images/noteme.png",
    github: "https://github.com/you/payment-api",
  },
  // Tambahkan 4-6 proyek lainnya
];
