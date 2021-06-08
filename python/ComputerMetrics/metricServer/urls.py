from django.urls import path
from psutil import cpu_freq

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('/health', views.health, name='health'),
    path('/cpu', views.cpu, name="cpu"),
    path('/ram', views.ram, name="ram")
]