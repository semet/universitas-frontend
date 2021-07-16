<template>
    <form>
        <div class="input-group mb-3">
            <select-fakultas v-model="state.fakultasId"></select-fakultas>
        </div>
        <div class="input-group mb-3">
            <select-matakuliah v-model="state.matakuliahId"></select-matakuliah>
        </div>
        <text-input
            input-id="dosen-employee-number"
            icon="fas fa-user"
            placeholder="Nomor Induk"
            v-model="state.employeeNumber"
        />
        <text-input
            input-id="dosen-username"
            icon="fas fa-user"
            placeholder="Username"
            v-model="state.username"
        />
        <text-input
            input-id="dosen-name"
            icon="fas fa-user"
            placeholder="Nama Dosen"
            v-model="state.name"
        />
        <text-input
            input-id="dosen-email"
            icon="fas fa-user"
            placeholder="Email"
            v-model="state.email"
        />
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
import { Emitter } from "mitt";
import { Dosen, DosenEvent } from "@/types/dosen";
import { useDosen } from "@/crud/useDosen";
import SelectFakultas from "@/components/form/SelectFakultas.vue";
import TextInput from "@/components/form/TextInput.vue";
import SelectMatakuliah from "@/components/form/SelectMatakuliah.vue";

export default defineComponent({
    components: {
        SelectFakultas,
        SelectMatakuliah,
        TextInput,
    },
    setup() {
        const event = inject("eventBus") as Emitter<DosenEvent>;
        const state = reactive<Dosen>({
            fakultasId: "",
            matakuliahId: "",
            employeeNumber: "",
            username: "",
            name: "",
            email: "",
            active: true,
        });
        const { saveDosen } = useDosen();

        onMounted(() => {
            event.on("saveDosen", () => saveDosen(state));
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
