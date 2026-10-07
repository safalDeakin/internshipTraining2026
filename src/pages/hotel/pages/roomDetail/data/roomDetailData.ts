import type {
    Product,
    ProductDetail,
} from "../types/roomDetail.types";

export const productOptions: Product[] = [
    {
        id: "deluxe",
        name: "Deluxe Room Type",
        subtitle: "Pkg also",
        detail: "2 Options available",
        status: "N/A",
    },
    {
        id: "twin",
        name: "Twin Room Type",
        subtitle: "Annapurna Office",
        detail: "Site 22",
        date: "1/01-30/01",
        status: "Available",
    },
];

export const productDetails: Record<string, ProductDetail> = {
    deluxe: {
        name: "Deluxe Room",
        code: "DLXR",
        description:
            "This Delux room is very spacious and well-furnished, providing a comfortable stay for guests. It features modern amenities and a cozy ambiance.",
        baseOccupancy: 2,
        maxOccupancy: 3,

        amenities: [
            {
                id: "tv",
                label: "TV",
                icon: "tv",
            },
            {
                id: "air",
                label: "Air Conditioning",
                icon: "air",
            },
            {
                id: "bath",
                label: "BathTub",
                icon: "bath",
            },
        ],

        rooms: [
            {
                id: "r01",
                name: "R01",
                floor: 3,
                bedType: "1xKing + 1xSingle",
                maxOccupancy: 3,
                extraAmenities: "TV, Fridge",
            },
            {
                id: "r02",
                name: "R02",
                floor: 2,
                bedType: "1x King",
                maxOccupancy: 2,
                extraAmenities: "Bath-Tub, Balcony",
            },
        ],

        createdBy: "Utsha Shrestha",
        createdAt: "2023/02/12 14:06:30",
    },

    twin: {
        name: "Twin Room",
        code: "TWNR",
        description:
            "A comfortable twin room at Annapurna Office with two separate beds, suitable for colleagues or individual travelers.",
        baseOccupancy: 2,
        maxOccupancy: 2,

        amenities: [
            {
                id: "tv",
                label: "TV",
                icon: "tv",
            },
            {
                id: "air",
                label: "Air Conditioning",
                icon: "air",
            },
        ],

        rooms: [
            {
                id: "t01",
                name: "T01",
                floor: 2,
                bedType: "2x Single",
                maxOccupancy: 2,
                extraAmenities: "TV, Work Desk",
            },
            {
                id: "t02",
                name: "T02",
                floor: 2,
                bedType: "2x Single",
                maxOccupancy: 2,
                extraAmenities: "Balcony, Wardrobe",
            },
        ],

        createdBy: "Utsha Shrestha",
        createdAt: "2023/02/14 10:30:00",
    },
};