import { getImagePath } from "@/utils/imagePath";

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
    image: getImagePath("/images/noteme.png"),
    github: "https://github.com/gunturwsn/my-portfolio",
  },
];
