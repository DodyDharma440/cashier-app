import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IProductResponse } from "@custom-types/product";

export const getProducts = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get("/products", config && config);
};

export const getProduct = (
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IProductResponse>> => {
  return apiCashier.get(`/products/${id}`, config && config);
};
