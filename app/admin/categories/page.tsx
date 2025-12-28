"use client"

import React, { useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'

interface Category {
  _id: string
  name: string
  description?: string
  image?: string
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { _id: '1', name: 'Watches', description: 'Premium watches collection' },
    { _id: '2', name: 'Accessories', description: 'Watch accessories and straps' },
    { _id: '3', name: 'Straps', description: 'Replacement watch straps' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', image: '' })

  const handleAddCategory = () => {
    if (formData.name.trim()) {
      if (editingId) {
        setCategories(
          categories.map((cat) =>
            cat._id === editingId ? { ...cat, ...formData } : cat
          )
        )
        setEditingId(null)
      } else {
        setCategories([
          ...categories,
          { _id: Date.now().toString(), ...formData },
        ])
      }
      setFormData({ name: '', description: '', image: '' })
      setShowForm(false)
    }
  }

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    })
    setEditingId(category._id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat._id !== id))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({ name: '', description: '', image: '' })
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Category'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter category description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: '', description: '', image: '' })
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingId ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4"
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
