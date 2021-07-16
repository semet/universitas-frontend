import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { useApi } from "@/hooks/useApi";
import { Emitter } from "mitt";
import { Fakultas, FakultasEvent } from "@/types/fakultas";
import { clearForm } from "@/helpers/formHelper";
import { ModalProps } from "@/types/modalProps";

export const useFakultas = () => {
    const event = inject("eventBus") as Emitter<FakultasEvent>;
    const allFakultas = ref();
    const selectedFakultas = ref();

    const modal = reactive<ModalProps<FakultasEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const loadFakultas = async () => {
        useApi
            .get<ApiResponse<Fakultas>>("/admin/fakultas")
            .then((response) => {
                allFakultas.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const loadFakultasWithNoDekan = () => {
        useApi
            .get<ApiResponse<Fakultas>>("/admin/fakultas/no_dekan")
            .then((response) => {
                allFakultas.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createFakultas = () => {
        modal.heading = "Entry Data Fakultas";
        modal.content = "fakultas-create";
        modal.event = "saveFakultas";
    };

    const saveFakultas = (fakultas: Fakultas) => {
        useApi
            .post("/admin/fakultas", {
                name: fakultas.name,
                description: fakultas.description,
            } as Fakultas)
            .then((response) => {
                event.emit("fakultasSaved", response.data.msg);
                clearForm(fakultas);
            })
            .catch((errors) => console.log(errors));
    };

    const showFakultas = (id: number) => {
        useApi
            .get<ApiResponse<Fakultas>>(`/admin/fakultas/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedFakultas.value = response.data.data;
                modal.heading = "Detail Fakultas";
                modal.content = "fakultas-show";
                modal.event = "editFakultas";
            })
            .catch((errors) => console.log(errors));
    };

    const editFakultas = (fakultas: Fakultas) => {
        useApi
            .post("/admin/fakultas/edit", {
                id: fakultas.id,
                name: fakultas.name,
                description: fakultas.description,
            } as Fakultas)
            .then((response) => {
                event.emit("fakultasEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteFakultas = (fakultasId: number) => {
        useApi.post(`/admin/fakultas/delete`, { id: fakultasId }).then((response) => {
            event.emit("fakultasDeleted");
        });
    };
    return {
        allFakultas,
        selectedFakultas,
        loadFakultas,
        loadFakultasWithNoDekan,
        createFakultas,
        saveFakultas,
        showFakultas,
        editFakultas,
        deleteFakultas,
        modal,
    };
};
