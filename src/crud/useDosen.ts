import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { Dosen, DosenEvent } from "@/types/dosen";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm } from "@/helpers/formHelper";

export const useDosen = () => {
    const event = inject("eventBus") as Emitter<DosenEvent>;
    const allDosen = ref();
    const selectedDosen = ref();
    const modal = reactive<ModalProps<DosenEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const loadDosen = async () => {
        useApi
            .get<ApiResponse<Dosen>>("/admin/dosen")
            .then((response) => {
                allDosen.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createDosen = () => {
        modal.heading = "Entry Data Dosen";
        modal.content = "dosen-create";
        modal.event = "saveDosen";
    };

    const saveDosen = (dosen: Dosen) => {
        const data: Dosen = {
            fakultasId: dosen.fakultasId,
            matakuliahId: dosen.matakuliahId,
            employeeNumber: dosen.employeeNumber,
            username: dosen.username,
            name: dosen.name,
            email: dosen.email,
            active: dosen.active,
        };
        useApi
            .post("/admin/dosen", data)
            .then((response) => {
                event.emit("dosenSaved", response.data.msg);
                clearForm(dosen);
            })
            .catch((errors) => console.log(errors));
    };

    const showDosen = (id: number) => {
        useApi
            .get<ApiResponse<Dosen>>(`/admin/dosen/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedDosen.value = response.data.data;
                modal.heading = "Profil Dosen";
                modal.content = "dosen-show";
                modal.event = "editDosen";
            })
            .catch((errors) => console.log(errors));
    };

    const editDosen = (dosen: Dosen) => {
        useApi
            .post("/admin/dosen/edit", {
                id: dosen.id,
                fakultasId: dosen.fakultasId,
                name: dosen.name,
                username: dosen.username,
                email: dosen.email,
                password: dosen.password,
            } as Dosen)
            .then((response) => {
                event.emit("dosenEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteDosen = (dosenId: number) => {
        useApi.post(`/admin/dosen/delete`, { id: dosenId }).then((response) => {
            event.emit("dosenDeleted");
        });
    };
    return {
        allDosen,
        selectedDosen,
        loadDosen,
        createDosen,
        saveDosen,
        showDosen,
        editDosen,
        deleteDosen,
        modal,
    };
};
