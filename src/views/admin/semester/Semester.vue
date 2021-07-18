<template>
    <div class="row">
        <app-card width="col-lg-9" header="Manajemen Semester">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tahun</th>
                            <th>Nama</th>
                            <th>Tanggal Awal</th>
                            <th>Tanggal Akhir</th>
                            <th>Aktif</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(semester, index) in allSemesters" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ semester.tahun.name }}</td>
                            <td>{{ semester.name }}</td>
                            <td>{{ formatDate(semester.start_date) }}</td>
                            <td>{{ formatDate(semester.end_date) }}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    :id="semester.id"
                                    switch="none"
                                    :checked="semester.active"
                                    :disabled="semester.active === 1"
                                    @click="toggleActiveSemester(semester.id)"
                                />
                                <label
                                    :for="semester.id"
                                    data-on-label="On"
                                    data-off-label="Off"
                                ></label>
                            </td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showSemester(semester.id)"
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
        <app-card width="col-lg-3">
            <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                @click.prevent="createSemester"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
            <div class="input-group mt-3">
                <select-tahun />
            </div>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component
                :is="modal.content"
                :currentSemester="selectedSemester"
            ></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import { useSemester } from "@/crud/useSemester";

import AppCard from "@/components/ui/AppCard.vue";
import SelectTahun from "@/components/form/SelectTahun.vue";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        SemesterCreate: defineAsyncComponent(() =>
            import("@/views/admin/semester/SemesterCreate.vue")
        ),
        SemesterShow: defineAsyncComponent(() =>
            import("@/views/admin/semester/SemesterShow.vue")
        ),
        SelectTahun,
    },
    setup() {
        const {
            allSemesters,
            loadSemester,
            createSemester,
            selectedSemester,
            showSemester,
            editSemester,
            deleteSemester,
            toggleActiveSemester,
            formatDate,
            modal,
            event,
        } = useSemester();

        onMounted(async () => {
            await loadSemester();
            event.on("semesterSaved", async () => await loadSemester());
        });
        return {
            allSemesters,
            loadSemester,
            createSemester,
            selectedSemester,
            showSemester,
            editSemester,
            deleteSemester,
            toggleActiveSemester,
            formatDate,
            modal,
            event,
        };
    },
});
</script>

<style scoped></style>
