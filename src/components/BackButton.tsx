import { useNavigate } from 'react-router-dom'
import './BackButton.css'

export function BackButton({ className }: { className?: string }) {
  const navigate = useNavigate()

  return (
    <button type="button" className={`back-button ${className ?? ''}`} onClick={() => navigate(-1)}>
      <img className="back-button__arrow" src="/icons/link-arrow.svg" alt="" aria-hidden="true" />
      Back
    </button>
  )
}
