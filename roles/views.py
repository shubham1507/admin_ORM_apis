from django.shortcuts import render
from rest_framework.response import Response
from roles.models import Role
from rest_framework.views import APIView
from roles.serializers import RoleListSerilaizer,RoleSeriliazer

class ListRoleAPI(APIView):
    def get(self,request):
        client_list = Role.objects.all()
        serializer = RoleListSerilaizer(client_list, many = True)
        return Response(serializer.data)

class RoleDetailAPI(APIView):
    def get(self,request,pk):
        client_detail = Role.objects.get(id=pk)
        serializer = RoleSeriliazer(client_detail, many= False)
        return Response(serializer.data)
       

class CreateRoleAPI(APIView):
    def post(self,request):
        serializer = RoleSeriliazer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateRoleAPIView(APIView):
    def post(self,request,pk):
        todo = Role.objects.get(id=pk)
        serializer = RoleSeriliazer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteRoleAPIView(APIView):
    def get(self,request,pk):
        todo = Role.objects.get(id=pk)
        todo_instance = Role.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')