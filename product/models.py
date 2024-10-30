from django.db import models
from product_category.models import Product_category

# Create your models here.



class Product(models.Model):
    product = models.CharField(max_length=255)
    prod_cat_id = models.ForeignKey(Product_category, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    updated_by =  models.IntegerField(default=1)
    def __str__(self):

        return '{}'.format(self.product)
