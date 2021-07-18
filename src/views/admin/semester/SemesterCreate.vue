<template>
    <form>
        <div class="input-group mb-3">
            <select-tahun v-model="state.tahunId" />
        </div>
        <div class="input-group mb-3">
            <select class="custom-select" v-model="state.name">
                <option selected value="">Nama</option>
                <option value="ganjil">Ganjil</option>
                <option value="genap">Genap</option>
            </select>
        </div>

        <date-picker v-model="state.startDate" />

        <date-picker v-model="state.endDate" />
    </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { Semester } from "@/types/semester";
import { useSemester } from "@/crud/useSemester";

import SelectTahun from "@/components/form/SelectTahun.vue";
import DatePicker from "@/components/form/DatePicker.vue";

export default defineComponent({
    components: { SelectTahun, DatePicker },
    setup() {
        const { event, saveSemester } = useSemester();
        const state = reactive<Semester>({
            tahunId: 0,
            name: "",
            startDate: "",
            endDate: "",
            active: false,
            description: "",
        });

        onMounted(() => {
            event.on("saveSemester", () => saveSemester(state));
        });

        return {
            state,
        };
    },
});
</script>

<style scoped></style>
