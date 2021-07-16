import { Employee } from "./employee";
import { Fakultas } from "./fakultas";

export type Staff = {
    fakultasId?: Fakultas["id"] | string;
    fakultas?: Fakultas;
} & Employee;

export type StaffEvent = {
    saveStaff?: string;
    staffSaved?: string;
    editStaff?: string;
    staffEdited?: string;
    deleteStaff?: string;
    staffDeleted?: string;
    emptyEvent: never;
};
