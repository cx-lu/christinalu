from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import NoteSerializer, FileSerializer
from .models import Note, File

class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-date')
    serializer_class = NoteSerializer

class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

# Get a file by its ID

class FilesByParentViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        p = request.parent
        queryset = File.objects.filter(parent__id__contains=p)
        if not queryset:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = FileSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)

#Get list of directories by parent

