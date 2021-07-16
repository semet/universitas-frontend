import { Employee } from "./employee";

export type AdminMenuPaths =
    | "home"
    | "dekan"
    | "fakultas"
    | "staff"
    | "matakuliah"
    | "dosen"
    | "mahasiswa";

export type Admin = Employee;

export type AdminEvent = {
    saveAdmin?: string;
    AdminSaved?: string;
    editAdmin?: string;
    AdminEdited?: string;
    deleteAdmin?: string;
    AdminDeleted?: string;
};
