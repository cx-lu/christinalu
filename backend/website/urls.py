from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'notes', views.NotesViewSet)
router.register(r'files', views.FilesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]