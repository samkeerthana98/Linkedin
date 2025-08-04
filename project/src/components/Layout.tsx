import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User, Home, Edit3 } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                LinkedCommunity
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Home size={20} />
                  <span>Feed</span>
                </Link>
                <Link
                  to="/create-post"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Edit3 size={20} />
                  <span>Create Post</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <User size={20} />
                <span>{profile?.name || 'Profile'}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}