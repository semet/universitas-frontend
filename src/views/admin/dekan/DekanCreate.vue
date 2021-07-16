<template>
    <form>
        <div class="input-group mb-3">
            <select-fakultas
                v-model="state.fakultasId"
                filterType="noDekan"
            ></select-fakultas>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="dekan-employee-number">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <input
                type="text"
                class="form-control"
                placeholder="Employee Number"
                aria-label="Employee Number"
                aria-describedby="dekan-employee-number"
                v-model="state.employeeNumber"
            />
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="dekan-username">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="dekan-username"
                v-model="state.username"
            />
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="dekan-name">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <input
                type="text"
                class="form-control"
                placeholder="Nama Lengkap"
                aria-label="Nama Lengkap"
                aria-describedby="dekan-name"
                v-model="state.name"
            />
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="dekan-email">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
            <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="dekan-email"
                v-model="state.email"
            />
        </div>
        <div class="input-group mb-3">
            <input
                type="checkbox"
                id="active"
                switch="none"
                checked
                v-model="state.active"
            />
            <label for="active" data-on-label="Active" data-off-label="Off"></label>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from "vue";
import { Dekan, DekanEvent } from "@/types/dekan";
import { Emitter } from "mitt";
import SelectFakultas from "@/components/form/SelectFakultas.vue";
import { useDekan } from "@/crud/useDekan";

export default defineComponent({
    components: { SelectFakultas },
    setup() {
        const event = inject("eventBus") as Emitter<DekanEvent>;
        const state = reactive<Dekan>({
            fakultasId: 0,
            employeeNumber: "",
            username: "",
            name: "",
            email: "",
            active: true,
        });
        const { saveDekan } = useDekan();

        onMounted(() => {
            event.on("saveDekan", () => {
                saveDekan(state);
            });
        });
        return { state };
    },
});
</script>

<style scoped></style>
