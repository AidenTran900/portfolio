import './EntryCard.css'

export function EntryCard({
  title,
  meta,
  dateRange,
  description,
}: {
  title: string
  meta: string
  dateRange: string
  description: string
}) {
  return (
    <div className="entry-card">
      <div className="entry-card__row">
        <p className="entry-card__title">{title}</p>
        <div className="entry-card__meta">
          <p>{dateRange}</p>
          <p>{meta}</p>
        </div>
      </div>
      <p className="entry-card__description">{description}</p>
    </div>
  )
}
