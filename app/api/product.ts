import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IProductResponse } from "@custom-types/product";

export const getProducts = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get("/products", config && config);
};

export const getProductsByCategory = (
  categoryName: string
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get(`/products?category=${categoryName}`);
};

export const searchProducts = (
  value: string
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get(`/products?search=${value}`);
};

export const getProduct = (
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get(`/products/${id}`, config && config);
};

export const addProduct = (
  formData: FormData
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (
  formData: FormData,
  id: string
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.put(`/products/${id}`, formData);
};

export const deleteProduct = (
  id: string
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.delete(`/products/${id}`);
};
