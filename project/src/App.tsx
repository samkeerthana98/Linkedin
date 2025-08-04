import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { AuthForm } from './components/AuthForm'
import { Feed } from './pages/Feed'
import { CreatePost } from './pages/CreatePost'
import { Profile } from './pages/Profile'
import { Loader2 } from 'lucide-react'

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return <Layout>{children}</Layout>
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <AuthForm 
      isLogin={isLogin} 
      onToggleMode={() => setIsLogin(!isLogin)} 
    />
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <Feed />
                </AuthWrapper>
              }
            />
            <Route
              path="/create-post"
              element={
                <AuthWrapper>
                  <CreatePost />
                </AuthWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthWrapper>
                  <Profile />
                </AuthWrapper>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <AuthWrapper>
                  <Profile />
                </AuthWrapper>
              }
            />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App