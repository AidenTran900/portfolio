import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { Tag } from '../components/Tag'
import { LinkButton } from '../components/LinkButton'
import { BackButton } from '../components/BackButton'
import { ProjectMedia } from '../components/ProjectMedia'
import { Markdown } from '../components/Markdown'
import { useMarkdownFile } from '../hooks/useMarkdownFile'
import './DetailPage.css'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : undefined
  const next = index >= 0 && projects.length > 1 ? projects[(index + 1) % projects.length] : undefined
  const markdown = useMarkdownFile(project?.file)

  if (!project) {
    return (
      <div className="container detail-page">
        <div className="detail-page__missing">
          <p>Project not found.</p>
          <BackButton />
        </div>
      </div>
    )
  }

  return (
    <article className="container detail-page" key={project.slug}>
      <BackButton />

      <header className="detail-page__header">
        <h1 className="detail-page__title">{project.title}</h1>
        <p className="detail-page__lede">{project.description}</p>

        <div className="detail-page__facts">
          <div>
            <p className="detail-page__facts-label">Year</p>
            <p className="detail-page__facts-value">{project.year}</p>
          </div>
          {project.role && (
            <div>
              <p className="detail-page__facts-label">Role</p>
              <p className="detail-page__facts-value">{project.role}</p>
            </div>
          )}
        </div>

        <div className="detail-page__tags">
          {project.stack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        {project.url && (
          <div className="detail-page__actions">
            <LinkButton label="View source" href={project.url} />
          </div>
        )}
      </header>

      <div className="detail-page__thumbnail">
        <ProjectMedia project={project} />
      </div>

      {project.file && (
        <div className="detail-page__body">
          {markdown.status === 'loading' && <p className="detail-page__status">Loading…</p>}
          {markdown.status === 'error' && (
            <p className="detail-page__status">Couldn't load this write-up. Try refreshing.</p>
          )}
          {markdown.status === 'loaded' && <Markdown content={markdown.content} />}
        </div>
      )}

      {next && (
        <Link to={`/projects/${next.slug}`} className="detail-page__next">
          <span className="detail-page__next-label">Next project</span>
          <span className="detail-page__next-title">{next.title}</span>
        </Link>
      )}
    </article>
  )
}
