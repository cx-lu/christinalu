from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import NoteSerializer, DirectorySerializer, FileSerializer
from .models import Note, Directory, File

class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-date')
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend]

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'parent': ['exact', 'isnull']}

class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'parent': ['exact', 'isnull']}