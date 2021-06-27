import * as api from "@api/user";
import { IUserLoginForm } from "@custom-types/user";
import { setCookie, deleteCookie } from "@utils/cookie";

export const signIn = async (
  formData: IUserLoginForm,
  callback?: (success?: any, error?: any) => void
) => {
  try {
    const { data } = await api.signIn(formData);
    setCookie({
      name: "user-data",
      value: JSON.stringify({
        result: data.result,
        token: data.token,
      }),
      days: 1,
    });

    callback && callback(data);
  } catch (error) {
    callback && callback(null, error);
  }
};

export const signOut = (callback?: () => void) => {
  deleteCookie("user-data");
  callback && callback();
};
