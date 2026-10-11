export interface FolioItem {
    id: string;
    reservationId: string;

    date: string;
    description: string;

    charge: number;
    credit: number;
}

export interface FolioItemInput {
    date: string;
    description: string;

    charge: number;
    credit: number;
}

export type FolioItemUpdate = Partial<FolioItemInput>;