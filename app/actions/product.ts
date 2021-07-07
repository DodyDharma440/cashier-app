import * as api from "@api/product";
import { IProductForm } from "@custom-types/product";
import Swal from "sweetalert2";

export const getProductsByCategory = async (
  categoryName: string,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.getProductsByCategory(categoryName);
    callback(data.products);
  } catch (error) {
    callback(null, error);
  }
};

export const searchProducts = async (
  value: string,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.searchProducts(value);
    callback(data.products);
  } catch (error) {
    callback(null, error);
  }
};

export const addProduct = async (
  inputValue: IProductForm,
  callback: (success?: any, error?: any) => void
) => {
  const { productName, categoryId, price, description, productImage } =
    inputValue;

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("categoryId", categoryId);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("productImage", productImage);

  try {
    const { data } = await api.addProduct(formData);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Produk baru berhasil ditambahkan",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback(null, error);
  }
};

export const updateProduct = async (
  inputValue: IProductForm,
  id: string,
  callback: (success?: any, error?: any) => void
) => {
  const { productName, categoryId, price, description, productImage } =
    inputValue;

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("categoryId", categoryId);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("productImage", productImage);

  try {
    const { data } = await api.updateProduct(formData, id);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Produk berhasil diperbarui",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback(null, error);
  }
};

export const deleteProduct = async (id: string, callback: () => void) => {
  try {
    await api.deleteProduct(id);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Produk berhasil dihapus",
      confirmButtonText: "Tutup",
    });
    callback();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.message,
      confirmButtonText: "Tutup",
    });
  }
};
