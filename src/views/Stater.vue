<template>
    <div class="my-5 pt-5">
        <div class="container">
            <div class="d-flex row justify-content-sm-around shadow-lg">
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <router-link to="/admin/home">
                        <i class="fas fa-user fa-4x"></i>
                        <h4>Admin</h4>
                    </router-link>
                </div>
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <i class="fas fa-user fa-4x"></i>
                    <h4>Dean</h4>
                </div>
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <i class="fas fa-user fa-4x"></i>
                    <h4>Staff</h4>
                </div>
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <i class="fas fa-user fa-4x"></i>
                    <h4>Dosen</h4>
                </div>
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <i class="fas fa-user fa-4x"></i>
                    <h5>Mahasiswa</h5>
                </div>
                <div class="item p-2 col-md-3 m-2 text-center shadow-lg rounded">
                    <i class="fas fa-user fa-4x"></i>
                    <h4>PSB</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style scoped>
.container {
    width: 400px;
}
.d-flex {
    background-color: rgba(213, 217, 223, 0.637);
}
.item {
    background-color: rgb(179, 179, 196);
    color: rgb(61, 62, 70);
}
</style>
