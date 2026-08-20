// import { PageBackground } from '../components/PageBackground'
import { BioBlock } from '../components/BioBlock'
import { ContactRow } from '../components/ContactRow'
import { TechPanel } from '../components/TechPanel'
import { Hero } from '../sections/Hero'
import { WorkEducation } from '../sections/WorkEducation'
import { RecentPosts } from '../sections/RecentPosts'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { languages, technologies } from '../data/profile'
import './Home.css'

export default function Home() {
  return (
    <div className="container home">
      {/* <PageBackground /> */}
      <div className="home-grid">
        <Hero />
        <BioBlock />
        <ContactRow />
        <WorkEducation />
        <TechPanel languages={languages} technologies={technologies} />
        <RecentPosts />
        <FeaturedProjects />
      </div>
    </div>
  )
}
