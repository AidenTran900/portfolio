import { profile } from '../data/profile'
import './BioBlock.css'

export function BioBlock() {
  return (
    <div className="bio-block">
      <p className="bio-block__line1">{profile.bioLine1}</p>
      <p className="bio-block__line2">{profile.bioLine2}</p>
    </div>
  )
}
