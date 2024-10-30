from django.db import models

# Create your models here.

class Services(models.Model):
    service_name = models.CharField(max_length=255)
    service_desc = models.TextField()
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True) 
    last_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.service_name)
