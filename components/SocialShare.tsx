"use client"

import React from 'react'
import { useTranslations } from '../lib/i18n'

interface SocialShareProps {
  title: string
  url: string
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const { t } = useTranslations()

  const shareOptions = [
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: '🟢',
      color: 'bg-green-500 hover:bg-green-600',
      link: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    },
    {
      name: 'LinkedIn',
      icon: '👔',
      color: 'bg-blue-800 hover:bg-blue-900',
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ]

  return (
    <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-3">{t('share_this_product')}:</h3>
      <div className="flex flex-wrap gap-3">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm ${option.color}`}
          >
            <span className="text-lg">{option.icon}</span>
            {option.name}
          </a>
        ))}
      </div>
    </div>
  )
}
