<template>
    <ul class="metismenu list-unstyled" id="side-menu">
        <li class="menu-title">Main</li>

        <li v-for="(menu, index) in adminMenus" :key="index">
            <router-link :to="menu.path" class="waves-effect">
                <i :class="menu.icon"></i>
                <span>{{ menu.name }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useSidebar } from "@/hooks/useSidebar";
import { adminMenus } from "@/data/adminMenus";

export default defineComponent({
    setup() {
        const { initMetismenu } = useSidebar();
        onMounted(() => {
            initMetismenu("#side-menu");
        });
        return {
            adminMenus,
        };
    },
});
</script>

<style scoped></style>
