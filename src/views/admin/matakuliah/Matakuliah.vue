<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Matakuliah">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>SKS</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(matakuliah, index) in allMatakuliah" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ matakuliah.name }}</td>
                            <td>{{ matakuliah.sks }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showMatakuliah(matakuliah.id)"
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
                @click.prevent="createMatakuliah"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component
                :is="modal.content"
                :currentMatakuliah="selectedMatakuliah"
            ></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { Emitter } from "mitt";
import { MatakuliahEvent } from "@/types/matakuliah";
import { useMatakuliah } from "@/crud/useMatakuliah";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        MatakuliahCreate: defineAsyncComponent(() =>
            import("@/views/admin/matakuliah/MatakuliahCreate.vue")
        ),
        MatakuliahShow: defineAsyncComponent(() =>
            import("@/views/admin/matakuliah/MatakuliahShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<MatakuliahEvent>;
        const {
            allMatakuliah,
            selectedMatakuliah,
            loadMatakuliah,
            createMatakuliah,
            showMatakuliah,
            editMatakuliah,
            deleteMatakuliah,
            modal,
        } = useMatakuliah();

        onMounted(async () => {
            await loadMatakuliah();

            event.on("matakuliahSaved", async () => {
                $("#myModal").modal("hide");
                await loadMatakuliah();
            });

            event.on("matakuliahEdited", async () => {
                $("#myModal").modal("hide");
                await loadMatakuliah();
            });
        });
        return {
            allMatakuliah,
            selectedMatakuliah,
            loadMatakuliah,
            createMatakuliah,
            showMatakuliah,
            editMatakuliah,
            deleteMatakuliah,
            modal,
        };
    },
});
</script>

<style scoped></style>
