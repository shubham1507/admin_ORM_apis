from django.db import models
from product.models import Product
from product_category.models import Product_category
# Create your models here.
class Product_cat_Map(models.Model):
    product_id =models.ForeignKey(Product,on_delete=models.CASCADE)
    prod_cat_id =models.ForeignKey(Product_category,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.IntegerField(default=1)
    last_updated =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.product_id)