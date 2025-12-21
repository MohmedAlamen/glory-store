"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { useTranslations } from '../lib/i18n'
import StarRating from './StarRating'

type Review = {
  _id: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth()
  const { t } = useTranslations()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reviews?productId=${productId}`)
      const data = await response.json()
      setReviews(data.reviews || [])
    } catch (err) {
      console.error('Failed to fetch reviews', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!isAuthenticated || !user) {
      setSubmitError(t('login_to_submit_review'))
      return
    }

    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      setSubmitError(t('rating_and_comment_required'))
      return
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          userId: user.id,
          userName: user.name,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('failed_to_submit_review'))
      }

      setSubmitSuccess(t('review_submitted_successfully'))
      setNewReview({ rating: 0, comment: '' })
      fetchReviews() // Refresh reviews list
    } catch (err: any) {
      setSubmitError(err.message)
    }
  }

  const hasUserReviewed = reviews.some(review => review.userName === user?.name)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">{t('customerReviews')} ({reviews.length})</h2>

      {/* Review Submission Form */}
      <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{t('writeReview')}</h3>
        {isAuthenticated ? (
          hasUserReviewed ? (
            <p className="text-yellow-600 dark:text-yellow-400">{t('already_reviewed')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('your_rating')}</label>
                <StarRating
                  rating={newReview.rating}
                  onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
                  size={30}
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">
                  {t('your_comment')}
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('share_your_experience')}
                ></textarea>
              </div>
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
              {submitSuccess && <p className="text-green-500 text-sm">{submitSuccess}</p>}
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
              >
                {t('submit_review')}
              </button>
            </form>
          )
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {t('login_to_submit_review_prompt')}{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              {t('login')}
            </a>
          </p>
        )}
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <p>{t('loading_reviews')}...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t('noReviews')}</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800/50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{review.userName}</p>
                  <StarRating rating={review.rating} size={18} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
