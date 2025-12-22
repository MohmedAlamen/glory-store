"use client"

import React from 'react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  onRatingChange?: (rating: number) => void
  size?: number
}

export default function StarRating({
  rating,
  maxRating = 5,
  onRatingChange,
  size = 24,
}: StarRatingProps) {
  const isInteractive = !!onRatingChange

  const handleClick = (newRating: number) => {
    if (isInteractive) {
      onRatingChange(newRating)
    }
  }

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= rating
    const starColor = isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
    const cursorStyle = isInteractive ? 'cursor-pointer' : 'cursor-default'

    return (
      <span
        key={index}
        className={`${starColor} ${cursorStyle} transition-colors`}
        style={{ fontSize: size }}
        onClick={() => handleClick(starValue)}
      >
        ★
      </span>
    )
  })

  return <div className="flex items-center">{stars}</div>
}
