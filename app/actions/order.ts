import * as api from "@api/order";
import { Theme } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { IOrderForm } from "@custom-types/order";
import { OrderStatus } from "@enums/order";

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
  theme: Theme,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.deleteOrder(id);
    Swal.fire({
      icon: "success",
      confirmButtonText: "Tutup",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Berhasil",
      text: "Pesanan berhasil dihapus.",
    });
    callback(data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Tutup",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Gagal",
      text: error.response.data.message || error.message,
    });
    callback(null, error);
  }
};

export const updateOrderStatus = async (
  status: OrderStatus,
  id: string,
  theme: Theme,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.updateOrderStatus(status, id);
    Swal.fire({
      icon: "success",
      confirmButtonText: "Tutup",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Berhasil",
      text: "Status pesanan diubah",
    });
    callback(data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Tutup",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Gagal",
      text: error.response.data.message || error.message,
    });
    callback(null, error);
  }
};
