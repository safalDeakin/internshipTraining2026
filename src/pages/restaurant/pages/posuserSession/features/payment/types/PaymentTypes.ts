import type { PaymentMethod } from "../../../shared/components/reuse/PaymentMethodFields";

export interface PaymentLayoutProps {
  onTrackClick: () => void;
}

//
export interface PaymentCard {
  id?: number;
  image?: string;
  name?: string;
  email?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
}
export interface PaymentCardsProps {
  id?: number;
  image?: string;
  name?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

export interface PaymentFormProps {
  customer: PaymentCard;
  onCancel: () => void;
}
interface PaymentData {
  customer: PaymentCard;
  total: number;
  paymentMethod: PaymentMethod;
  receivedAmount: number;
  vatAmount: number;
  serviceCharge: number;
  grandTotal: number;
}

export interface PaymentReceiptProps {
  customer: PaymentCard;
  total: number;
  paymentMethod: string;
  receivedAmount: number;
  vatAmount?: number;
  serviceCharge?: number;
  grandTotal: number;
  receivedBy?: string;
  onClose: () => void;
  onDownloadPDF?: () => void;
}
