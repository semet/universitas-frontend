<template>
    <form>
        <div class="input-group mb-3">
            <select-fakultas v-model="state.fakultasId"></select-fakultas>
        </div>
        <text-input
            input-id="matakuliah-name"
            icon="fas fa-user"
            placeholder="Nama Matakuliah"
            v-model="state.name"
        />
        <text-input
            input-id="matakuliah-sks"
            icon="fas fa-user"
            placeholder="SKS"
            v-model="state.sks"
        />
        <textarea-input placeholder="Description" v-model="state.description" />
    </form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from "vue";
import { MatakuliahEvent, Matakuliah } from "@/types/matakuliah";
import { Emitter } from "mitt";
import SelectFakultas from "@/components/form/SelectFakultas.vue";
import { useMatakuliah } from "@/crud/useMatakuliah";
import TextInput from "@/components/form/TextInput.vue";
import TextareaInput from "@/components/form/TextareaInput.vue";

export default defineComponent({
    components: {
        SelectFakultas,
        TextInput,
        TextareaInput,
    },
    setup() {
        const event = inject("eventBus") as Emitter<MatakuliahEvent>;

        const state = reactive<Matakuliah>({
            fakultasId: 0,
            name: "",
            sks: "",
            description: "",
        });
        const { saveMatakuliah } = useMatakuliah();
        onMounted(() => {
            event.on("saveMatakuliah", () => {
                saveMatakuliah(state);
            });
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
