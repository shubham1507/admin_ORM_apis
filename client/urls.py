
#./todo/views.py

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListClientAPI.as_view(),name='list'),
    path('detail/<str:pk>/',ClientDetailAPI.as_view(),name='detail'),
    path('create',CreateClientAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateClientAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteClientAPIView.as_view(),name='delete'),
]