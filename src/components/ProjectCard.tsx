import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { Tag } from './Tag'
import { LinkButton } from './LinkButton'
import { ProjectMedia } from './ProjectMedia'
import './ProjectCard.css'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__thumbnail">
        <ProjectMedia project={project} />
      </div>
      <div className="project-card__body">
        <div className="project-card__row">
          <h3 className="project-card__title">
            <Link to={`/projects/${project.slug}`} className="project-card__link">
              {project.title}
            </Link>
          </h3>
          <span className="project-card__year">{project.year}</span>
        </div>
        {project.role && <p className="project-card__role">{project.role}</p>}
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tags">
          {project.stack.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        {project.url && (
          <div className="project-card__actions">
            <LinkButton className="link-button--small project-card__source" label="Source" href={project.url} />
          </div>
        )}
      </div>
    </article>
  )
}
