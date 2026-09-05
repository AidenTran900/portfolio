import type { Artwork } from '../data/artwork'
import './ArtworkCard.css'

export function ArtworkCard({ piece, onOpen }: { piece: Artwork; onOpen: () => void }) {
  return (
    <button type="button" className="artwork-card" onClick={onOpen} aria-label={`View ${piece.title}`}>
      <img className="artwork-card__image" src={piece.image} alt={piece.title} loading="lazy" />
      <div className="artwork-card__overlay">
        <span className="artwork-card__meta">
          {piece.medium} · {piece.year}
        </span>
        <span className="artwork-card__title">{piece.title}</span>
      </div>
    </button>
  )
}
