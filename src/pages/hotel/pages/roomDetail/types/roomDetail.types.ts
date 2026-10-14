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

export type Product = {
    id: string;
    name: string;
    subtitle: string;
    detail: string;
    date?: string;
    status?: string;
};

export type RoomDetailData = {
    name: string;
    code: string;
    description: string;
    baseOccupancy: number;
    maxOccupancy: number;
    products: Product[];
    amenities: Amenity[];
    rooms: Room[];
    createdBy: string;
    createdAt: string;
};

export type ProductDetail = Omit<RoomDetailData, "products">;