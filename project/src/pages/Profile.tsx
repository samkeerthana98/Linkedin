import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiClient, User, Post } from '../lib/api'
import { PostCard } from '../components/PostCard'
import { EditProfileModal } from '../components/EditProfileModal'
import { User, Mail, Edit, Calendar, Loader2 } from 'lucide-react'

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)

  const isOwnProfile = !userId || parseInt(userId) === user?.id

  useEffect(() => {
    loadProfile()
    loadUserPosts()
  }, [userId, user])

  const loadProfile = async () => {
    try {
      const targetUserId = userId ? parseInt(userId) : user?.id
      if (!targetUserId) return

      if (isOwnProfile && user) {
        setProfile(user)
      } else {
        const data = await apiClient.getUserById(targetUserId)
        setProfile(data)
      }
    } catch (error) {
      setError('Failed to load profile')
      console.error('Error loading profile:', error)
    }
  }

  const loadUserPosts = async () => {
    try {
      const targetUserId = userId ? parseInt(userId) : user?.id
      if (!targetUserId) return

      const data = await apiClient.getUserPosts(targetUserId)
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Profile not found'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <div className="flex items-center text-gray-600 mt-2">
                <Mail className="w-4 h-4 mr-2" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {formatJoinDate(profile.created_at)}</span>
              </div>
              {profile.bio && (
                <p className="text-gray-700 mt-4 max-w-2xl leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
          {isOwnProfile && (
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isOwnProfile ? 'Your Posts' : `${profile.name}'s Posts`} ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-lg">
              {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={user}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false)
            loadProfile()
          }}
        />
      )}
    </div>
  )
}