import { Employee } from "./employee";
import { Fakultas } from "./fakultas";

export type Dekan = {
    fakultasId?: Fakultas["id"] | string;
    fakultas?: Fakultas;
} & Employee;

export type DekanEvent = {
    saveDekan?: string;
    dekanSaved?: string;
    editDekan?: string;
    dekanEdited?: string;
    deleteDekan?: string;
    dekanDeleted?: string;
    emptyEvent: never;
};
