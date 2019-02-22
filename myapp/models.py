from django.db import models


# Create your models here.
class Image(models.Model):
    name = models.TextField(max_length=1000, null=True, blank=True)
    image = models.ImageField(upload_to='')


class Task(models.Model):
    image_detail = models.ForeignKey(Image)
    name = models.TextField(max_length=1000, null=True, blank=True)
    boxes = models.TextField(max_length=1000000, null=True, blank=True)

    def __unicode__(self):
        return self.name
        