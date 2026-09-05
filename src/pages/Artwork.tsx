import { useState } from 'react'
import { TitleBlock } from '../components/TitleBlock'
import { ArtworkCard } from '../components/ArtworkCard'
import { Lightbox } from '../components/Lightbox'
import { artwork } from '../data/artwork'
import './Artwork.css'

export default function Artwork() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = () => setOpenIndex(null)
  const showPrev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + artwork.length) % artwork.length))
  const showNext = () => setOpenIndex((i) => (i === null ? i : (i + 1) % artwork.length))

  return (
    <div className="container list-page">
      <div className="list-page__content">
        <TitleBlock title="Artwork" subtitle="Personal illustrations." />
        <div className="artwork-page__grid">
          {artwork.map((piece, i) => (
            <ArtworkCard key={piece.slug} piece={piece} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox piece={artwork[openIndex]} onClose={close} onPrev={showPrev} onNext={showNext} />
      )}
    </div>
  )
}
