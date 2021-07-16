<template>
    <div class="vertical-menu">
        <div data-simplebar class="h-100">
            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <component :is="currentSidebar"></component>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";

export default defineComponent({
    components: {
        AdminSidebar: defineAsyncComponent(() =>
            import("@/views/admin/AdminSidebar.vue")
        ),
    },
    setup() {
        const currentSidebar = ref("admin-sidebar");
        return {
            currentSidebar,
        };
    },
});
</script>

<style scoped></style>
