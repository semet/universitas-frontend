<template>
    <form>
        <text-input
            input-id="tahun-name"
            icon="fas fa-user"
            placeholder="Display Name"
            v-model="state.name"
        />
        <date-picker v-model="state.startDate" />

        <date-picker v-model="state.endDate" />

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
        <textarea-input placeholder="Description" v-model="state.description" />
    </form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from "vue";
import { Tahun, TahunEvent } from "@/types/tahun";
import { useTahun } from "@/crud/useTahun";
import { Emitter } from "mitt";

import TextInput from "@/components/form/TextInput.vue";
import TextareaInput from "@/components/form/TextareaInput.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import { useApi } from "@/hooks/useApi";

export default defineComponent({
    components: {
        TextInput,
        TextareaInput,
        DatePicker,
    },
    setup() {
        const event = inject("eventBus") as Emitter<TahunEvent>;
        const state = reactive<Tahun>({
            name: "",
            startDate: "",
            endDate: "",
            active: false,
            description: "",
        });

        const { saveTahun } = useTahun();

        onMounted(() => {
            event.on("saveTahun", () => saveTahun(state));
            // event.on("saveTahun", () => console.log(state.startDate));
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
