'use client'

import { useEffect, useState } from 'react'

export function EditableHeroCollage({ images }: { images: string[] }) {
  const pool = images.length ? images : ['/placeholder.svg?height=900&width=1400']
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (pool.length <= 1) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setCurrent((v) => (v + 1) % pool.length), 5000)
    return () => clearInterval(id)
  }, [pool.length])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {pool.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
        />
      ))}
    </div>
  )
}
