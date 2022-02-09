from django.contrib import admin
from .models import Note, File, Directory

admin.site.register(Note)
admin.site.register(File)
admin.site.register(Directory)
