"use client"

import { useTranslations } from '../lib/i18n'

export default function Footer() {
  const { t } = useTranslations()
  
  return (
    <footer className="border-t mt-8">
      <div className="container py-6 text-sm text-gray-600 dark:text-gray-300">
        <div>© {new Date().getFullYear()} {t('siteTitle')} — {t('allRightsReserved')}</div>
      </div>
    </footer>
  )
}
