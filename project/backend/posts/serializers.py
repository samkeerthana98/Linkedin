from rest_framework import serializers
from .models import Post
from accounts.serializers import UserProfileSerializer

class PostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'user', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('content',)

    def validate_content(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Content cannot be empty")
        return value