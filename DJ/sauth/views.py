import os
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.conf import settings

# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({
        "message": "wellcome"
    })


@api_view(['POST'])
def get_file(request):
    uploaded_files = request.FILES.getlist('files')
    
    if not uploaded_files:
        return Response({
            'Errors ': 'No file uploaded'
        }, status=400)
    
    save_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
    os.makedirs(save_dir, exist_ok=True) #Ensure the directory exists.
    
    saved_files_info = []

    for uploaded_file in uploaded_files:

        file_path = os.path.join(save_dir, uploaded_file.name)

        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        saved_files_info.append({
            'message': 'file uploaded successfully',
            'name': uploaded_file.name,
            'file-format': uploaded_file.content_type,
            'file-size': uploaded_file.size,
        })
    
    return Response({
        "uploaded_files" : saved_files_info
    }, status=201)