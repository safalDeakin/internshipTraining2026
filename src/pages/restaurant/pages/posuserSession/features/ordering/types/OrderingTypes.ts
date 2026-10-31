import type { ORDER_FILTERS } from "../constant/OrderData";

//1:Ordering
export interface OrderingLayoutProps {
  onTrackClick: () => void;
}
// Types for menu items for ordering pages
export type FoodItem = {
  id: number;
  image?: string;
  label: string;
  date: string;
  status?: string;
  type: "food" | "beverage" | "extra";
};
///filter of top of page
export type Orderfilter = (typeof ORDER_FILTERS)[number];

////properties this accepts
export interface FoodCardProps {
  image?: string;
  label: string;
  date: string;
  status?: string;
  isSelected?: boolean; //Whether the card is selected
  onClick?: () => void; //Function to execute when clicked
}

// Order item type
export type OrderLine = FoodItem & {
  qty: number;
};

// Order form props
export interface OrderFormProps {
  orderedItems: OrderLine[];
  kotItems: OrderLine[];
  botItems: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}

// Order section props
export interface OrderSectionProps {
  title: "KOT" | "BOT";
  items: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

//receipt
export interface ReceiptItem {
  id: number;
  label: string;
  qty: number;
  remarks?: string;
}

export interface OrderReceiptProps {
  restaurantName: string;
  address: string;
  restaurantPhone: string;
  orderNo: string;
  date: string;
  customerName: string;
  phone: string;
  location: string;
  kotItems: ReceiptItem[];
  botItems: ReceiptItem[];
  onDownloadPDF?: () => void;
}
