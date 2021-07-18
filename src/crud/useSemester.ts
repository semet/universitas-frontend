import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { Semester, SemesterEvent } from "@/types/semester";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm, formatDate } from "@/helpers/formHelper";

export const useSemester = () => {
    const event = inject("eventBus") as Emitter<SemesterEvent>;

    const modal = reactive<ModalProps<SemesterEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const allSemesters = ref();

    const loadSemester = async () => {
        useApi
            .get<ApiResponse<Semester>>("/admin/semester")
            .then((response) => {
                allSemesters.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createSemester = () => {
        modal.heading = "Entry Data Semester";
        modal.content = "semester-create";
        modal.event = "saveSemester";
    };

    const saveSemester = (semester: Semester) => {
        const data: Semester = {
            tahunId: semester.tahunId,
            name: semester.name,
            startDate: semester.startDate,
            endDate: semester.endDate,
            description: semester.description,
            active: semester.active,
        };
        useApi
            .post("/admin/semester", data)
            .then((response) => {
                event.emit("semesterSaved", response.data.msg);
                clearForm(semester);
            })
            .catch((errors) => console.log(errors));
    };

    const selectedSemester = ref();
    const showSemester = (id: number) => {
        useApi
            .get<ApiResponse<Semester>>(`/admin/semester/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedSemester.value = response.data.data;
                modal.heading = "Detail Semester";
                modal.content = "semester-show";
                modal.event = "editSemester";
            })
            .catch((errors) => console.log(errors));
    };

    const editSemester = (semester: Semester) => {
        useApi
            .post("/admin/semester/edit", {
                name: semester.name,
                startDate: semester.startDate,
                endDate: semester.endDate,
                description: semester.startDate,
                active: semester.active,
            } as Semester)
            .then((response) => {
                event.emit("semesterEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteSemester = (semesterId: number) => {
        useApi.post(`/admin/semester/delete`, { id: semesterId }).then((response) => {
            event.emit("semesterDeleted");
        });
    };

    const toggleActiveSemester = () => {};

    return {
        allSemesters,
        loadSemester,
        createSemester,
        saveSemester,
        selectedSemester,
        showSemester,
        editSemester,
        deleteSemester,
        toggleActiveSemester,
        formatDate,
        modal,
        event,
    };
};
