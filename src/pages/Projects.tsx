// import { PageBackground } from '../components/PageBackground'
import { TitleBlock } from '../components/TitleBlock'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import './ListPage.css'

export default function Projects() {
  return (
    <div className="container list-page">
      {/* <PageBackground /> */}
      <div className="list-page__content">
        <TitleBlock title="Projects" subtitle="All of my personal projects." />
        <div className="list-page__grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
