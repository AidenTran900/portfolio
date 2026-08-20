export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  file: string
}

export const blogs: BlogPost[] = [
  {
    slug: 'rollback-netcode',
    title: 'Rollback Netcode: My Insights',
    description:
      'An overview of rollback netcode, as well as the challenges and takeaways from building it from scratch for ChromaClash.',
    date: '2024-12-01',
    tags: ['Networking', 'Game Development'],
    file: '/blogs/rollback_netcode.md',
  },
]

export const recentBlogs = [...blogs].sort((a, b) => b.date.localeCompare(a.date))
