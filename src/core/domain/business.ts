export interface BusinessDay {
    label: string;
    isWeekend: boolean;
}

export interface BusinessInfo {
    id: string;

    name: string;
    address: string;

    fiscalYear: string;
    openingTime: string;

    days: BusinessDay[];
}