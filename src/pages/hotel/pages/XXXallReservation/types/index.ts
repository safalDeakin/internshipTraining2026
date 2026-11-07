export type TabKey =
  | 'customer'
  | 'folio'
  | 'room'
  | 'notes'
  | 'stay'
  | 'payments'
  | 'complaint';

export type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Complaint {
  id: string;
  complaintNumber: string;
  referenceTo: string;
  guestReference: string;
  expectedResolved: string;
  reportedAt: string;
  reportedBy: string;
  receivedBy: string;
  category: string;
  type: string;
  status: ComplaintStatus;
  assignedDepartment: string;
  assignedTo: string;
  assignmentDescription: string;
  description: string;
  statusDescription: string;
  attachments: string[];
}

export interface GuestInfo {
  name: string;
  title: string
  nationality: string;
  phone: string;
  email: string;
  idType: string;
  address: string;
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
  paymentMethod: string
  nights: number;
  taxAndFee: number;
  discount: number;
  totalAmount: number;
  advancePaid: number;
  outstandingBalance: number;
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
  complaints: Complaint[];
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
