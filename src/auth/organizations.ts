export type Organization = {
  id: number;
  name: string;
  slug: string;
};

export const organizations: Organization[] = [
  {
    id: 1,
    name: "Hotel Everest",
    slug: "hotel-everest",
  },
  {
    id: 2,
    name: "Hotel Annapurna",
    slug: "hotel-annapurna",
  },
];
