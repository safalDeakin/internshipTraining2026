import { Edit, Download, Printer, Bed, Trash } from "lucide-react";

import PrintReservationForm from "./ReservationForm";
import PdfPreviewWrapper from "../../../../../lib/utils/printer/PreviewWrapper";
import { Invoice } from "../../../../recepits/Invoice";
import { useReservationDetail } from "../provider/detailProvider/useReservationDetail";

import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Button from "../../../../../lib/component/Button/Button";

import RequestRoomService from "./forms/RequestRoomService";
import ChangeRoomModal from "./forms/ChangeRoomModal";
import CancelReservationModal from "./forms/CancelReservationModal";
import RegisterService from "./forms/RegisterService";
import AddChargeModal from "./forms/AddChargeModal";
import AddVehicleChargeModal from "../../../dropdown/modal/AddVehicleChargeModal";

import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

export default function ReservationToolbar() {
  const reservation = useReservationDetail();

  const { showDialog, closeDialog } = useDialogBox();

  const info = reservation.info;
  const isCancelled = info.status === "Cancelled";

  // Room Service
  const handleRoomService = async () => {
    await showDialog({
      title: "Request Room Service",
      showHeader: true,
      width: 600,
      content: <RequestRoomService onClose={closeDialog} />,
    });
  };

  // Change Room
  const handleChangeRoom = async () => {
    await showDialog({
      title: "Change Room",
      showHeader: true,
      width: 600,
      content: (
        <ChangeRoomModal
          reservation={
            reservation as unknown as Parameters<
              typeof ChangeRoomModal
            >[0]["reservation"]
          }
          onClose={closeDialog}
        />
      ),
    });
  };

  // Cancel Reservation
  const handleCancelReservation = async () => {
    await showDialog({
      title: "Cancel Reservation",
      showHeader: true,
      width: 600,
      content: (
        <CancelReservationModal
          reservationNumber={reservation.id}
          onClose={closeDialog}
        />
      ),
    });
  };

  // Register Service
  const handleRegisterService = async () => {
    await showDialog({
      title: "Register Service",
      showHeader: true,
      width: 600,
      content: <RegisterService onClose={closeDialog} />,
    });
  };

  // General Add Charge
  const handleAddCharge = async () => {
    await showDialog({
      title: "Add Charge",
      showHeader: true,
      width: 600,
      content: <AddChargeModal onClose={closeDialog} />,
    });
  };

  // Vehicle Charge
  const handleAddVehicleCharge = async () => {
    await showDialog({
      title: "Vehicle Charge",
      showHeader: true,
      width: 600,
      content: (
        <AddVehicleChargeModal
          onSubmit={(values) => {
            try {
              const vehicleChargeData = JSON.parse(values);

              console.log("Vehicle Charge:", vehicleChargeData);

              closeDialog();
            } catch (error) {
              console.error("Invalid vehicle charge data:", error);
            }
          }}
        />
      ),
    });
  };

  return (
    <Toolbar
      left={
        <>
          <Bed className="h-5 w-5 text-blue-600" />

          <span className="text-base font-semibold text-gray-800">
            {info.reservationCode}
          </span>

          <span className="text-sm text-gray-500">({info.id})</span>

          <span
            className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${
              info.status === "Active" ? "bg-teal-600" : "bg-gray-400"
            }`}
          >
            {info.status}
          </span>

          <span
            className={`h-2 w-2 rounded-full ${
              isCancelled ? "bg-red-400" : "bg-green-400"
            }`}
          />
        </>
      }
      center={
        <>
          {/* Room Service */}
          <Button variant="primary" onClick={handleRoomService}>
            <Edit className="h-3.5 w-3.5" />
            Room Service
          </Button>

          {/* Register Service */}
          <Button variant="primary" onClick={handleRegisterService}>
            <Edit className="h-3.5 w-3.5" />
            Register Service
          </Button>

          {/* Invoice */}
          <PdfPreviewWrapper
            documentName="ReservationForm"
            openInNewTab={false}
            content={<Invoice data={reservation.getInvoice()} />}
          >
            <Button variant="outline">
              <Edit className="h-3.5 w-3.5" />
              Invoice
            </Button>
          </PdfPreviewWrapper>

          {/* Swap Room */}
          <Button variant="outline" onClick={handleChangeRoom}>
            <Edit className="h-3.5 w-3.5" />
            Swap Room
          </Button>

          {/* General Add Charge */}
          <Button variant="outline" onClick={handleAddCharge}>
            <Edit className="h-3.5 w-3.5" />
            Add Charge
          </Button>

          {/* Vehicle Charge */}
          <Button variant="outline" onClick={handleAddVehicleCharge}>
            <Bed className="h-3.5 w-3.5" />
            Vehicle Charge
          </Button>

          {/* Download */}
          <Button
            variant="outline"
            onClick={() => {
              console.log("Download Reservation clicked");
            }}
          >
            <Download size={13} />
          </Button>

          {/* Print Reservation */}
          <PdfPreviewWrapper
            documentName="ReservationForm"
            openInNewTab={true}
            content={
              <PrintReservationForm
                data={reservation.getReservationPdfForm()}
              />
            }
          >
            <Button variant="outline">
              <Printer size={13} />
            </Button>
          </PdfPreviewWrapper>

          {/* Cancel Reservation */}
          <Button
            variant={isCancelled ? "ghost" : "danger"}
            onClick={handleCancelReservation}
          >
            <Trash className="h-3.5 w-3.5" />
          </Button>
        </>
      }
    />
  );
}
