import { RouteRecordRaw } from "vue-router";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/views/Stater.vue"),
    },
    {
        path: "/login",
        component: () => import("@/components/layouts/AuthLayout.vue"),
        children: [...authRoutes],
    },

    // Admin Routes
    {
        path: "/admin",
        component: () => import("@/components/layouts/MainLayout.vue"),
        children: [...adminRoutes],
    },
];
