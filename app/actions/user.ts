import * as api from "@api/user";
import { IUserLoginForm } from "@custom-types/user";

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

export const signOut = async (
  callback?: (success?: any, error?: any) => void
) => {
  try {
    const res = await api.signOut();
    callback && callback(res);
  } catch (error) {
    callback && callback(null, error);
  }
};
