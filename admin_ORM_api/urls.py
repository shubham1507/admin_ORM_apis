
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/client/', include('client.urls')),
    path('api/associate/', include('associate.urls')),
    path('api/roles/', include('roles.urls')),
    path('api/product/', include('product.urls')),
    path('api/product_category/', include('product_category.urls')),
    path('api/services/', include('services.urls')),
]
