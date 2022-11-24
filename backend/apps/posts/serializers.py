from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)

    class Meta:
        model = Post
        fields = '__all__'
        depth=1



class PostAdd(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)
    class Meta:
        model= Post
        fields= '__all__'
