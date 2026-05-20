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
  // Path relative to /public — e.g. /images/gallery/my-piece.png
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
    image: '/images/gallery/SelfReflection.png',
  },
  {
    id: 'adelie',
    title: 'Adelie',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Adelie.png',
  },
  {
    id: 'binder-cover',
    title: 'Binder Cover',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/BinderCover.png',
  },
  {
    id: 'bird',
    title: 'Bird',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Bird.png',
  },
  {
    id: 'cat',
    title: 'Cat',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Cat.png',
  },
  {
    id: 'self-portrait-old',
    title: 'Self Portrait (Old)',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/SelfPortraitOld.png',
  },
  {
    id: 'sketch-1',
    title: 'Sketch I',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch1.png',
  },
  {
    id: 'sketch-2',
    title: 'Sketch II',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch2.png',
  },
  {
    id: 'sketch-3',
    title: 'Sketch III',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch3.png',
  },
  {
    id: 'sketch-4',
    title: 'Sketch IV',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Sketch4.png',
  },
  {
    id: 'ultrakill',
    title: 'Ultrakill',
    year: 2024,
    medium: 'Digital',
    description: 'Placeholder description.',
    image: '/images/gallery/Ultrakill.png',
  },
]
