from django.urls import path
from . views import *

urlpatterns = [
    path('',ListProduct_cat_MapAPI.as_view(),name='list'),
    path('detail/<str:pk>/',Product_cat_MapDetailAPI.as_view(),name='detail'),
    path('create',CreateProduct_cat_MapAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateProduct_cat_MapAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteProduct_cat_MapAPIView.as_view(),name='delete'),
]