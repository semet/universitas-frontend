import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { Matakuliah, MatakuliahEvent } from "@/types/matakuliah";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm } from "@/helpers/formHelper";

export const useMatakuliah = () => {
    const event = inject("eventBus") as Emitter<MatakuliahEvent>;
    const allMatakuliah = ref();
    const selectedMatakuliah = ref();
    const modal = reactive<ModalProps<MatakuliahEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const loadMatakuliah = async () => {
        useApi
            .get<ApiResponse<Matakuliah>>("/admin/matakuliah")
            .then((response) => {
                allMatakuliah.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createMatakuliah = () => {
        modal.heading = "Entry Data Matakuliah";
        modal.content = "matakuliah-create";
        modal.event = "saveMatakuliah";
    };

    const saveMatakuliah = (matakuliah: Matakuliah) => {
        const data: Matakuliah = {
            fakultasId: matakuliah.fakultasId,
            name: matakuliah.name,
            sks: matakuliah.sks,
        };
        useApi
            .post("/admin/matakuliah", data)
            .then((response) => {
                event.emit("matakuliahSaved", response.data.msg);
                clearForm(matakuliah);
            })
            .catch((errors) => console.log(errors));
    };

    const showMatakuliah = (id: number) => {
        useApi
            .get<ApiResponse<Matakuliah>>(`/admin/matakuliah/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedMatakuliah.value = response.data.data;
                modal.heading = "Detail Matakuliah";
                modal.content = "matakuliah-show";
                modal.event = "editMatakuliah";
            })
            .catch((errors) => console.log(errors));
    };

    const editMatakuliah = (matakuliah: Matakuliah) => {
        useApi
            .post("/admin/staff/edit", {
                id: matakuliah.id,
                fakultasId: matakuliah.fakultasId,
                name: matakuliah.name,
                sks: matakuliah.sks,
            } as Matakuliah)
            .then((response) => {
                event.emit("matakuliahEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteMatakuliah = (matakuliahId: number) => {
        useApi.post(`/admin/matakuliah/delete`, { id: matakuliahId }).then((response) => {
            event.emit("matakuliahDeleted");
        });
    };
    return {
        allMatakuliah,
        selectedMatakuliah,
        loadMatakuliah,
        createMatakuliah,
        saveMatakuliah,
        showMatakuliah,
        editMatakuliah,
        deleteMatakuliah,
        modal,
    };
};
