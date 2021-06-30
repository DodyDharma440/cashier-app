import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { ICategoryResponse, ICategoryForm } from "@custom-types/category";

export const getCategories = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ICategoryResponse>> => {
  return apiCashier.get("/categories", config && config);
};

export const getCategory = (
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ICategoryResponse>> => {
  return apiCashier.get(`/categories/${id}`, config && config);
};

export const addCategory = (
  formData: ICategoryForm
): Promise<AxiosResponse<ICategoryResponse>> => {
  return apiCashier.post("/categories", formData);
};

export const updateCategory = (
  formData: ICategoryForm,
  id: string
): Promise<AxiosResponse<ICategoryResponse>> => {
  return apiCashier.put(`/categories/${id}`, formData);
};

export const deleteCategory = (
  id: string
): Promise<AxiosResponse<ICategoryResponse>> => {
  return apiCashier.delete(`/categories/${id}`);
};
