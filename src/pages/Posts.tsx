import { PageBackground } from '../components/PageBackground'
import { TitleBlock } from '../components/TitleBlock'
import { PostCard } from '../components/PostCard'
import { recentBlogs } from '../data/blogs'
import './ListPage.css'

export default function Posts() {
  return (
    <div className="container list-page">
      {/* <PageBackground /> */}
      <div className="list-page__content">
        <TitleBlock title="Posts" subtitle="Posts and takeaways of things I've done." />
        <div className="list-page__stack">
          {recentBlogs.map((post) => (
            <PostCard key={post.slug} post={post} size="full" />
          ))}
        </div>
      </div>
    </div>
  )
}
