<template>
    <select
        class="custom-select"
        :value="modelValue"
        @change="updateTahunId($event.target.value)"
    >
        <option selected value="0">Pilih Tahun</option>
        <option v-for="(tahun, index) in allTahun" :key="index" :value="tahun.id">{{
            tahun.name
        }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useTahun } from "@/crud/useTahun";

export default defineComponent({
    props: {
        modelValue: {
            type: [String, Number],
        },
    },
    setup(props, { emit }) {
        const { allTahun, loadTahuns } = useTahun();
        onMounted(() => loadTahuns());
        const updateTahunId = (id: string) => {
            emit("update:modelValue", parseInt(id));
        };
        return {
            allTahun,
            updateTahunId,
        };
    },
});
</script>

<style scoped></style>
