import { Link } from 'react-router-dom'
import { featuredProjects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import './FeaturedProjects.css'

export function FeaturedProjects() {
  return (
    <section className="featured-projects">
      <Link className="featured-projects__heading" to="/projects">
        <h2>Featured Projects</h2>
        <img src="/icons/link-arrow.svg" alt="" aria-hidden="true" />
      </Link>
      <div className="featured-projects__grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
