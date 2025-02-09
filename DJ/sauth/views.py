import os
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
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


@api_view(['DELETE'])
def delete_file(request):
    file_name = request.data.get('file_name')
    
    if not file_name:
        return Response({
            'error': 'file_name requred'
        }, status=400)
    
    file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', file_name)

    if os.path.exists(file_path):
        os.remove(file_path)
        return Response({
            'message': f"File {file_name} deleted successfully"
        }, status=201)
    else:
        return Response({
            'error': 'file not found' 
        }, status=400)