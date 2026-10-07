export interface Guest {
    id: string;

    name: string;
    nationality: string;
    phone: string;
    email: string;
    idType: string;
}

export interface GuestInput {
    name: string;
    nationality: string;
    phone: string;
    email: string;
    idType: string;
}

export type GuestUpdate = Partial<GuestInput>;