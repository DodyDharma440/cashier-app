import * as api from "@api/user";
import { IUserLoginForm, IUserFixedForm } from "@custom-types/user";
import { deleteCookie } from "@utils/cookie";
import Swal from "sweetalert2";

export const signIn = async (
  formData: IUserLoginForm,
  callback?: (success?: any, error?: any) => void
) => {
  try {
    const res = await api.signIn(formData);
    callback && callback(res);
  } catch (error) {
    callback && callback(null, error);
  }
};

export const signOut = (callback?: () => void) => {
  deleteCookie("auth_token");
  callback && callback();
};

export const addUser = async (
  formData: IUserFixedForm,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.addUser(formData);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Anggota baru berhasil ditambahkan",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback && callback(null, error);
  }
};

export const updateUser = async (
  formData: IUserFixedForm,
  id: string,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.updatedUser(formData, id);
    callback(data);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Anggota berhasil diperbarui",
      confirmButtonText: "Tutup",
    });
  } catch (error) {
    callback && callback(null, error);
  }
};

export const deleteUser = async (id: string, callback: () => void) => {
  try {
    await api.deleteUser(id);
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: "Anggota berhasil diperbarui",
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
