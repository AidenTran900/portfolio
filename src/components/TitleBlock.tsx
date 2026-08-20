import './TitleBlock.css'

export function TitleBlock({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="title-block">
      <h1 className="title-block__title">{title}</h1>
      <p className="title-block__subtitle">{subtitle}</p>
    </div>
  )
}
