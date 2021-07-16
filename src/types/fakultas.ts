import { Dekan } from "./dekan";

export type Fakultas = {
    id?: number;
    name: string;
    description: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    dekan?: Dekan;
};

export type FakultasEvent = {
    saveFakultas?: string;
    fakultasSaved?: string;
    editFakultas?: string;
    fakultasEdited?: string;
    deleteFakultas?: string;
    fakultasDeleted?: string;
    emptyEvent: never;
};
