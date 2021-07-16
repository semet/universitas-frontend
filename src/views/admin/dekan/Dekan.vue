<template>
    <div class="row">
        <app-card width="col-lg-10" header="Manajemen Dekan">
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
                        <tr v-for="(dekan, index) in allDekan" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ dekan.name }}</td>
                            <td>{{ dekan.email }}</td>
                            <td>{{ dekan.fakultas.name }}</td>
                            <td>
                                <div class="btn-toolbar mb-0">
                                    <div class="">
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm waves-effect waves-light mr-1"
                                            @click.prevent="showDekan(dekan.id)"
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
                @click.prevent="createDekan"
            >
                Add New
                <i class="fas fa-plus ml-2"></i>
            </button>
        </app-card>
        <app-modal :heading="modal.heading" :event="modal.event">
            <component :is="modal.content" :currentDekan="selectedDekan"></component>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, onMounted } from "vue";
import $ from "jquery";
import AppCard from "@/components/ui/AppCard.vue";
import { Emitter } from "mitt";
import { DekanEvent } from "@/types/dekan";
import { useDekan } from "@/crud/useDekan";

export default defineComponent({
    components: {
        AppCard,
        AppModal: defineAsyncComponent(() => import("@/components/ui/AppModal.vue")),
        DekanCreate: defineAsyncComponent(() =>
            import("@/views/admin/dekan/DekanCreate.vue")
        ),
        DekanShow: defineAsyncComponent(() =>
            import("@/views/admin/dekan/DekanShow.vue")
        ),
    },
    setup() {
        const event = inject("eventBus") as Emitter<DekanEvent>;

        const {
            allDekan,
            selectedDekan,
            loadDekan,
            createDekan,
            saveDekan,
            showDekan,
            editDekan,
            deleteDekan,
            modal,
        } = useDekan();

        onMounted(async () => {
            await loadDekan();

            event.on("dekanSaved", async () => {
                $("#myModal").modal("hide");
                await loadDekan();
            });

            event.on("dekanEdited", async () => {
                $("#myModal").modal("hide");
                await loadDekan();
            });
        });
        return {
            allDekan,
            selectedDekan,
            createDekan,
            showDekan,
            editDekan,
            deleteDekan,
            modal,
        };
    },
});
</script>

<style scoped></style>
