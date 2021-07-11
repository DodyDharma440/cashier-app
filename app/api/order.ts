import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IOrderForm, IOrderResponse } from "@custom-types/order";

export const getOrders = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.get("/orders", config && config);
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
