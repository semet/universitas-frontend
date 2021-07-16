export type Employee = {
    id?: number;
    employeeNumber: string;
    username: string;
    name: string;
    email: string;
    password?: string;
    active?: boolean;
    lastLogin?: string | Date;
};
