import { profile } from '../data/profile'
import { LinkButton } from './LinkButton'
import './ContactRow.css'

export function ContactRow() {
  return (
    <div className="contact-row">
      <p className="contact-row__location">Location: {profile.location}</p>
      <div className="contact-row__actions">
        <a className="contact-row__icon-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <img src="/icons/linkedin.svg" alt="" />
        </a>
        <a className="contact-row__icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <img src="/icons/github.svg" alt="" />
        </a>
        <LinkButton label="Resume" href={profile.resumeUrl} />
      </div>
    </div>
  )
}
