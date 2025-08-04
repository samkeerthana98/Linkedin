from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_preview', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__name', 'user__email', 'content')
    readonly_fields = ('created_at', 'updated_at')

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'