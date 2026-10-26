export type TabKey = 'customer' | 'folio' | 'room' | 'notes' | 'stay' | 'payments';

export interface GuestInfo {
  name: string;
  nationality: string;
  phone: string;
  email: string;
  idType: string;

  title?: string;
  address?: string;
  idNumber?: string;
}

export interface RoomInfo {
  number: string;
  type: string;
  floor: string;
  bedType: string;
  smoking: string;
  occupancy: string;
}

export interface PaymentSummary {
  roomCharge: number;
  nights: number;
  taxAndFee: number;
  discount: number;
  totalAmount: number;
  advancePaid: number;
  outstandingBalance: number;

  paymentMethod?: "Cash" | "Credit" | "Bank Transfer";
}

export interface Reservation {
  id: string;
  roomCode: string;
  reservationNumber: string;
  bookingDate: string;
  reservationStatus: string;
  source: string;
  ratePlan: string;
  adults: number;
  children: number;
  expectedArrival: string;
  checkInTime: string;
  status: 'active' | 'pending' | 'checked-out';
  guest: GuestInfo;
  room: RoomInfo;
  payment: PaymentSummary;
  notes: string;
  folioItems: FolioItem[];
}

export interface FolioItem {
  id: string;
  date: string;
  description: string;
  charge: number;
  credit: number;
}

export interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: string;
  label: string;
  count?: number;
  icon: string;
}

export interface ReservationListItem {
  id: string;
  guestName: string;
  code: string;
  time?: string;
  isSelected: boolean;
  subItems?: string[];
}



export interface PrintReservationFormData {
  date: string;
  reservationNo: string;

  title: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  emailAddress: string;
  idType: string;
  idNumber: string;

  arrivalDate: string;
  departureDate: string;
  noOfNight: number;
  noOfAdult: number;
  noOfChildren: number;

  ratePlan: string;
  ratePerRoom: number;
  currency: string;
  totalEstimateAmount: number;

  paymentGuarantee: string;

  agreementName: string;
  signature: string;
}