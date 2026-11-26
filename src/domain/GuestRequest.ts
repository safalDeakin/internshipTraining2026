export type BillItem = {
  id: number;
  service: string;
  quantity: number;
  reference: string;
  amount: number;
};

export type GuestRequestType = "room-setup" | "pick-up";

export type GuestRequest = {
  // Common information
  id: string;
  title: string;
  requestType: GuestRequestType;
  reservation: string;
  room: string;
  guestName: string;
  stay: string;

  // Room Setup / Service Information
  serviceType: string;
  quantity: string;
  requestedDate: string;
  requestedTime: string;
  expectedTime: string;

  // Pickup-specific information
  contactNumber?: string;
  pickupType?: string;
  destination?: string;
  nationality?: string;
  flightNo?: string;
  passportNumber?: string;
  additionalRequest?: string;

  // Assignment and Completion
  assignedTo: string;
  completedBy: string;
  completedAt: string;
  completionNote: string;
  // Other information
  note: string;
  status: "Assigned Task" | "Completed";
  billItems: BillItem[];
};
