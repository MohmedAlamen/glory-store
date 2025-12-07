"use client"

import { useEffect, useMemo, useState } from 'react'

type Translations = Record<string, string>

function loadLocale(locale: string): Promise<Translations> {
  if (locale === 'ar') return import('../locales/ar.json').then((m) => m.default)
  return import('../locales/en.json').then((m) => m.default)
}

export function useLocale() {
  const [locale, setLocale] = useState<'en'|'ar'>(() => {
    if (typeof window === 'undefined') return 'en'
    return (localStorage.getItem('glory:lang') as 'en'|'ar') || (document.documentElement.lang as 'en'|'ar') || 'en'
  })

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('glory:lang', locale)
  }, [locale])

  return { locale, setLocale }
}

export function useTranslations() {
  const { locale } = useLocale()
  const [dict, setDict] = useState<Translations>({})

  useEffect(() => {
    let mounted = true
    loadLocale(locale).then((t) => { if (mounted) setDict(t) })
    return () => { mounted = false }
  }, [locale])

  const t = useMemo(() => (key: string) => dict[key] || key, [dict])
  return { t }
}
