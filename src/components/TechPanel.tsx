import type { TechItem } from '../data/profile'
import './TechPanel.css'

function TechRow({ items }: { items: TechItem[] }) {
  return (
    <div className="tech-panel__row">
      {items.map((item) => (
        <div className="tech-panel__icon" key={item.name} tabIndex={0}>
          <img src={item.icon} alt={item.name} />
          <span className="tech-panel__tooltip" role="tooltip">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TechPanel({ languages, technologies }: { languages: TechItem[]; technologies: TechItem[] }) {
  return (
    <div className="tech-panel">
      <p className="tech-panel__label">Languages</p>
      <TechRow items={languages} />
      <p className="tech-panel__label">Technologies</p>
      <TechRow items={technologies} />
    </div>
  )
}
