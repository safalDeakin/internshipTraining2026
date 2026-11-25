import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";
import Scrollable from "../../../../lib/component/scrollable/Scrollable";

import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";

import BillingDetails from "./BillingDetails";
import AddGuestFolioModal from "../modal/AddGuestFolioModal";
import GuestFolioReceiptModal, {
  type GuestFolioReceiptData,
} from "../modal/GuestFolioReceiptModal";

export interface GuestFolio {
  id: number;
  folioNo: string;
  guestName: string;
  roomNo: string;
  roomType: string;
  checkIn: string;
  totalCharge: number;
  amountPaid: number;
  outstandingAmount: number;

  details: {
    description: string;
    amount: number;
  }[];

  paymentHistory: {
    date: string;
    method: string;
    amount: number;
  }[];
}

const initialFolios: GuestFolio[] = [
  {
    id: 1,
    folioNo: "00125",
    guestName: "Ram Sharma",
    roomNo: "R101",
    roomType: "Deluxe Room",
    checkIn: "16-18th Nov",
    totalCharge: 18500,
    amountPaid: 5000,
    outstandingAmount: 13500,
    details: [
      { description: "Room Charge", amount: 5000 },
      { description: "Restaurant", amount: 5000 },
      { description: "Room Service", amount: 5000 },
    ],
    paymentHistory: [{ date: "17th Nov", method: "Cash", amount: 5000 }],
  },
  {
    id: 2,
    folioNo: "00126",
    guestName: "Sita Sharma",
    roomNo: "R102",
    roomType: "Standard Room",
    checkIn: "17-19th Nov",
    totalCharge: 12000,
    amountPaid: 7000,
    outstandingAmount: 5000,
    details: [
      { description: "Room Charge", amount: 6000 },
      { description: "Restaurant", amount: 4000 },
      { description: "Room Service", amount: 2000 },
    ],
    paymentHistory: [{ date: "18th Nov", method: "Cash", amount: 7000 }],
  },
  {
    id: 3,
    folioNo: "00127",
    guestName: "Hari Gurung",
    roomNo: "R103",
    roomType: "Deluxe Room",
    checkIn: "18-20th Nov",
    totalCharge: 15000,
    amountPaid: 0,
    outstandingAmount: 15000,
    details: [
      { description: "Room Charge", amount: 8000 },
      { description: "Restaurant", amount: 4000 },
      { description: "Room Service", amount: 3000 },
    ],
    paymentHistory: [],
  },
];

const BillingLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [folios] = useState<GuestFolio[]>(initialFolios);

  const { showDialog, closeDialog } = useDialogBox();

  const filteredFolios = useMemo(() => {
    return folios.filter((folio) =>
      `${folio.guestName} ${folio.roomNo} ${folio.folioNo}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [folios, searchQuery]);

  // Open Add Guest Folio Modal
  const handleNewFolio = async () => {
    try {
      const result = await showDialog<string>({
        title: "Advance Deposit",
        showHeader: true,
        closeOnBackdrop: false,
        closeOnEscape: false,
        content: (
          <AddGuestFolioModal onSubmit={(values) => closeDialog(values)} />
        ),
      });

      if (!result) return;

      const values = JSON.parse(result);

      console.log("Submitted Advance Deposit:", values);

      // Temporary mock receipt data
      const receipt: GuestFolioReceiptData = {
        hotelName: "VIP Restaurant & Hotel",
        address: "Banepa-07, Kavre, Nepal",
        phone: "9800000000",

        receiptNo: "ADV-001",
        paymentDate: values.paymentDate,

        guestName: values.guestName,
        reservationNumber: "RES-001",
        roomNumber: "R101",
        checkInDate: "24 Nov 2026",
        checkOutDate: "26 Nov 2026",

        totalBookingAmount: 18500,
        currentAdvancePayment: Number(values.amountReceived),
        totalPaid: 5000 + Number(values.amountReceived),
        totalDue: 18500 - (5000 + Number(values.amountReceived)),

        amountInWords: "Five thousand rupees only",
        advanceReason: values.remark || "Advance booking payment",
        receivedBy: "Admin",
      };

      // Open Receipt Modal
      await showDialog({
        title: "Advance Receipt",
        showHeader: false,
        closeOnBackdrop: false,
        closeOnEscape: false,
        content: (
          <GuestFolioReceiptModal
            receipt={receipt}
            onClose={() => closeDialog()}
          />
        ),
      });
    } catch (error) {
      console.error("Unable to generate receipt:", error);
    }
  };

  const handleReceivePayment = (folio: GuestFolio) => {
    console.log("Receive payment for:", folio);
  };

  const handleExportCSV = (folio: GuestFolio) => {
    console.log("Export CSV:", folio);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <MasterDetailView<GuestFolio, number>
      title="All Guest Folio"
      items={filteredFolios}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      getId={(folio) => folio.id}
      headerChildren={
        <ReusableButton variant="outline" size="sm" onClick={handleNewFolio}>
          <Plus size={15} />
        </ReusableButton>
      }
      listItemBuilder={(folio) => (
        <div className="w-full min-w-0 space-y-1 text-left">
          <p className="truncate text-sm font-semibold text-gray-800">
            {folio.guestName}
          </p>

          <p className="text-xs text-gray-500">Room {folio.roomNo}</p>

          <p className="text-xs text-gray-600">
            Rs. {folio.totalCharge.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-gray-500">Outstanding Balance</p>
        </div>
      )}
      detailContentBuilder={(selectedId) => {
        const selectedFolio = folios.find((folio) => folio.id === selectedId);

        if (!selectedFolio) return null;

        return (
          <Scrollable direction="y">
            <BillingDetails
              folio={selectedFolio}
              onReceivePayment={() => handleReceivePayment(selectedFolio)}
              onExportCSV={() => handleExportCSV(selectedFolio)}
              onPrintPDF={handlePrintPDF}
            />
          </Scrollable>
        );
      }}
    />
  );
};

export default BillingLayout;
