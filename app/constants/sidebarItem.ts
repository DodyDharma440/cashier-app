import { MdDashboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BiFoodMenu, BiListUl } from "react-icons/bi";
import { HiOutlineCog, HiOutlineViewGrid } from "react-icons/hi";
import { IMenuItem } from "@custom-types/layout";

export const menuDataAdmin: IMenuItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Anggota",
    path: "/admin/anggota",
    icon: FiUser,
  },
  {
    label: "Kategori",
    path: "/admin/kategori",
    icon: HiOutlineViewGrid,
  },
  {
    label: "Produk",
    path: "/admin/produk",
    icon: BiFoodMenu,
  },
  {
    label: "Pengaturan",
    path: "/admin/pengaturan",
    icon: HiOutlineCog,
  },
];

export const menuDataKasir: IMenuItem[] = [
  {
    label: "Dashboard",
    path: "/kasir/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Pesanan",
    path: "/kasir/pesanan",
    icon: BiListUl,
  },
  {
    label: "Pengaturan",
    path: "/kasir/pengaturan",
    icon: HiOutlineCog,
  },
];
