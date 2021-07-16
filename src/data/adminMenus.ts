import { Menu } from "@/types/menu";

export const adminMenus: Array<Menu> = [
    {
        path: "/admin/home",
        name: "Dashboard",
        icon: "mdi mdi-view-dashboard-variant",
    },
    {
        path: "/admin/fakultas",
        name: "Fakultas",
        icon: "mdi mdi-home-city",
    },
    {
        path: "/admin/dekan",
        name: "Dekan",
        icon: "mdi mdi-account-circle",
    },
    {
        path: "/admin/staff",
        name: "staff",
        icon: "mdi mdi-account-group",
    },
    {
        path: "/admin/matakuliah",
        name: "Mata Kuliah",
        icon: "mdi mdi-account-multiple",
    },
    {
        path: "/admin/dosen",
        name: "dosen",
        icon: "mdi mdi-account-multiple",
    },
    {
        path: "/admin/mahasiswa",
        name: "Mahasiswa",
        icon: "mdi mdi-school",
    },
];
