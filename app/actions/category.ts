import * as api from "@api/category";
import { ICategoryForm } from "@custom-types/category";
import Swal from "sweetalert2";

export const addCategory = async (
  formData: ICategoryForm,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.addCategory(formData);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Kategori baru berhasil ditambahkan",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback(null, error);
  }
};

export const updateCategory = async (
  formData: ICategoryForm,
  id: string,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.updateCategory(formData, id);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Kategori berhasil diperbarui",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback && callback(null, error);
  }
};

export const deleteCategory = async (id: string, callback: () => void) => {
  try {
    await api.deleteCategory(id);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Kategori berhasil dihapus",
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
