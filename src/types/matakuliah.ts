import { Fakultas } from "./fakultas";

export type Matakuliah = {
    id?: number | string;
    fakultasId: Fakultas["id"];
    name: string;
    sks?: number | string;
    description?: string;
};

export type MatakuliahEvent = {
    saveMatakuliah?: string;
    matakuliahSaved?: string;
    editMatakuliah?: string;
    matakuliahEdited?: string;
    deleteMatakuliah?: string;
    matakuliahDeleted?: string;
    emptyEvent: never;
};
