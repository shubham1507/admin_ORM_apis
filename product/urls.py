
#./todo/views.py

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListProductAPI.as_view(),name='list'),
    path('detail/<str:pk>/',ProductDetailAPI.as_view(),name='detail'),
    path('create',CreateProductAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateProductAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteProductAPIView.as_view(),name='delete'),
]