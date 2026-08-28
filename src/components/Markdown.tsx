import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './Markdown.css'

function MarkdownImage({ alt, src, title }: { alt?: string; src?: string; title?: string }) {
  const [expanded, setExpanded] = useState(false)
  const sizeMatch = title?.match(/^\d+(%|px)$/)
  const style = sizeMatch ? { width: title } : undefined
  const htmlTitle = sizeMatch ? undefined : title

  useEffect(() => {
    if (!expanded) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [expanded])

  return (
    <>
      <img
        loading="lazy"
        alt={alt ?? ''}
        src={src}
        title={htmlTitle}
        style={style}
        onClick={() => setExpanded(true)}
      />
      {expanded &&
        createPortal(
          <div className="markdown-lightbox" onClick={() => setExpanded(false)}>
            <img src={src} alt={alt ?? ''} />
          </div>,
          document.body,
        )}
    </>
  )
}

const components: Components = {
  a({ href, children, ...props }) {
    if (href?.startsWith('#')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      )
    }
    if (href?.startsWith('/')) {
      return <Link to={href}>{children}</Link>
    }
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  },
  img: MarkdownImage,
}

export function Markdown({ content }: { content: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
