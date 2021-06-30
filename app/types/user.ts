import { Document } from "mongoose";
import { UserStatus } from "@enums/user";
import { TableHead } from "@custom-types/table";

export interface IUserModel extends Document {
  name: string;
  username: string;
  password: string;
  status: UserStatus.admin | UserStatus.kasir;
}

export interface IUserForm {
  name: string;
  username: string;
  isAdmin: boolean;
}

export interface IUserFixedForm {
  name: string;
  username: string;
  status: UserStatus.admin | UserStatus.kasir;
}

export interface IUserLoginForm {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  status: UserStatus.admin | UserStatus.kasir;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserResponse {
  users?: IUser[];
  user?: IUser;
  newUser?: IUser;
  updatedUser?: IUser;
  result?: {
    userId: string;
    username: string;
    name: string;
    status: UserStatus.admin | UserStatus.kasir;
  };
  token?: string;
  message?: string;
}

interface IUserDecodedToken {
  userId: string;
  username: string;
  name: string;
  status: UserStatus.admin | UserStatus.kasir;
}

export interface IUserAuthData {
  result: IUserDecodedToken | any;
  token: string;
}

export interface IUserTable extends TableHead {
  id: keyof IUser;
}
