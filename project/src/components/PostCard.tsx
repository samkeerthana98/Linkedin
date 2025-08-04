import React from 'react'
import { Link } from 'react-router-dom'
import { User, Clock } from 'lucide-react'
import { Post } from '../lib/api'

interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to={`/profile/${post.user?.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {post.user?.name || 'Unknown User'}
              </Link>
              <p className="text-sm text-gray-500">{post.user?.email}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {formatDate(post.created_at)}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}