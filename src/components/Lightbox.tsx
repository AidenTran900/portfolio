import { useEffect } from 'react'
import type { Artwork } from '../data/artwork'
import './Lightbox.css'

export function Lightbox({
  piece,
  onClose,
  onPrev,
  onNext,
}: {
  piece: Artwork
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__image-wrap">
          <img className="lightbox__image" src={piece.image} alt={piece.title} />
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Previous piece">
            ‹
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Next piece">
            ›
          </button>
        </div>

        <div className="lightbox__info">
          <span className="lightbox__meta">{piece.medium}</span>
          <h2 className="lightbox__title">{piece.title}</h2>
          <p className="lightbox__facts">
            {piece.year}
            {piece.dimensions ? ` · ${piece.dimensions}` : ''}
          </p>
          <div className="lightbox__rule" />
          <p className="lightbox__description">{piece.description}</p>
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
