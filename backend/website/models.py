from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    content = models.TextField()

    def __str__(self):
        return self.title

class Directory (models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='subdirectories', on_delete=models.CASCADE)

    def __str__(self):
        return self.id

class File(models.Model):

    TEXTFILE = 'TXT'
    IMAGEFILE = 'IMG'

    TYPE_CHOICES = [
        (TEXTFILE, 'Textfile'),
        (IMAGEFILE, 'Imagefile')
    ]

    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TYPE_CHOICES, default=TEXTFILE)
    content = models.TextField()
    parent = models.ForeignKey(Directory, null=True, blank=True, related_name='files', on_delete=models.CASCADE)

    def __str__(self):
        return self.id