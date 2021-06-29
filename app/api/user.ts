import { AxiosResponse, AxiosRequestConfig } from "axios";
import { apiCashier } from "@api/config";
import {
  IUserResponse,
  IUserLoginForm,
  IUserFixedForm,
} from "@custom-types/user";

export const signIn = (
  formData: IUserLoginForm
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.post("/users/sign-in", formData);
};

export const signOut = (): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.get("/users/sign-out");
};

export const getUsers = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.get("/users", config && config);
};

export const getUser = (
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.get(`/users/${id}`, config && config);
};

export const addUser = (
  formData: IUserFixedForm
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.post("/users", formData);
};

export const updatedUser = (
  formData: IUserFixedForm,
  id: string
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.put(`/users/${id}`, formData);
};

export const deleteUser = (
  id: string
): Promise<AxiosResponse<IUserResponse>> => {
  return apiCashier.delete(`/users/${id}`);
};
