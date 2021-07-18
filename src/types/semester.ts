import { Tahun } from "./tahun";

export type Semester = {
    id?: number;
    tahunId?: number;
    tahun?: Tahun;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    description?: string;
    active: boolean;
};

export type SemesterEvent = {
    saveSemester?: string;
    semesterSaved?: string;
    editSemester?: string;
    semesterEdited?: string;
    deleteSemester?: string;
    semesterDeleted?: string;
    semesterToggled?: string;
    emptyEvent: never;
};
