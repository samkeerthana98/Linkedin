# Mini LinkedIn-like Community Platform

A modern, responsive community platform built with React, TypeScript frontend and Django REST API backend. This application provides core social networking features including user authentication, profiles, and a public post feed.

##  Live Demo



##  Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT tokens with djangorestframework-simplejwt
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **API**: RESTful API with Django REST Framework

##  Features

###  User Authentication
- Email and password registration
- Secure login system
- Token-based authentication
- Profile creation during signup

###  User Profiles
- Complete user profiles with name, email, and bio
- Profile editing capabilities
- Individual user profile pages
- Join date display

###  Post System
- Create text-only posts (up to 1000 characters)
- Public feed with all community posts
- Timestamps with relative time display
- Author information display

###  Modern UI/UX
- Clean, LinkedIn-inspired design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and hover effects
- Professional blue color scheme
- Accessible design patterns

##  Project Structure

```
backend/                 # Django backend
├── accounts/           # User authentication app
│   ├── models.py      # Custom User model
│   ├── serializers.py # API serializers
│   ├── views.py       # Authentication views
│   └── urls.py        # Auth URL patterns
├── posts/             # Posts management app
│   ├── models.py      # Post model
│   ├── serializers.py # Post serializers
│   ├── views.py       # Post CRUD views
│   └── urls.py        # Post URL patterns
├── settings.py        # Django settings
└── urls.py            # Main URL configuration

src/
├── components/          # Reusable UI components
│   ├── AuthForm.tsx    # Login/Register form
│   ├── EditProfileModal.tsx
│   ├── Layout.tsx      # Main app layout with navigation
│   └── PostCard.tsx    # Individual post display
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/               # API client and utilities
│   └── api.ts         # Django API client
├── pages/             # Main application pages
│   ├── CreatePost.tsx # Post creation page
│   ├── Feed.tsx       # Home feed page
│   └── Profile.tsx    # User profile page
└── App.tsx            # Main application component
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd linkedin-community-platform
   ```

2. **Install dependencies**
   
   Frontend:
   ```bash
   npm install
   ```
   
   Backend:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up the database**
   ```bash
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

5. **Start the development servers**
   
   Backend (Django):
   ```bash
   cd backend
   python manage.py runserver
   ```
   
   Frontend (React):
   ```bash
   npm run dev
   ```

##  Database Schema

### User Model (Custom Django User)
- `id` (int): Primary key
- `email` (text): User email address
- `username` (text): Generated from email
- `name` (text): Full name
- `bio` (text, optional): User biography
- `created_at`, `updated_at`: Timestamps

### Post Model
- `id` (int): Primary key
- `user` (ForeignKey): Reference to User model
- `content` (text): Post content (max 1000 chars)
- `created_at`, `updated_at`: Timestamps

##  Security Features

- JWT token-based authentication
- Django's built-in security features
- CORS configuration for frontend-backend communication
- User-specific permissions for posts
- Protected API endpoints

##  API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - Get current user profile
- `PUT /api/auth/profile/update/` - Update user profile
- `GET /api/auth/users/{id}/` - Get user by ID

### Posts
- `GET /api/posts/` - Get all posts
- `POST /api/posts/create/` - Create new post
- `GET /api/users/{id}/posts/` - Get posts by user
##  Demo Users

After setting up the application, you can create test accounts using the registration form. For demonstration purposes, create a few users to showcase the community aspect.

**Test Account Example:**
- Email: demo@example.com
- Password: demo123456
- Name: Demo User
- Bio: This is a demo account for testing the platform

##  Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy `dist` folder to your hosting service
3. Update API base URL for production

### Backend (Railway/Heroku/DigitalOcean)
1. Set up PostgreSQL database
2. Update Django settings for production
3. Configure environment variables
4. Deploy Django application
5. Run migrations: `python manage.py migrate`

##  Design Features

- **Responsive Design**: Works perfectly on all device sizes
- **Modern UI**: Clean, professional interface inspired by LinkedIn
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Loading States**: Elegant loading indicators for better UX

##  Key Implementation Details

- **Authentication Flow**: JWT-based authentication with Django
- **API Design**: RESTful API with proper HTTP methods
- **Database Relations**: Foreign key relationships between users and posts
- **Error Handling**: Comprehensive error states and user feedback
- **Serialization**: Django REST Framework serializers for data validation
- **Type Safety**: Full TypeScript implementation for reliability

## 🔧 Development Features

- **Django Admin**: Full admin interface for managing users and posts
- **API Documentation**: Clear API endpoint structure
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Token Management**: Automatic token handling in frontend
- **Error Boundaries**: Comprehensive error handling

##  Potential Enhancements

- Post editing and deletion
- User following system
- Post reactions/likes
- Comments on posts
- Image uploads
- Search functionality
- Notification system
- Real-time updates with WebSockets

##  Contributing

This project demonstrates full-stack development skills using modern web technologies including React, TypeScript, Django, and REST APIs.

## 📄 License

This project is created for internship assessment purposes and showcases full-stack development capabilities.
