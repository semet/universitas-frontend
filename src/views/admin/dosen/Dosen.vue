<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Dosen">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Lengkap</th>
                            <th>Fakultas</th>
                            <th>Matakuliah</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dosen, index) in allDosen" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ dosen.name }}</td>
                            <td>{{ dosen.fakultas.name }}</td>
                            <td>{{ dosen.matakuliah.name }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showDosen(dosen.id)"
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
                @click.prevent="createDosen"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component :is="modal.content" :currentDosen="selectedDosen"></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { Emitter } from "mitt";
import { DosenEvent } from "@/types/dosen";
import { useDosen } from "@/crud/useDosen";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        DosenCreate: defineAsyncComponent(() =>
            import("@/views/admin/dosen/DosenCreate.vue")
        ),
        DosenShow: defineAsyncComponent(() =>
            import("@/views/admin/dosen/DosenShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<DosenEvent>;

        const {
            allDosen,
            selectedDosen,
            loadDosen,
            createDosen,
            showDosen,
            deleteDosen,
            modal,
        } = useDosen();

        onMounted(async () => {
            await loadDosen();

            event.on("dosenSaved", async () => {
                $("#myModal").modal("hide");
                await loadDosen();
            });

            event.on("dosenEdited", async () => {
                $("#myModal").modal("hide");
                await loadDosen();
            });
        });
        return {
            allDosen,
            selectedDosen,
            loadDosen,
            createDosen,
            showDosen,
            deleteDosen,
            modal,
        };
    },
});
</script>

<style scoped></style>
