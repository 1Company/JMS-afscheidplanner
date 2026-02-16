'use client'

import { useState, useEffect } from 'react'

// Respectvolle, warme achtergrondafbeeldingen van Unsplash
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80&auto=format&fit=crop',
    alt: 'Zonlicht door bomen in een bos'
  },
  {
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=80&auto=format&fit=crop',
    alt: 'Ochtendlicht door bladeren'
  },
  {
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80&auto=format&fit=crop',
    alt: 'Witte bloemen in zachte focus'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
    alt: 'Rustige bergen bij zonsopgang'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80&auto=format&fit=crop',
    alt: 'Mistig landschap bij dageraad'
  }
]

export function HeroSlider({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Wissel elke 6 seconden

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.url})` }}
          />
          {/* Overlay voor leesbaarheid */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {children}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-slate-700 w-6' 
                : 'bg-slate-400 hover:bg-slate-500'
            }`}
            aria-label={`Ga naar slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
