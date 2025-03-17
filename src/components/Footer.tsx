// components/Footer.tsx
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy py-8 px-4 border-t border-green/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="mailto:you@domain.com"
            aria-label="Send email"
            className="hover:transform hover:scale-110 transition-transform"
          >
            <FiMail className="text-lightest-slate hover:text-green transition text-xl" />
            <span className="sr-only">Email</span>
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:transform hover:scale-110 transition-transform"
          >
            <FiGithub className="text-lightest-slate hover:text-green transition text-xl" />
            <span className="sr-only">GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:transform hover:scale-110 transition-transform"
          >
            <FiLinkedin className="text-lightest-slate hover:text-green transition text-xl" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>

        <p className="text-slate text-sm">
          © {currentYear} Guntur Wicaksono. Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}
