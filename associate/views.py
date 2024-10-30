from django.shortcuts import render
from associate import serializers
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from associate.models import Org_associate
from rest_framework.views import APIView
from associate.serializers import *


class ListAssociateAPI(APIView):
    def get(self,request):
        Org_associate_list = Org_associate.objects.all()
        serializer = AssociateListSerializer(Org_associate_list, many = True)
        return Response(serializer.data)

class AssociateDetailAPI(APIView):
    def get(self,request,pk):
        Org_associate_detail = Org_associate.objects.get(id=pk)
        serializer = AssociateSerializer(Org_associate_detail, many= False)
        return Response(serializer.data)
       

class CreateAssociateAPI(APIView):
    def post(self,request):
        serializer = AssociateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateAssociateAPIView(APIView):
    def post(self,request,pk):
        todo = Org_associate.objects.get(id=pk)
        serializer = AssociateSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteAssociateAPIView(APIView):
    def get(self,request,pk):
        todo = Org_associate.objects.get(id=pk)
        todo_instance = Org_associate.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')