

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListProduct_categoryAPI.as_view(),name='list'),
    path('detail/<str:pk>/',Product_categoryDetailAPI.as_view(),name='detail'),
    path('create',CreateProduct_categoryAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateProduct_categoryAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteProduct_categoryAPIView.as_view(),name='delete'),
]