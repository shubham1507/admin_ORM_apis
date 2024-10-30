from django.shortcuts import render
from rest_framework.response import Response
from product.models import Product
from rest_framework.views import APIView
from product.serializers import ProductSerializer,ProductListSerializer


class ListProductAPI(APIView):
    def get(self,request):
        product_list = Product.objects.all()
        serializer = ProductListSerializer(product_list, many = True)
        return Response(serializer.data)

class ProductDetailAPI(APIView):
    def get(self,request,pk):
        product_detail = Product.objects.get(id=pk)
        serializer = ProductSerializer(product_detail, many= False)
        return Response(serializer.data)
       

class CreateProductAPI(APIView):
    def post(self,request):
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
  
class UpdateProductAPIView(APIView):
    def post(self,request,pk):
        todo = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class DeleteProductAPIView(APIView):
    def get(self,request,pk):
        todo = Product.objects.get(id=pk)
        todo_instance = Product.objects.get(id=pk)
        todo_instance.delete()
        return Response('Deleted')