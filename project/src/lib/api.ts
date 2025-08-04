const API_BASE_URL = 'http://localhost:8000/api';

interface User {
  id: number;
  email: string;
  name: string;
  bio: string | null;
  created_at: string;
  updated_at?: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || error.message || 'An error occurred');
    }
    return response.json();
  }

  // Authentication
  async register(email: string, password: string, name: string, bio?: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        password_confirm: password,
        name,
        bio: bio || '',
      }),
    });
    
    const data = await this.handleResponse(response);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await this.handleResponse(response);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // User Profile
  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile/update/`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return this.handleResponse(response);
  }

  async getUserById(userId: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Posts
  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createPost(content: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/create/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ content }),
    });
    return this.handleResponse(response);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const apiClient = new ApiClient();
export type { User, Post, AuthResponse };