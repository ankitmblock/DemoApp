import json
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from myapp.models import Image,Task


# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        imgs =  Image.objects.all()
        return render(request, 'index.html', { 'picture': imgs })


def setImageDimension(request):
    image = Image.objects.all().last()

    if image:
        task = Task.objects.create(
            image_detail = image
        )
        task.boxes = request.GET['datas']
        task.save()
        data ={'status':200,'message':'success'}
        return HttpResponse(json.dumps(data), content_type="application/json")
    data ={'status':404,'message':'not found'}
    return HttpResponse(json.dumps(data), content_type="application/json")
    