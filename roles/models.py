from django.db import models

# Create your models here.
class Role(models.Model):
    role = models.CharField(max_length=255)
    status = models.BooleanField(default=True)
    description = models.TextField()
    is_deleted = models.BooleanField(default=True)

    def __str__(self):
        return '{}'.format(self.role)
