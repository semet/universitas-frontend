<template>
    <form>
        <text-input
            input-id="Display Name"
            icon="fas fa-user"
            placeholder="Display Name"
            v-model="state.name"
        />
        <text-input
            input-id="Display Name"
            icon="fas fa-user"
            placeholder="Display Name"
        />
    </form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from "vue";
import { Tahun, TahunEvent } from "@/types/tahun";
import { useTahun } from "@/crud/useTahun";

import TextInput from "@/components/form/TextInput.vue";
import { Emitter } from "mitt";

export default defineComponent({
    components: {
        TextInput,
    },
    setup() {
        const event = inject("eventBus") as Emitter<TahunEvent>;
        const state = reactive<Tahun>({
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            active: false,
            description: "",
        });

        const { saveTahun } = useTahun();

        onMounted(() => {
            event.on("saveTahun", () => saveTahun(state));
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
