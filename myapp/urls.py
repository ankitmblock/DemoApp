from django.conf.urls import url
from django.conf.urls.static import static 
from django.conf import settings 
from myapp import views


urlpatterns = [
    url(r'^$', views.HomePageView.as_view()),
    url(r'^setImageDimension$', views.setImageDimension),
]

if settings.DEBUG: 
        urlpatterns += static(settings.MEDIA_URL, 
                              document_root=settings.MEDIA_ROOT) 
