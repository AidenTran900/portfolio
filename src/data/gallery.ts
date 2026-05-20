export type ArtworkMedium =
  | 'Digital'
  | 'Oil'
  | 'Watercolor'
  | 'Pencil'
  | 'Ink'
  | 'Mixed Media'
  | 'Acrylic'

export type Artwork = {
  id: string
  title: string
  year: number
  medium: ArtworkMedium
  dimensions?: string
  description: string
  // Path relative to /public — e.g. /images/gallery/my-piece.v1.webp
  image: string
}

export const artworks: Artwork[] = [
  {
    id: 'self-reflection',
    title: 'Self Reflection',
    year: 2026,
    medium: 'Digital',
    description:
      'Placeholder description. Replace with your own notes about the piece — inspiration, process, materials, or anything the viewer should know.',
    image: '/images/gallery/SelfReflection.v1.webp',
  },
  {
    id: 'adelie',
    title: 'Adelie',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Adelie.v1.webp',
  },
  {
    id: 'binder-cover',
    title: 'Binder Cover',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/BinderCover.v1.webp',
  },
  {
    id: 'bird',
    title: 'Bird',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Bird.v1.webp',
  },
  {
    id: 'cat',
    title: 'Cat',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Cat.v1.webp',
  },
  {
    id: 'self-portrait-old',
    title: 'Self Portrait (Old)',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/SelfPortraitOld.v1.webp',
  },
  {
    id: 'sketch-1',
    title: 'Sketch I',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch1.v1.webp',
  },
  {
    id: 'sketch-2',
    title: 'Sketch II',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch2.v1.webp',
  },
  {
    id: 'sketch-3',
    title: 'Sketch III',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch3.v1.webp',
  },
  {
    id: 'sketch-4',
    title: 'Sketch IV',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch4.v1.webp',
  },
  {
    id: 'ultrakill',
    title: 'Ultrakill',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Ultrakill.v1.webp',
  },
]
