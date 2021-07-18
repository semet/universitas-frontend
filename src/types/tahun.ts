export type Tahun = {
    id?: number;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    description?: string;
    active?: boolean;
};

export type TahunEvent = {
    saveTahun?: string;
    tahunSaved?: string;
    editTahun?: string;
    tahunEdited?: string;
    deleteTahun?: string;
    tahunDeleted?: string;
    tahunToggled?: string;
    emptyEvent: never;
};
