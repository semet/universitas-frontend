<template>
    <div id="layout-wrapper">
        <app-header></app-header>

        <!-- ========== Left Sidebar Start ========== -->
        <app-sidebar></app-sidebar>
        <!-- Left Sidebar End -->

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <!-- start page title -->
                    <app-title></app-title>
                    <!-- end page title -->
                    <router-view></router-view>
                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            © 2021 Veltrix<span class="d-none d-sm-inline-block">
                                - Crafted with
                                <i class="mdi mdi-heart text-danger"></i> by
                                Themesbrand.</span
                            >
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <!-- end main content-->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import AppHeader from "../partials/AppHeader.vue";
import AppSidebar from "../partials/AppSidebar.vue";
import AppTitle from "../partials/AppTitle.vue";

export default defineComponent({
    components: { AppHeader, AppSidebar, AppTitle },
    setup() {
        onMounted(() => {
            document.body.setAttribute("data-sidebar", "dark");
        });
        return {};
    },
});
</script>
