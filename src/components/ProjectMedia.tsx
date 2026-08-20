import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import './ProjectMedia.css'

const observerOptions: IntersectionObserverInit = { threshold: 0.25, rootMargin: '100px' }

export function ProjectMedia({ project, className }: { project: Project; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, observerOptions)

    observer.observe(video)
    return () => observer.disconnect()
  }, [project.video])

  if (!project.video) {
    return <img className={className} src={project.thumbnail ?? '/images/hero-clouds.jpg'} alt="" />
  }

  return (
    <div className={`project-media ${className ?? ''}`}>
      <img className="project-media__poster" src={project.thumbnail ?? '/images/hero-clouds.jpg'} alt="" aria-hidden="true" />
      <video
        key={project.video}
        ref={videoRef}
        src={project.video}
        className={`project-media__video ${ready ? 'project-media__video--ready' : ''}`}
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setReady(true)}
      />
    </div>
  )
}
