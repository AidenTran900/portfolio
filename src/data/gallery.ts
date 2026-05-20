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
  // Path relative to /public — e.g. /images/gallery/my-piece.webp
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
    image: '/images/gallery/SelfReflection.webp',
  },
  {
    id: 'adelie',
    title: 'Adelie',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Adelie.webp',
  },
  {
    id: 'binder-cover',
    title: 'Binder Cover',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/BinderCover.webp',
  },
  {
    id: 'bird',
    title: 'Bird',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Bird.webp',
  },
  {
    id: 'cat',
    title: 'Cat',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Cat.webp',
  },
  {
    id: 'self-portrait-old',
    title: 'Self Portrait (Old)',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/SelfPortraitOld.webp',
  },
  {
    id: 'sketch-1',
    title: 'Sketch I',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch1.webp',
  },
  {
    id: 'sketch-2',
    title: 'Sketch II',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch2.webp',
  },
  {
    id: 'sketch-3',
    title: 'Sketch III',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch3.webp',
  },
  {
    id: 'sketch-4',
    title: 'Sketch IV',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch4.webp',
  },
  {
    id: 'ultrakill',
    title: 'Ultrakill',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Ultrakill.webp',
  },
]
