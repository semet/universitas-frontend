import { RouteRecordRaw } from "vue-router";

export const authRoutes: Array<RouteRecordRaw> = [
    {
        path: "admin",
        name: "adminLogin",
        component: () => import("@/views/admin/AdminLogin.vue"),
        meta: {
            title: "Admin Login",
        },
    },
    {
        path: "dekan",
        name: "dekanLogin",
        component: () => import("@/views/dekan/DekanLogin.vue"),
        meta: {
            title: "Dekan Login",
        },
    },
    {
        path: "staff",
        name: "staffLogin",
        component: () => import("@/views/staff/StaffLogin.vue"),
        meta: {
            title: "Staff Login",
        },
    },
    {
        path: "dosen",
        name: "dosenLogin",
        component: () => import("@/views/dosen/DosenLogin.vue"),
        meta: {
            title: "Doesn Login",
        },
    },
    {
        path: "mahasiswa",
        name: "mahasiswaLogin",
        component: () => import("@/views/mahasiswa/MahasiswaLogin.vue"),
        meta: {
            title: "Mahasiswa Login",
        },
    },
];
