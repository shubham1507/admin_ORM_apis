

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListServiceAPI.as_view(),name='list'),
    path('detail/<str:pk>/',ServiceDetailAPI.as_view(),name='detail'),
    path('create',CreateServiceAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateServiceAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteServiceAPIView.as_view(),name='delete'),
]