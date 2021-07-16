<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Staff">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Lengkap</th>
                            <th>Email</th>
                            <th>Fakultas</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(staff, index) in allStaffs" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ staff.name }}</td>
                            <td>{{ staff.email }}</td>
                            <td>{{ staff.fakultas.name }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showStaff(staff.id)"
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
                @click.prevent="createStaff"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component :is="modal.content" :currentStaff="selectedStaff"></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { Emitter } from "mitt";
import { StaffEvent } from "@/types/staff";
import { useStaff } from "@/crud/useStaff";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        StaffCreate: defineAsyncComponent(() =>
            import("@/views/admin/staff/StaffCreate.vue")
        ),
        StaffShow: defineAsyncComponent(() =>
            import("@/views/admin/staff/StaffShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<StaffEvent>;

        const {
            allStaffs,
            selectedStaff,
            loadStaff,
            createStaff,
            showStaff,
            editStaff,
            deleteStaff,
            modal,
        } = useStaff();

        onMounted(async () => {
            await loadStaff();

            event.on("staffSaved", async () => {
                $("#myModal").modal("hide");
                await loadStaff();
            });

            event.on("staffEdited", async () => {
                $("#myModal").modal("hide");
                await loadStaff();
            });
        });
        return {
            allStaffs,
            selectedStaff,
            createStaff,
            showStaff,
            editStaff,
            deleteStaff,
            modal,
        };
    },
});
</script>

<style scoped></style>
