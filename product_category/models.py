from django.db import models

# Create your models here.
class Product_category(models.Model):
    prod_category = models.CharField(max_length=255)
    is_active =  models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    updated_by =  models.IntegerField(default=1)
    created_by =  models.IntegerField(default=1)
    def __str__(self):

        return '{}'.format(self.prod_category)
