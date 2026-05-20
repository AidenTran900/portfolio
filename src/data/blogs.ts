export type BlogPost = {
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  readTime: string
  file: string // path under /public
}

export const blogs: BlogPost[] = [
  {
    slug: 'rollback-netcode',
    title: 'Rollback Netcode: My Insights',
    description:
      'A personal look into the challenges and takeaways from building rollback netcode from scratch for ChromaClash.',
    tags: ['Networking', 'Game Development'],
    date: '2024-12',
    readTime: '8 min',
    file: '/blogs/rollback_netcode.md',
  },
]
