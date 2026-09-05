const CDN = 'https://assets.aidentran.dev/Artwork'

export type Artwork = {
  slug: string
  title: string
  year: number
  medium: string
  dimensions?: string
  description: string
  image: string
}

export const artwork: Artwork[] = [
  {
    slug: 'self-reflection',
    title: 'Self Reflection',
    year: 2026,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/SelfReflection.v1.webp`,
  },
  {
    slug: 'binder-cover',
    title: 'Binder Cover',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/BinderCover.v1.webp`,
  },
  {
    slug: 'bird',
    title: 'Bird',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Bird.v1.webp`,
  },
  {
    slug: 'cat',
    title: 'Cat',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Cat.v1.webp`,
  },
  {
    slug: 'self-portrait-old',
    title: 'Self Portrait (Old)',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/SelfPortraitOld.v1.webp`,
  },
  {
    slug: 'sketch-1',
    title: 'Sketch I',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Sketch1.v1.webp`,
  },
  {
    slug: 'sketch-2',
    title: 'Sketch II',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Sketch2.v1.webp`,
  },
  {
    slug: 'sketch-3',
    title: 'Sketch III',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Sketch3.v1.webp`,
  },
  {
    slug: 'sketch-4',
    title: 'Sketch IV',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Sketch4.v1.webp`,
  },
  {
    slug: 'ultrakill',
    title: 'Ultrakill',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: `${CDN}/Ultrakill.v1.webp`,
  },
]
