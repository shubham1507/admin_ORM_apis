
#./todo/views.py

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListAssociateAPI.as_view(),name='list'),
    path('detail/<str:pk>/',AssociateDetailAPI.as_view(),name='detail'),
    path('create',CreateAssociateAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateAssociateAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteAssociateAPIView.as_view(),name='delete'),
]