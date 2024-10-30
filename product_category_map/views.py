from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from product_category_map.models import Product_cat_Map
from product.serializers import ProductSerializer,ProductListSerializer



class ListProduct_cat_MapAPI(APIView):
    def get(self,request):
        product_list = Product_cat_Map.objects.all()
        serializer = ProductListSerializer(product_list, many = True)
        return Response(serializer.data)

class Product_cat_MapDetailAPI(APIView):
    def get(self,request,pk):
        product_detail = Product_cat_Map.objects.get(id=pk)
        serializer = ProductSerializer(product_detail, many= False)
        return Response(serializer.data)
       

class CreateProduct_cat_MapAPI(APIView):
    def post(self,request):
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateProduct_cat_MapAPIView(APIView):
    def post(self,request,pk):
        todo = Product_cat_Map.objects.get(id=pk)
        serializer = ProductSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteProduct_cat_MapAPIView(APIView):
    def get(self,request,pk):
        todo = Product_cat_Map.objects.get(id=pk)
        todo_instance = Product_cat_Map.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')