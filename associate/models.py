from django.db import models

# Create your models here.

class Org_associate(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    country = models.IntegerField(default=1)
    county  = models.CharField(max_length=255)
    postcode = models.CharField(max_length=255)
    address1 = models.CharField(max_length=255)
    address2 =models.CharField(max_length=255)
    address3 =models.CharField(max_length=255)
    contact_number =models.CharField(max_length=255)
    secondry_contact =models.CharField(max_length=255)
    email =models.CharField(max_length=255)
    personal_email =models.CharField(max_length=255)
    # NDA_doc =
    login_id =models.CharField(max_length=255)
    password =models.CharField(max_length=255)
    # created_on =
    # created_by =
    is_deleted = models.BooleanField(default=True)
    status = models.BooleanField(default=True)

    def __str__(self):

        return '{}'.format(self.first_name)
