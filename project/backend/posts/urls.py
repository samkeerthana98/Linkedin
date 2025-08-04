from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListView.as_view(), name='post_list'),
    path('posts/create/', views.PostCreateView.as_view(), name='post_create'),
    path('users/<int:user_id>/posts/', views.UserPostsView.as_view(), name='user_posts'),
]