export interface InfoRow {
  label: string;
  value: string | number;
}

export interface ApplicableOfferItem {
  id: number;
  itemName: string;
  category: string;
  minQtyOrder: number;
  cashBackPercent: number;
  cashBackAmount: number;
}

export interface OfferType {
  id: number;
  name: string;
  code: string;

  // Offer Information
  leftInfo: InfoRow[];
  rightInfo: InfoRow[];

  // Usage Limit
  usageLimits: InfoRow[];

  // Applicable Items
  applicableItems: ApplicableOfferItem[];
}

export interface Stat {
  label: string;
  value: string | number;
}

export interface Shortcut {
  label: string;
  color: string; // tailwind bg class for the accent bar
  onClick?: () => void;
}

export interface OfferDetailsProps {
  title: string;
  code: string;
  leftInfo: InfoRow[];
  rightInfo: InfoRow[];
  posShifts: Stat[][]; // two columns
  sales: Stat[][]; // two columns
  shortcuts: Shortcut[];
  usageLimits: InfoRow[];
  onExportCsv?: () => void;
  onDownloadPdf?: () => void;
  onEdit?: () => void;
}

// _______________________________________

export type PricelistItem = {
  id: number;
  name: string;
  variant: string;
  code: string;
  type: string;
  price: string;
};

export type PricelistType = {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  tax?: string;
  status?: "Active" | "Inactive";
  items?: PricelistItem[];
};

//_________________________
export type ProductItem = {
  id: string;
  name: string;
  sku: string;
  description: string;
  calories: string;
  image: string;
};
export type ProductType = {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Inactive";
  items: ProductItem[];
  attributes: string[][];
  tags: string[];
};
