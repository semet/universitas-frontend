import { inject, reactive, ref } from "vue";
import $ from "jquery";
import { Staff, StaffEvent } from "@/types/staff";
import { Emitter } from "mitt";
import { ModalProps } from "@/types/modalProps";
import { useApi } from "@/hooks/useApi";
import { clearForm } from "@/helpers/formHelper";

export const useStaff = () => {
    const event = inject("eventBus") as Emitter<StaffEvent>;
    const allStaffs = ref();
    const selectedStaff = ref();
    const modal = reactive<ModalProps<StaffEvent>>({
        heading: "modal-heading",
        content: "modal-content",
        event: "emptyEvent",
    });

    const loadStaff = async () => {
        useApi
            .get<ApiResponse<Staff>>("/admin/staff")
            .then((response) => {
                allStaffs.value = response.data.data;
            })
            .catch((errors) => console.log(errors));
    };

    const createStaff = () => {
        modal.heading = "Entry Data Staff";
        modal.content = "staff-create";
        modal.event = "saveStaff";
    };

    const saveStaff = (staff: Staff) => {
        const data: Staff = {
            fakultasId: staff.fakultasId,
            employeeNumber: staff.employeeNumber,
            username: staff.username,
            name: staff.name,
            email: staff.email,
            active: staff.active,
        };
        useApi
            .post("/admin/staff", data)
            .then((response) => {
                event.emit("staffSaved", response.data.msg);
                clearForm(staff);
            })
            .catch((errors) => console.log(errors));
    };

    const showStaff = (id: number) => {
        useApi
            .get<ApiResponse<Staff>>(`/admin/staff/${id}`)
            .then((response) => {
                $("#myModal").modal("show");
                selectedStaff.value = response.data.data;
                modal.heading = "Profil Staff";
                modal.content = "staff-show";
                modal.event = "editStaff";
            })
            .catch((errors) => console.log(errors));
    };

    const editStaff = (staff: Staff) => {
        useApi
            .post("/admin/staff/edit", {
                id: staff.id,
                fakultasId: staff.fakultasId,
                name: staff.name,
                username: staff.username,
                email: staff.email,
                password: staff.password,
            } as Staff)
            .then((response) => {
                event.emit("staffEdited", response.data.msg);
            })
            .catch((errors) => console.log(errors));
    };

    const deleteStaff = (staffId: number) => {
        useApi.post(`/admin/staff/delete`, { id: staffId }).then((response) => {
            event.emit("staffDeleted");
        });
    };
    return {
        allStaffs,
        selectedStaff,
        loadStaff,
        createStaff,
        saveStaff,
        showStaff,
        editStaff,
        deleteStaff,
        modal,
    };
};
