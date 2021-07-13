import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IOrderForm, IOrderResponse } from "@custom-types/order";
import { OrderStatus } from "@enums/order";

export const getOrders = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.get("/orders", config && config);
};

export const getOrder = (
  id?: string | string[],
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.get(`/orders/${id}`, config && config);
};

export const addOrder = (
  formData: IOrderForm
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.post("/orders", formData);
};

export const deleteOrder = (
  id: string
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.delete(`/orders/${id}`);
};

export const updateOrderStatus = (
  status: OrderStatus,
  id: string
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.put(`orders/update-status/${id}`, { status });
};
