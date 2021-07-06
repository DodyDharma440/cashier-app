import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IOrderResponse } from "@custom-types/order";

export const getOrders = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IOrderResponse>> => {
  return apiCashier.get("/orders", config && config);
};
