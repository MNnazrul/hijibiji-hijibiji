from django.urls import path
from . import views

urlpatterns = [
    # path('api/', include('sauth.urls'))
    path('', views.index, name="index"),
    path('files/', views.get_file),
    path('delete-file/', views.delete_file)
]
