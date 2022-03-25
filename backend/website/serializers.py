from rest_framework import serializers
from .models import Note, Directory, File

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields= ['title', 'date', 'content']

class DirectorySerializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())
    subdirectories = serializers.PrimaryKeyRelatedField(many=True, queryset=Directory.objects.all())

    class Meta:
        model = Directory
        fields = ['id', 'name', 'parent', 'files', 'subdirectories']

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields= ['id', 'name', 'type', 'content', 'parent']