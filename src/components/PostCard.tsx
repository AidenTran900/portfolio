import { Link } from 'react-router-dom'
import type { BlogPost } from '../data/blogs'
import './PostCard.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function PostCard({ post, size = 'compact' }: { post: BlogPost; size?: 'compact' | 'full' }) {
  return (
    <Link to={`/posts/${post.slug}`} className={`post-card post-card--${size}`}>
      <div className="post-card__row">
        <p className="post-card__title">{post.title}</p>
        <p className="post-card__date">{dateFormatter.format(new Date(post.date))}</p>
      </div>
      <p className="post-card__description">{post.description}</p>
    </Link>
  )
}
