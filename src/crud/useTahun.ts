import { inject, nextTick, reactive, ref } from "vue";
import $ from "jquery";
import { Tahun, TahunEvent } from "@/types/tahun";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm, formatDate } from "@/helpers/formHelper";

export const useTahun = () => {
    const event = inject("eventBus") as Emitter<TahunEvent>;

    const modal = reactive<ModalProps<TahunEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const allTahun = ref();
    const loadTahuns = async () => {
        useApi
            .get<ApiResponse<Tahun>>("/admin/tahun")
            .then((response) => {
                allTahun.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createTahun = () => {
        modal.heading = "Entry Data Tahun";
        modal.content = "tahun-create";
        modal.event = "saveTahun";
    };

    const saveTahun = (tahun: Tahun) => {
        const data: Tahun = {
            name: tahun.name,
            startDate: tahun.startDate,
            endDate: tahun.endDate,
            description: tahun.description,
            active: tahun.active,
        };
        useApi
            .post("/admin/tahun", data)
            .then((response) => {
                event.emit("tahunSaved", response.data.msg);
                clearForm(tahun);
            })
            .catch((errors) => console.log(errors));
    };

    const selectedTahun = ref();
    const showTahun = (id: number) => {
        useApi
            .get<ApiResponse<Tahun>>(`/admin/tahun/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedTahun.value = response.data.data;
                modal.heading = "Profil Staff";
                modal.content = "tahun-show";
                modal.event = "editTahun";
            })
            .catch((errors) => console.log(errors));
    };

    const editTahun = (tahun: Tahun) => {
        useApi
            .post("/admin/tahun/edit", {
                name: tahun.name,
                startDate: tahun.startDate,
                endDate: tahun.endDate,
            } as Tahun)
            .then((response) => {
                event.emit("tahunEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteTahun = (tahunId: number) => {
        useApi.post(`/admin/tahun/delete`, { id: tahunId }).then((response) => {
            event.emit("tahunDeleted");
        });
    };

    const toggleActiveYear = (id: number) => {
        useApi
            .post("/admin/tahun/toggle", { tahunId: id })
            .then((response) => {
                // console.log(response.data.msg);
                // event.emit("tahunToggled", response.data.msg);
                if (response.status === 201) {
                    nextTick(() => loadTahuns());
                } else {
                    nextTick(() => loadTahuns());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        allTahun,
        selectedTahun,
        loadTahuns,
        createTahun,
        saveTahun,
        showTahun,
        editTahun,
        deleteTahun,
        formatDate,
        toggleActiveYear,
        modal,
    };
};
