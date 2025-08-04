import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User } from '../lib/api'
import { X, Loader2 } from 'lucide-react'

interface EditProfileModalProps {
  profile: User | null
  onClose: () => void
  onSuccess: () => void
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  onSuccess,
}) => {
  const { updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await updateProfile({
        name: formData.name.trim(),
        bio: formData.bio.trim() || null,
        updated_at: new Date().toISOString(),
      })
      onSuccess()
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              maxLength={500}
            />
            <div className="mt-1 text-right text-sm text-gray-500">
              {formData.bio.length}/500 characters
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : null}
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}