import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { blogs } from '@/data/blogs'

export default function BlogPost() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const post = useMemo(() => blogs.find((b) => b.slug === slug), [slug])
  const indexInList = useMemo(() => blogs.findIndex((b) => b.slug === slug), [slug])
  const nextPost = useMemo(
    () => (indexInList >= 0 ? blogs[(indexInList + 1) % blogs.length] : null),
    [indexInList]
  )
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!post) return
    let cancelled = false
    fetch(post.file)
      .then((r) => {
        if (!r.ok) throw new Error('not ok')
        return r.text()
      })
      .then((text) => {
        if (!cancelled) setContent(text)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [post])

  if (!post) {
    return (
      <div className="container-prose pt-40 pb-24 text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl mb-6">Post not found</h1>
        <Link to="/blog" className="btn-ghost">All writing</Link>
      </div>
    )
  }

  return (
    <article className="pt-32 md:pt-40 pb-24">
      <header className="container-prose mb-12 md:mb-16">
        {/* Swiss header rail */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 items-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="col-span-3 md:col-span-2 eyebrow !text-[var(--color-ink)] inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back
          </button>
          <motion.div
            layoutId="page-header-rail"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-10"
        >
          {/* Swiss index + meta */}
          <div className="flex items-baseline justify-center gap-4 mb-6">
            <span className="font-mono text-xs tracking-widest text-[var(--color-ink)]">
              {indexInList >= 0 ? String(blogs.length - indexInList).padStart(2, '0') : '—'}
            </span>
            <span className="eyebrow !text-[var(--color-ink)]">Writing</span>
          </div>

          <motion.h1
            layoutId="page-title"
            layout="preserve-aspect"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2rem,6vw,4.5rem)] text-[var(--color-ink)] text-center"
          >
            {post.title}
          </motion.h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-[var(--color-muted-strong)] leading-snug max-w-prose mx-auto text-center">
            {post.description}
          </p>

          {/* Meta strip — Swiss data row under hairline */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-[var(--color-ink)]">
            <div>
              <p className="eyebrow mb-1.5">Date</p>
              <p className="font-display font-medium text-[var(--color-ink)]">{post.date}</p>
            </div>
            <div>
              <p className="eyebrow mb-1.5">Read</p>
              <p className="font-display font-medium text-[var(--color-ink)]">{post.readTime}</p>
            </div>
            <div className="col-span-2">
              <p className="eyebrow mb-1.5">Tags</p>
              <p className="font-display font-medium text-[var(--color-ink)]">
                {post.tags.join(' · ')}
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="container-prose prose-blog"
      >
        {error ? (
          <p className="text-[var(--color-muted-strong)]">Couldn&rsquo;t load this post. Try refreshing.</p>
        ) : !content ? (
          <p className="text-[var(--color-muted)]">Loading…</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        )}
      </motion.div>

      {/* Next post — Swiss block CTA */}
      {nextPost && nextPost.slug !== post.slug && (
        <div className="container-page mt-24">
          <div className="grid grid-cols-12 gap-6 items-center mb-6">
            <p className="eyebrow col-span-3 md:col-span-2 !text-[var(--color-ink)]">Next</p>
            <div className="col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]" />
          </div>

          <Link to={`/blog/${nextPost.slug}`} className="btn-swiss-block group">
            <span className="flex flex-col items-start gap-1 text-left">
              <span className="font-mono text-xs tracking-widest opacity-60">
                {String(((indexInList + 1) % blogs.length) + 1).padStart(2, '0')} / {String(blogs.length).padStart(2, '0')}
              </span>
              <span className="font-display text-2xl md:text-4xl tracking-tight normal-case">
                {nextPost.title}
              </span>
              <span className="font-sans text-sm font-normal normal-case tracking-normal opacity-70 max-w-md mt-1">
                {nextPost.description}
              </span>
            </span>
            <span className="arrow shrink-0">→</span>
          </Link>
        </div>
      )}
    </article>
  )
}
