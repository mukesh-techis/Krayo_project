from django.shortcuts import render
from apps.users.mixins import CustomLoginRequiredMixin
# Create your views here.
from rest_framework import generics
from .serializers import PostSerializer, PostAdd
from .models import Post

class PostList(CustomLoginRequiredMixin,generics.ListAPIView):
    queryset = Post.objects.order_by('-created_at').all()
    serializer_class = PostSerializer
    def get(self, request, *args, **kwargs):
        self.queryset = Post.objects.order_by('-created_at').filter(user=request.login_user)
        return self.list(request, *args, **kwargs)

class PostAdd(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostAdd


class PostDetail(CustomLoginRequiredMixin,generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
