"use client"

import { useEffect, useState, useRef } from 'react'
import debounce from 'lodash.debounce'

type Suggestion = {
  title: string
  slug: string
}

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const mounted = useRef(true)

  useEffect(() => {
    return () => { mounted.current = false }
  }, [])

  // debounce requests
  const fetchSuggestions = debounce(async (term: string) => {
    if (!term) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&limit=6`)
      const data = await res.json()
      if (!mounted.current) return
      setSuggestions((data.products || []).map((p: any) => ({ title: p.title, slug: p.slug })))
      setOpen(true)
    } catch (err) {
      console.error(err)
    }
  }, 180)

  useEffect(() => {
    fetchSuggestions(q)
  }, [q])

  return (
    <div className="relative w-full max-w-lg">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Search watches, e.g. 'rose'"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => q && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />

      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded shadow z-50">
          {suggestions.map((s) => (
            <li key={s.slug} className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              <a href={`/products/${s.slug}`}>{s.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
