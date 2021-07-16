import { RouteRecordRaw } from "vue-router";
import { AdminMenuPaths } from "@/types/admin";
import { Paths } from "@/types/menu";

export const adminRoutes: Array<RouteRecordRaw & Paths<AdminMenuPaths>> = [
    {
        path: "home",
        name: "adminHome",
        component: () => import("@/views/admin/Home.vue"),
        meta: {
            title: "Admin Home",
        },
    },
    {
        path: "home",
        name: "adminHome",
        component: () => import("@/views/admin/Home.vue"),
        meta: {
            title: "Admin Home",
        },
    },
    {
        path: "dekan",
        name: "adminDekan",
        component: () => import("@/views/admin/dekan/Dekan.vue"),
        meta: {
            title: "Admin Dekan",
        },
    },
    {
        path: "fakultas",
        name: "adminFakultas",
        component: () => import("@/views/admin/fakultas/Fakultas.vue"),
        meta: {
            title: "Admin Fakultas",
        },
    },
    {
        path: "staff",
        name: "adminStaff",
        component: () => import("@/views/admin/staff/Staff.vue"),
        meta: {
            title: "Admin Staff",
        },
    },
    {
        path: "matakuliah",
        name: "adminMatakuliah",
        component: () => import("@/views/admin/matakuliah/Matakuliah.vue"),
        meta: {
            title: "Admin Matakuliah",
        },
    },
    {
        path: "dosen",
        name: "adminDosen",
        component: () => import("@/views/admin/dosen/Dosen.vue"),
        meta: {
            title: "Admin Dosen",
        },
    },
    {
        path: "mahasiswa",
        name: "adminMahasiswa",
        component: () => import("@/views/admin/mahasiswa/Mahasiswa.vue"),
        meta: {
            title: "Admin Mahasiswa",
        },
    },
];
