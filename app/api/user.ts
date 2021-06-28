import { AxiosResponse } from "axios";
import { apiCashier } from "@api/config";
import { IUserResponse, IUserLoginForm } from "@custom-types/user";

export const signIn = (
  formData: IUserLoginForm
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.post("/users/sign-in", formData);
};

export const signOut = (): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.get("/users/sign-out");
};
