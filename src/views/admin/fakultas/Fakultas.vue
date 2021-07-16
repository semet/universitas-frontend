<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Fakultas">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Fakultas</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(fakultas, index) in allFakultas" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ fakultas.name }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showFakultas(fakultas.id)"
                                        >
                                            <i class="far fa-eye"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm waves-effect waves-light mr-1"
                                        >
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-card>
        <app-card width="col-lg-2">
            <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                @click.prevent="createFakultas"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component
                :is="modal.content"
                :currentFakultas="selectedFakultas"
            ></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted, reactive } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { useFakultas } from "@/crud/useFakultas";
import { Emitter } from "mitt";
import { FakultasEvent } from "@/types/fakultas";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        FakultasCreate: defineAsyncComponent(() =>
            import("@/views/admin/fakultas/FakultasCreate.vue")
        ),
        FakultasShow: defineAsyncComponent(() =>
            import("@/views/admin/fakultas/FakultasShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<FakultasEvent>;
        const {
            allFakultas,
            loadFakultas,
            createFakultas,
            selectedFakultas,
            showFakultas,
            modal,
        } = useFakultas();

        onMounted(async () => {
            await loadFakultas();
            event.on("fakultasSaved", async () => {
                $("#myModal").modal("hide");
                await loadFakultas();
            });

            event.on("fakultasEdited", async () => {
                $("#myModal").modal("hide");
                await loadFakultas();
            });
        });

        return {
            allFakultas,
            createFakultas,
            showFakultas,
            selectedFakultas,
            modal,
        };
    },
});
</script>

<style scoped></style>
