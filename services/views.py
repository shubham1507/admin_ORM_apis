from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from services.models import Services
from services.serializers import ServiceListSerializer,ServiceSerializer

class ListServiceAPI(APIView):
    def get(self,request):
        service_list = Services.objects.all()
        serializer = ServiceListSerializer(service_list, many = True)
        return Response(serializer.data)

class ServiceDetailAPI(APIView):
    def get(self,request,pk):
        service_detail = Services.objects.get(id=pk)
        serializer = ServiceSerializer(service_detail, many= False)
        return Response(serializer.data)
       

class CreateServiceAPI(APIView):
    def post(self,request):
        serializer = ServiceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateServiceAPIView(APIView):
    def post(self,request,pk):
        todo = Services.objects.get(id=pk)
        serializer = ServiceSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteServiceAPIView(APIView):
    def get(self,request,pk):
        todo = Services.objects.get(id=pk)
        todo_instance = Services.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')