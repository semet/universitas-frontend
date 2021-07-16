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
import { defineComponent, inject, onMounted, reactive, toRef } from "vue";
import { Fakultas, FakultasEvent } from "@/types/fakultas";
import { Emitter } from "mitt";
import { useFakultas } from "@/crud/useFakultas";

export default defineComponent({
    props: {
        currentFakultas: {
            type: Object,
        },
    },
    setup(props) {
        const event = inject("eventBus") as Emitter<FakultasEvent>;
        const { editFakultas } = useFakultas();
        const state = toRef(props, "currentFakultas");
        onMounted(() => {
            event.on("editFakultas", () => {
                editFakultas(props.currentFakultas as Fakultas);
            });
        });
        return {
            state,
        };
    },
});
</script>

<style scoped></style>
