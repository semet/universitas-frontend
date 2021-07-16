import { RouteRecordRaw } from "vue-router";

export type Menu = {
    name: RouteRecordRaw["name"];
    path: RouteRecordRaw["path"];
    icon: string;
    children?: Menu;
};

export type Paths<T> = {
    path: T;
};
