from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from product_category.models import Product_category
from product_category.serializers import Product_categoryListSerializer,Product_categorySerializer


class ListProduct_categoryAPI(APIView):
    def get(self,request):
        product_list = Product_category.objects.all()
        serializer = Product_categoryListSerializer(product_list, many = True)
        return Response(serializer.data)

class Product_categoryDetailAPI(APIView):
    def get(self,request,pk):
        product_detail = Product_category.objects.get(id=pk)
        serializer = Product_categorySerializer(product_detail, many= False)
        return Response(serializer.data)
       

class CreateProduct_categoryAPI(APIView):
    def post(self,request):
        serializer = Product_categorySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateProduct_categoryAPIView(APIView):
    def post(self,request,pk):
        todo = Product_category.objects.get(id=pk)
        serializer = Product_categorySerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteProduct_categoryAPIView(APIView):
    def get(self,request,pk):
        todo = Product_category.objects.get(id=pk)
        todo_instance = Product_category.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')