

from django.urls import path
from . views import *

urlpatterns = [
    path('',ListRoleAPI.as_view(),name='list'),
    path('detail/<str:pk>/',RoleDetailAPI.as_view(),name='detail'),
    path('create',CreateRoleAPI.as_view(),name='create'),
    path('update/<str:pk>/',UpdateRoleAPIView.as_view(),name='update'),
    path('delete/<str:pk>/',DeleteRoleAPIView.as_view(),name='delete'),
]