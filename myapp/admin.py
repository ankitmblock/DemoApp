from django.contrib import admin
from myapp.models import Image, Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('image_detail', 'boxes')

#admin.site.register(Image)
admin.site.register(Task, TaskAdmin)
