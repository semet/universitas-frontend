<template>
    <form>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="fakultas-name">
                    <i class="fas fa-building"></i>
                </span>
            </div>
            <input
                type="text"
                class="form-control"
                placeholder="Nama Fakultas"
                aria-label="Nama Fakultas"
                aria-describedby="fakultas-name"
                v-model="state.name"
            />
        </div>
        <div class="input-group mb-3">
            <textarea
                class="form-control"
                rows="5"
                placeholder="Description"
                v-model="state.description"
            ></textarea>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from "vue";
import { Fakultas, FakultasEvent } from "@/types/fakultas";
import { Emitter } from "mitt";
import { useFakultas } from "@/crud/useFakultas";

export default defineComponent({
    setup() {
        const event = inject("eventBus") as Emitter<FakultasEvent>;
        const state = reactive<Fakultas>({
            name: "",
            description: "",
        });
        const { saveFakultas } = useFakultas();
        onMounted(() => {
            event.on("saveFakultas", () => {
                saveFakultas(state);
            });
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
