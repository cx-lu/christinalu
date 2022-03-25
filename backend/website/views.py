from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import NoteSerializer, DirectorySerializer, FileSerializer
from .models import Note, Directory, File

class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-date')
    serializer_class = NoteSerializer

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer