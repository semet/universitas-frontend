import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import { routes } from "./routes";
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkExactActiveClass: "mm-active",
    routes,
});

router.beforeEach(async (to, from) => {
    await setPageTitle(to, from);
});

const setPageTitle = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
) => {
    to.meta.title !== undefined
        ? (document.title = to.meta.title as string)
        : (document.title = "Universitas");
};
export default router;
