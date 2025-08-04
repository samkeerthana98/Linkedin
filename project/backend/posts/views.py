from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save(user=request.user)
        
        # Return the full post data with user info
        response_serializer = PostSerializer(post)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(user_id=user_id)