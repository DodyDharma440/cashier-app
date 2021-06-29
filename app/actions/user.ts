import * as api from "@api/user";
import { IUserLoginForm, IUserFixedForm } from "@custom-types/user";
import { deleteCookie } from "@utils/cookie";

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
  // try {
  //   const res = await api.signOut();
  //   callback && callback(res);
  // } catch (error) {
  //   callback && callback(null, error);
  // }
};

export const addUser = async (
  formData: IUserFixedForm,
  callback: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.addUser(formData);
    callback(data);
  } catch (error) {
    callback && callback(null, error);
  }
};
