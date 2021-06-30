import { IUserTable } from "@custom-types/user";
import { ICategoryTable } from "@custom-types/category";

export const tableHeadUser: IUserTable[] = [
  {
    id: "name",
    numeric: false,
    label: "Nama",
  },
  {
    id: "username",
    numeric: false,
    label: "Username",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
  },
];

export const tableHeadCategory: ICategoryTable[] = [
  {
    id: "categoryName",
    numeric: false,
    label: "Nama",
  },
];
