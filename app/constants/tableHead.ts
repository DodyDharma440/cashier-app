import { IUserTable } from "@custom-types/user";
import { ICategoryTable } from "@custom-types/category";
import { IProductTable } from "@custom-types/product";

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

export const tableHeadProduct: IProductTable[] = [
  {
    id: "imageUrl",
    numeric: false,
    label: "Gambar",
  },
  {
    id: "productName",
    numeric: false,
    label: "Nama",
  },
  {
    id: "categoryName",
    numeric: false,
    label: "Kategori",
  },
  {
    id: "price",
    numeric: false,
    label: "Harga",
  },
  {
    id: "description",
    numeric: false,
    label: "Deskripsi",
  },
];
