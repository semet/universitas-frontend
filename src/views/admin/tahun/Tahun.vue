<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Staff">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Tanggal Awal</th>
                            <th>Tanggal Akhir</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tahun, index) in allTahun" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ tahun.name }}</td>
                            <td>{{ tahun.startDate }}</td>
                            <td>{{ tahun.endDate }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showTahun(staff.id)"
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
                @click.prevent="createTahun"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component :is="modal.content" :currentStaff="selectedTahun"></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { Emitter } from "mitt";
import { TahunEvent } from "@/types/tahun";
import { useTahun } from "@/crud/useTahun";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        TahunCreate: defineAsyncComponent(() =>
            import("@/views/admin/tahun/TahunCreate.vue")
        ),
        TahunShow: defineAsyncComponent(() =>
            import("@/views/admin/tahun/TahunShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<TahunEvent>;
        const {
            allTahun,
            selectedTahun,
            loadTahuns,
            createTahun,
            showTahun,
            editTahun,
            deleteTahun,
            modal,
        } = useTahun();

        onMounted(async () => {
            await loadTahuns();

            event.on("tahunSaved", async () => {
                $("#myModal").modal("hide");
                await loadTahuns();
            });

            event.on("tahunEdited", async () => {
                $("#myModal").modal("hide");
                await loadTahuns();
            });
        });
        return {
            allTahun,
            selectedTahun,
            createTahun,
            showTahun,
            editTahun,
            deleteTahun,
            modal,
        };
    },
});
</script>

<style scoped></style>
