from rest_framework import viewsets
from .serializers import NoteSerializer, FileSerializer
from .models import Note, File

class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-date')
    serializer_class = NoteSerializer

class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

# Get a file by its ID

# Get a directory by its ID with list of files and subdirectories

