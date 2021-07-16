import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { Dekan, DekanEvent } from "@/types/dekan";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm } from "@/helpers/formHelper";

export const useDekan = () => {
    const event = inject("eventBus") as Emitter<DekanEvent>;
    const allDekan = ref();
    const selectedDekan = ref();
    const modal = reactive<ModalProps<DekanEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const loadDekan = async () => {
        useApi
            .get<ApiResponse<Dekan>>("/admin/dekan")
            .then((response) => {
                allDekan.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };
    const createDekan = () => {
        modal.heading = "Entry Data Dekan";
        modal.content = "dekan-create";
        modal.event = "saveDekan";
    };

    const saveDekan = (dekan: Dekan) => {
        useApi
            .post("/admin/dekan", {
                fakultasId: dekan.fakultasId,
                employeeNumber: dekan.employeeNumber,
                username: dekan.username,
                name: dekan.name,
                email: dekan.email,
                active: dekan.active,
            } as Dekan)
            .then((response) => {
                event.emit("dekanSaved", response.data.msg);
                clearForm(dekan);
            })
            .catch((errors) => console.log(errors));
    };

    const showDekan = (id: number) => {
        useApi
            .get<ApiResponse<Dekan>>(`/admin/dekan/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedDekan.value = response.data.data;
                modal.heading = "Profil Dekan";
                modal.content = "dekan-show";
                modal.event = "editDekan";
            })
            .catch((errors) => console.log(errors));
    };

    const editDekan = (dekan: Dekan) => {
        useApi
            .post("/admin/dekan/edit", {
                id: dekan.id,
                fakultasId: dekan.fakultasId,
                name: dekan.name,
                username: dekan.username,
                email: dekan.email,
                password: dekan.password,
            } as Dekan)
            .then((response) => {
                event.emit("dekanEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteDekan = (dekanId: number) => {
        useApi.post(`/admin/dekan/delete`, { id: dekanId }).then((response) => {
            event.emit("dekanDeleted");
        });
    };

    return {
        allDekan,
        selectedDekan,
        loadDekan,
        createDekan,
        saveDekan,
        showDekan,
        editDekan,
        deleteDekan,
        modal,
    };
};
