export interface InfoRow {
  label: string;
  value: string | number;
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

// Applicable item added to an offer
export interface ApplicableOfferItem {
  id: string;
  productId: string;
  itemName: string;
  category: string;
  minQtyOrder: number;
  cashBackPercent: number;
  cashBackAmount: number;
}
// author: shrajja

export interface ApplicationItemOption {
  id: string;
  name: string;
}
// Only OfferType is changed
export type OfferType = {
  id: number;
  name: string;
  code?: string;
  leftInfo?: InfoRow[];
  rightInfo?: InfoRow[];
  usageLimits?: InfoRow[];
  applicableItems?: ApplicableOfferItem[];
};

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
