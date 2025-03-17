// components/Navbar.tsx
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import { FiHome, FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Register event listeners
  useEffect(() => {
    // Function for closing the menu when click from outside
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // If click is on hamburger menu or within dropdown, ignore
      if (
        target.closest(".mobile-menu-button") ||
        target.closest(".mobile-dropdown-menu")
      ) {
        return;
      }

      // If menu is open, close menu
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Function for closing the menu when ScrollLink is clicked
    const handleScrollLinkClick = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Function for finding all ScrollLinks on the page (including those outside the navbar)
    const scrollLinks = document.querySelectorAll("[data-scroll-link='true']");

    // Add event listener for each ScrollLink
    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScrollLinkClick);
    });

    // Tambahkan event listener untuk click di luar
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup semua event listeners saat unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScrollLinkClick);
      });
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full bg-navy/90 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className="text-lightest-slate hover:text-green transition"
        >
          <FiHome className="text-green text-xl transition-transform group-hover:scale-110" />
        </ScrollLink>

        {/* Desktop Menu (Hidden in Mobile) */}
        <div className="hidden md:flex gap-8">
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="text-lightest-slate hover:text-green transition"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="projects"
            spy={true}
            smooth={true}
            duration={500}
            className="text-lightest-slate hover:text-green transition cursor-pointer"
          >
            Projects
          </ScrollLink>
        </div>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://github.com/gunturwsn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="text-lightest-slate hover:text-green transition text-xl" />
          </a>
          <a
            href="https://linkedin.com/in/guntur-wicaksono"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin className="text-lightest-slate hover:text-green transition text-xl" />
          </a>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="text-lightest-slate hover:text-green transition mobile-menu-button"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full w-full bg-navy/95 backdrop-blur mobile-dropdown-menu">
          <div className="flex flex-col items-center py-4 gap-6">
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="text-lightest-slate hover:text-green transition cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              About
            </ScrollLink>
            <ScrollLink
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              className="text-lightest-slate hover:text-green transition cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </ScrollLink>

            {/* Social Icons (Mobile) */}
            <div className="flex gap-6 mt-4">
              <a
                href="https://github.com/gunturwsn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="text-lightest-slate hover:text-green transition text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/guntur-wicaksono"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="text-lightest-slate hover:text-green transition text-2xl" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
