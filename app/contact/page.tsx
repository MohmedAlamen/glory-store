"use client"

import { useState } from 'react'
import { useTranslations } from '../../lib/i18n'

export default function ContactPage() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: t('email'),
      value: 'support@glorystore.com',
      href: 'mailto:support@glorystore.com',
    },
    {
      icon: '📱',
      label: t('phone'),
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: '📍',
      label: 'Address',
      value: '123 Main St, New York, NY 10001',
      href: '#',
    },
    {
      icon: '⏰',
      label: 'Hours',
      value: 'Mon - Fri: 9AM - 6PM EST',
      href: '#',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('contactUs')}</h1>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          {t('contactUsDescription')}
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => (
          <a
            key={index}
            href={info.href}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-3">{info.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.label}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
          </a>
        ))}
      </section>

      {/* Contact Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitted && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-200">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? 'Sending...' : t('send')}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">{t('faq')}</h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">What is your return policy?</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                We offer a 30-day return policy on all products. Items must be in original condition with all packaging.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">How long does shipping take?</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">Do you offer international shipping?</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">Are your products authentic?</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                All our products are 100% authentic and sourced directly from authorized manufacturers.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">What payment methods do you accept?</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                We accept credit cards, debit cards, PayPal, and other major payment methods.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}
