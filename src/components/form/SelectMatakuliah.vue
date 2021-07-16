<template>
    <select
        class="custom-select"
        :value="modelValue"
        @change="updateMatakuliahId($event.target.value)"
    >
        <option selected value="0">Pilih Matakuliah</option>
        <option v-for="(mk, index) in allMatakuliah" :key="index" :value="mk.id">{{
            mk.name
        }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useMatakuliah } from "@/crud/useMatakuliah";

export default defineComponent({
    props: {
        modelValue: {
            type: [String, Number],
        },
        filterType: {
            type: String,
            default: "all",
        },
    },
    setup(props, { emit }) {
        const { allMatakuliah, loadMatakuliah } = useMatakuliah();

        onMounted(() => {
            loadMatakuliah();
        });

        const updateMatakuliahId = (id: string) => {
            emit("update:modelValue", parseInt(id));
        };
        return {
            allMatakuliah,
            updateMatakuliahId,
        };
    },
});
</script>

<style scoped></style>
