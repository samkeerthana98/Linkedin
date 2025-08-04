import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../lib/api'
import { Loader2, Send } from 'lucide-react'

export const CreatePost: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    setLoading(true)
    setError('')

    try {
      await apiClient.createPost(content.trim())
      navigate('/')
    } catch (error) {
      setError('Failed to create post')
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create a Post</h1>
        <p className="text-gray-600 mt-2">Share your thoughts with the community</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ideas, or updates..."
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={6}
              maxLength={1000}
              required
            />
            <div className="mt-2 text-right text-sm text-gray-500">
              {content.length}/1000 characters
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{loading ? 'Posting...' : 'Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}