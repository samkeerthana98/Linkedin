import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, bio?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await apiClient.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, bio?: string) => {
    const data = await apiClient.register(email, password, name, bio);
    setUser(data.user);
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const data = await apiClient.login(email, password);
    setUser(data.user);
    return data;
  };

  const signOut = async () => {
    apiClient.logout();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    const updatedUser = await apiClient.updateProfile(updates);
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};