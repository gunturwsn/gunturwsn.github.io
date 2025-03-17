import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";
import { projects } from "@/content/projects";

// Definisikan interface untuk tipe Project
interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tech: string[];
  features?: string[];
  github?: string;
  demo?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setZoomLevel(1); // Reset zoom level when opening new project
    setPosition({ x: 0, y: 0 }); // Reset position
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setIsFullscreen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const newZoom = Math.min(prev + 0.25, 3); // Max zoom 3x
      // Center the position when zooming
      if (prev === 1 && newZoom > 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.25, 0.5); // Min zoom 0.5x
      // Reset position if zooming out to or below 100%
      if (newZoom <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen((prev) => !prev);
  };

  // Calculate dragging bounds based on container size and zoom level
  const calculateBounds = useCallback(() => {
    if (!imageContainerRef.current)
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const container = imageContainerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Calculate the size of the zoomed image
    const zoomedWidth = containerRect.width * zoomLevel;
    const zoomedHeight = containerRect.height * zoomLevel;

    // Calculate how much the image can be dragged
    const dragLimitX = (zoomedWidth - containerRect.width) / 2;
    const dragLimitY = (zoomedHeight - containerRect.height) / 2;

    return {
      minX: -dragLimitX,
      maxX: dragLimitX,
      minY: -dragLimitY,
      maxY: dragLimitY,
    };
  }, [zoomLevel]);

  // Mouse down handler to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return; // Only allow dragging when zoomed in

    e.preventDefault();
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Touch start handler for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1) return; // Only allow dragging when zoomed in

    setIsDragging(true);
    setStartPosition({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  // Mouse move handler for dragging
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;

      // Limit the dragging within bounds
      const bounds = calculateBounds();

      setPosition({
        x: Math.max(Math.min(newX, bounds.maxX), bounds.minX),
        y: Math.max(Math.min(newY, bounds.maxY), bounds.minY),
      });
    },
    [isDragging, startPosition, calculateBounds],
  );

  // Touch move handler for mobile devices
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;

      const newX = e.touches[0].clientX - startPosition.x;
      const newY = e.touches[0].clientY - startPosition.y;

      // Limit the dragging within bounds
      const bounds = calculateBounds();

      setPosition({
        x: Math.max(Math.min(newX, bounds.maxX), bounds.minX),
        y: Math.max(Math.min(newY, bounds.maxY), bounds.minY),
      });
    },
    [isDragging, startPosition, calculateBounds],
  );

  // Mouse up handler to end dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners for mouse/touch events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove as EventListener);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove as EventListener);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  // Reset position when zoom level changes to 1 or below
  useEffect(() => {
    if (zoomLevel <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  return (
    <section id="projects" className="py-20 px-4 bg-navy">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h3 className="text-3xl font-bold text-lightest-slate mb-8 text-center">
          Projects
        </h3>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-light-navy rounded-lg p-6 hover:-translate-y-2 transition-transform cursor-pointer"
              onClick={() => openProjectDetails(project)}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Content */}
              <div>
                <h4 className="text-lightest-slate text-xl font-semibold mb-2">
                  {project.title}
                </h4>
                <p className="text-slate text-sm mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-green bg-green/10 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div
                  className="flex gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-green transition"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-green transition"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-light-navy rounded-lg ${isFullscreen ? "fixed inset-0 rounded-none" : "max-w-3xl w-full max-h-[90vh]"} overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate/20 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-lightest-slate">
                {selectedProject.title}
              </h3>
              <button
                onClick={closeProjectDetails}
                className="text-slate hover:text-green transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Project Image with Zoom Controls */}
              <div className="relative mb-6">
                {/* Zoom Controls */}
                <div className="absolute top-3 right-3 flex space-x-2 z-10 bg-navy/70 p-2 rounded">
                  <button
                    onClick={zoomIn}
                    className="text-slate hover:text-green transition p-1"
                    aria-label="Zoom in"
                  >
                    <FiZoomIn size={20} />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="text-slate hover:text-green transition p-1"
                    aria-label="Zoom out"
                  >
                    <FiZoomOut size={20} />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="text-slate hover:text-green transition p-1"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <FiMinimize size={20} />
                    ) : (
                      <FiMaximize size={20} />
                    )}
                  </button>
                </div>

                {/* Image Container with Drag Support */}
                <div
                  ref={imageContainerRef}
                  className={`relative ${
                    isFullscreen ? "h-[70vh]" : "h-64"
                  } rounded-lg overflow-hidden`}
                  style={{
                    cursor:
                      zoomLevel > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div className="w-full h-full transition-transform duration-200 ease-out overflow-hidden flex justify-center items-center">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                        transition: isDragging
                          ? "none"
                          : "transform 0.2s ease-out",
                      }}
                    >
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-contain"
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center text-xs text-slate">
                  Zoom: {Math.round(zoomLevel * 100)}%
                  {zoomLevel > 1 && <span> (drag to pan)</span>}
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <h4 className="text-lightest-slate text-lg font-semibold mb-2">
                  About the Project
                </h4>
                <p className="text-slate">
                  {selectedProject.longDescription ||
                    selectedProject.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-lightest-slate text-lg font-semibold mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-green bg-green/10 px-3 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              {selectedProject.features && (
                <div className="mb-6">
                  <h4 className="text-lightest-slate text-lg font-semibold mb-2">
                    Key Features
                  </h4>
                  <ul className="list-disc pl-5 text-slate">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="mb-1">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green border border-green px-4 py-2 rounded hover:bg-green/10 transition"
                  >
                    <FiGithub size={18} />
                    <span>Source Code</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green border border-green px-4 py-2 rounded hover:bg-green/10 transition"
                  >
                    <FiExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
