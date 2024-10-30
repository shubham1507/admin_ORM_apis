from django.shortcuts import render
from rest_framework.response import Response
from client.models import Client
from rest_framework.views import APIView
from client.serializers import ClientSerializer,ClientListSerializer


class ListClientAPI(APIView):
    def get(self,request):
        client_list = Client.objects.all()
        serializer = ClientListSerializer(client_list, many = True)
        return Response(serializer.data)

class ClientDetailAPI(APIView):
    def get(self,request,pk):
        client_detail = Client.objects.get(id=pk)
        serializer = ClientSerializer(client_detail, many= False)
        return Response(serializer.data)
       

class CreateClientAPI(APIView):
    def post(self,request):
        serializer = ClientSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateClientAPIView(APIView):
    def post(self,request,pk):
        todo = Client.objects.get(id=pk)
        serializer = ClientSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteClientAPIView(APIView):
    def get(self,request,pk):
        todo = Client.objects.get(id=pk)
        todo_instance = Client.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')