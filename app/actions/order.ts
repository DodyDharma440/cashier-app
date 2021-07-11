import * as api from "@api/order";
import { IOrderForm } from "@custom-types/order";

export const addOrder = async (
  formData: IOrderForm,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.addOrder(formData);
    callback(data);
  } catch (error) {
    callback(null, error);
  }
};

export const deleteOrder = async (
  id: string,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.deleteOrder(id);
    callback(data);
  } catch (error) {
    callback(null, error);
  }
};
