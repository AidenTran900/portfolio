import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogs } from '@/data/blogs'
import { FilterSidebar } from '@/components/FilterSidebar'

const blogTags = [...new Set(blogs.flatMap((b) => b.tags))].sort()

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? blogs
    : blogs.filter((b) => b.tags.includes(activeTag))

  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="container-page">
        {/* Swiss section rail */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 items-center mb-10 md:mb-14"
        >
          <p className="eyebrow col-span-6 md:col-span-2 !text-[var(--color-ink)]">
            Writing — {String(filtered.length).padStart(2, '0')}
          </p>
          <motion.div
            layoutId="page-header-rail"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque col-span-6 md:col-span-10 h-px bg-[var(--color-ink)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 mb-14 md:mb-20"
        >
          <motion.h1
            layoutId="page-title"
            layout="preserve-aspect"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque col-span-12 md:col-span-8 font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2.2rem,6vw,5rem)] text-[var(--color-ink)]"
          >
            Blogs from
            <br />
            <span className="text-[var(--color-accent)]">the build.</span>
          </motion.h1>
          <p className="col-span-12 md:col-span-4 md:self-end text-[15px] md:text-[16px] text-[var(--color-muted-strong)] leading-[1.55] max-w-prose">
            Technical writeups and things I learned.
          </p>
        </motion.div>

        <div className="border-t border-[var(--color-ink)] pt-14 md:pt-20">
          <FilterSidebar tags={blogTags} activeTag={activeTag} onTagChange={setActiveTag} />
          <div>
            {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="border-b border-[var(--color-rule)]"
                >
                  <Link to={`/blog/${post.slug}`} className="group block py-10 md:py-12 cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
                      <div className="md:col-span-2 flex md:block items-baseline gap-3">
                        <p className="font-mono text-xs tracking-wider text-[var(--color-ink)]">
                          {String(filtered.length - i).padStart(2, '0')}
                        </p>
                        <p className="eyebrow text-[var(--color-muted)] md:mt-2">{post.date}</p>
                        <p className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted)] md:mt-1">
                          {post.readTime}
                        </p>
                      </div>
                      <div className="md:col-span-7">
                        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-base md:text-lg text-[var(--color-muted-strong)] leading-relaxed max-w-xl">
                          {post.description}
                        </p>
                      </div>
                      <div className="md:col-span-3 flex flex-wrap gap-x-3 md:justify-end">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="font-display text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
