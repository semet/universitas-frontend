export type Tahun = {
    name: string;
    startDate: Date;
    endDate: Date;
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
    emptyEvent: never;
};
