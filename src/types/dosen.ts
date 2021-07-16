import { Employee } from "./employee";
import { Fakultas } from "./fakultas";
import { Matakuliah } from "./matakuliah";

export type Dosen = {
    fakultasId?: Fakultas["id"] | string;
    fakultas?: Fakultas;
    matakuliahId: Matakuliah["id"];
} & Employee;

export type DosenEvent = {
    saveDosen?: string;
    dosenSaved?: string;
    editDosen?: string;
    dosenEdited?: string;
    deleteDosen?: string;
    dosenDeleted?: string;
    emptyEvent: never;
};
