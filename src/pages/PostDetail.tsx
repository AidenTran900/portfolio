import { Link, useParams } from 'react-router-dom'
import { recentBlogs } from '../data/blogs'
import { Tag } from '../components/Tag'
import { BackButton } from '../components/BackButton'
import { Markdown } from '../components/Markdown'
import { useMarkdownFile } from '../hooks/useMarkdownFile'
import './DetailPage.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const index = recentBlogs.findIndex((p) => p.slug === slug)
  const post = index >= 0 ? recentBlogs[index] : undefined
  const next = index >= 0 && recentBlogs.length > 1 ? recentBlogs[(index + 1) % recentBlogs.length] : undefined
  const markdown = useMarkdownFile(post?.file)

  if (!post) {
    return (
      <div className="container detail-page">
        <div className="detail-page__missing">
          <p>Post not found.</p>
          <BackButton />
        </div>
      </div>
    )
  }

  return (
    <article className="container detail-page" key={post.slug}>
      <BackButton />

      <header className="detail-page__header">
        <h1 className="detail-page__title">{post.title}</h1>
        <p className="detail-page__lede">{post.description}</p>

        <div className="detail-page__facts">
          <div>
            <p className="detail-page__facts-label">Date</p>
            <p className="detail-page__facts-value">{dateFormatter.format(new Date(post.date))}</p>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="detail-page__tags">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </header>

      <div className="detail-page__body">
        {markdown.status === 'loading' && <p className="detail-page__status">Loading…</p>}
        {markdown.status === 'error' && (
          <p className="detail-page__status">Couldn't load this post. Try refreshing.</p>
        )}
        {markdown.status === 'loaded' && <Markdown content={markdown.content} />}
      </div>

      {next && (
        <Link to={`/posts/${next.slug}`} className="detail-page__next">
          <span className="detail-page__next-label">Next post</span>
          <span className="detail-page__next-title">{next.title}</span>
        </Link>
      )}
    </article>
  )
}
