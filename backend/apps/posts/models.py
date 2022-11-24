from django.db import models
from apps.users.models import User
from cloudinary.models import CloudinaryField


# Create your models here.



class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, db_index=True
    )
    name = models.CharField(
        'Name', blank=False, null=False, max_length=50, db_index=True, default='Anonymous'
    )
    body = models.TextField(
        'Body', blank=False, null=False, db_index=True
    )
    image = CloudinaryField(
        'image', blank=True, null=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )

    def __str__(self):
        return self.name