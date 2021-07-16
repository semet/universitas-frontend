<template>
    <select
        class="custom-select"
        :value="modelValue"
        @change="updateFakultasId($event.target.value)"
    >
        <option selected value="0">Pilih Fakultas</option>
        <option
            v-for="(fakultas, index) in allFakultas"
            :key="index"
            :value="fakultas.id"
            >{{ fakultas.name }}</option
        >
    </select>
</template>

<script lang="ts">
import { useFakultas } from "@/crud/useFakultas";
import { DekanEvent } from "@/types/dekan";
import { Emitter } from "mitt";
import { defineComponent, inject, onMounted } from "vue";

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
        const event = inject("eventBus") as Emitter<DekanEvent>;
        const { allFakultas, loadFakultas, loadFakultasWithNoDekan } = useFakultas();

        onMounted(() => {
            if (props.filterType === "all") {
                loadFakultas();
            } else if (props.filterType === "noDekan") {
                loadFakultasWithNoDekan();
            }
            event.on("dekanSaved", () => loadFakultasWithNoDekan());
        });

        const updateFakultasId = (id: string) => {
            emit("update:modelValue", parseInt(id));
        };
        return {
            allFakultas,
            updateFakultasId,
        };
    },
});
</script>

<style scoped></style>
