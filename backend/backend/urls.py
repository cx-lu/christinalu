from django.contrib import admin
from django.urls import path, re_path, include
from django.shortcuts import render
from api import views
from django.conf import settings
from django.conf.urls.static import static

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
