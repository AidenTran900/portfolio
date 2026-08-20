import { useState } from 'react'
import { work } from '../data/work'
import { education } from '../data/education'
import { EntryCard } from '../components/EntryCard'
import './WorkEducation.css'

type Tab = 'work' | 'education'

export function WorkEducation() {
  const [tab, setTab] = useState<Tab>('work')
  const entries = tab === 'work' ? work : education

  return (
    <section className="work-education">
      <div className="work-education__tabs">
        <button
          type="button"
          className={`work-education__tab ${tab === 'work' ? 'work-education__tab--active' : ''}`}
          onClick={() => setTab('work')}
        >
          Work
        </button>
        <button
          type="button"
          className={`work-education__tab ${tab === 'education' ? 'work-education__tab--active' : ''}`}
          onClick={() => setTab('education')}
        >
          Education
        </button>
      </div>
      <div className="work-education__panel" key={tab}>
        {entries.map((entry) => (
          <EntryCard key={entry.title} {...entry} />
        ))}
      </div>
    </section>
  )
}
