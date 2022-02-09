from rest_framework import serializers
from .models import Note, File

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields= ('title', 'date', 'content')

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields= ('id', 'name', 'type', 'content')