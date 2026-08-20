import { Link } from 'react-router-dom'
import { recentBlogs } from '../data/blogs'
import { PostCard } from '../components/PostCard'
import './RecentPosts.css'

export function RecentPosts() {
  return (
    <section className="recent-posts">
      <Link className="recent-posts__heading" to="/posts">
        <h2>Recent Posts</h2>
        <img src="/icons/link-arrow.svg" alt="" aria-hidden="true" />
      </Link>
      <div className="recent-posts__list">
        {recentBlogs.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
