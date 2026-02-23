import { useRef, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "@components/ProjectCard.tsx";
import "@styles/Components/HomePage/Projects.css";
import { motion, useInView } from "framer-motion";
import projectData from "@data/projects.json"

const TOP_PROJECTS_COUNT = 5;
const SCROLL_SPEED = 1.5;

const Projects: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const setWidthRef = useRef(0);

  const topProjects = useMemo(() => {
    return projectData.slice(0, TOP_PROJECTS_COUNT);
  }, []);

  const isInView = useInView(wrapperRef, { once: true, amount: 0.2 });

  const duplicatedProjects = [...topProjects, ...topProjects, ...topProjects];

  useEffect(() => {
    if (isInView && !hasEntered) {
      const timer = setTimeout(() => setHasEntered(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasEntered]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.children.length < TOP_PROJECTS_COUNT + 1) return;

    const measure = () => {
      const first = track.children[0] as HTMLElement;
      const nth = track.children[TOP_PROJECTS_COUNT] as HTMLElement;
      setWidthRef.current = nth.offsetLeft - first.offsetLeft;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [topProjects]);

  useEffect(() => {
    if (!isInView) return;

    const tick = () => {
      if (selectedIndex === null) {
        offsetRef.current += SCROLL_SPEED;

        const setWidth = setWidthRef.current;
        if (setWidth > 0 && offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, selectedIndex, isHovered]);


  return (
    <div className="projectsWrapper" ref={wrapperRef}>
      <div
        className="projectsScrollContainer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="projectsTrack" ref={trackRef}>
          {duplicatedProjects.map((project, i) => (
            <motion.div
              className="projectsTrackItem"
              key={`${project.title}-${i}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: selectedIndex === i ? 1.08 : 1,
              } : undefined}
              transition={{
                duration: 0.35,
                ease: [0.175, 0.885, 0.32, 1.275],
                delay: !hasEntered ? (i % TOP_PROJECTS_COUNT) * 0.12 : 0,
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                videoSrc={project.videoSrc}
                videoCDN={project.videoCDN}
                createdDate={project.createdDate}
                languages={project.languages}
                url={project.url}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="seeMoreContainer">
        <Link to="/projects" className="seeMoreButton bevelContainer">
          See All Projects
        </Link>
      </div>
    </div>
  );
};

export default Projects;
