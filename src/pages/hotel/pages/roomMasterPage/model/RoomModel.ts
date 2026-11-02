export type Amenity = {
    id: string;
    label: string;
    icon: "tv" | "air" | "bath";
};

export type Room = {
    id: string;
    name: string;
    floor: number;
    bedType: string;
    maxOccupancy: number;
    extraAmenities: string;
};

export type RoomTypes = {
    id: string;
    name: string;
    subtitle: string;
    detail: string;
    date?: string;
    status?: string;
};

export type RoomDetailModel = {
    name: string;
    code: string;
    description: string;
    baseOccupancy: number;
    maxOccupancy: number;
    amenities: Amenity[];
    rooms: Room[];
    createdBy: string;
    createdAt: string;
};

export type ProductDetail = Omit<RoomDetailModel, "products">;