import { profile } from '../data/profile'
import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export function Hero() {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const [backgroundPosition, setBackgroundPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setBackgroundPosition(scrollY * 0.2 + 200)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero">
      <h1 className="hero__name">{profile.name}</h1>
      <p className="hero__role">{profile.role}</p>

      <div 
        ref={heroImageRef}
        className="hero__image" 
        style={{ 
          backgroundImage: `url(${profile.heroImage})`,
          backgroundPosition: `center ${-backgroundPosition}px`
        }}
      >
        <img className="image" src={profile.heroImage} alt="" />
        <img className="hero__avatar" src="/images/avatar-frame.svg" alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
