import './LinkButton.css'

export function LinkButton({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <a className={`link-button ${className ?? ''}`} href={href} target="_blank" rel="noreferrer">
      {label}
      <img className="link-button__arrow" src="/icons/button-arrow.svg" alt="" aria-hidden="true" />
    </a>
  )
}
