from django.db import models
from django.utils.translation import ugettext as _


# Create your models here.


class Client(models.Model):
    client_name = models.CharField(max_length=255)
    registration_id = models.IntegerField(default=1)
    registered_in_country = models.IntegerField(default=1)
    vat_number=models.CharField(max_length=255)
    address_line_1= models.CharField(max_length=255)
    address_line_2= models.CharField(max_length=255)
    address_line_3= models.CharField(max_length=255)
    post_code = models.CharField(_("zip code"), max_length=5, default="43701")
    county = models.CharField(max_length=255)
    country= models.CharField(max_length=255)
    default_currency_used = models.CharField(max_length=255)
    vat_used = models.FloatField(null=True, blank=True, default=None)

    contract_signed_by=models.IntegerField(default=1)
    client_comms_email = models.CharField(max_length=255)
    client_comms_contact_number = models.CharField(max_length=255)
    client_techsupp_contact_number = models.CharField(max_length=255)
    client_techsupp_email= models.CharField(max_length=255)
    client_techsupp_name=models.CharField(max_length=255)
    client_finance_contact_name = models.CharField(max_length=255)
    client_finance_contact_number=models.CharField(max_length=255)
    client_finance_email = models.CharField(max_length=255)
    client_website = models.CharField(max_length=255)
    is_active =  models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    # created_by
    # updated_by
    contract_temp_id = models.IntegerField(default=1)
    note_id= models.IntegerField(default=1)
    client_status_id = models.IntegerField(default=1)


    def __str__(self):

        return '{}'.format(self.client_name)

     
    
class Client_user_roles(models.Model):
    role = models.CharField(max_length=255)
    status =   models.IntegerField(default=1)


class Client_user(models.Model):

    client_id = models.ForeignKey(Client_user_roles, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address_line_1= models.CharField(max_length=255)
    address_line_2= models.CharField(max_length=255)
    address_line_3= models.CharField(max_length=255)
    post_code = models.CharField(_("zip code"), max_length=5, default="43701")
    county = models.CharField(max_length=255)
    country= models.CharField(max_length=255)
    contact_number = models.CharField(max_length=255)
    secondary_number = models.CharField(max_length=255)
    personal_email = models.CharField(max_length=255)
    is_active =  models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    status =   models.IntegerField(default=1)

         