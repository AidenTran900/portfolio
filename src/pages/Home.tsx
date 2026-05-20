import { Hero } from '@/sections/Hero'
import { FeaturedWork } from '@/sections/FeaturedWork'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      {/* <Contact /> */}
    </>
  )
}
