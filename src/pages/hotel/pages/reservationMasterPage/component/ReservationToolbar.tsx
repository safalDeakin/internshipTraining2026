
import { Edit, Download, Printer, Bed } from "lucide-react";
import PrintReservationForm from "./ReservationForm";

import PdfPreviewWrapper from "../../../../../lib/utils/printer/PreviewWrapper";
import { Invoice } from "../../../../recepits/Invoice";
import { useReservationDetail } from "../provider/detailProvider/useReservationDetail";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Button from "../../../../../lib/component/Button/Button";
import { useState } from "react";
import RequestRoomService from "./forms/RequestRoomService";
import ChangeRoomModal from "./forms/ChangeRoomModal";
import CancelReservationModal from "./forms/CancelReservationModal";
import RegisterService from "./forms/RegisterService";
import AddChargeModal from "./forms/AddChargeModal";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";


export default function ReservationToolbar() {
    const reservation = useReservationDetail();

    const { showDialog } = useDialogBox();

    const [showRoomService, setShowRoomService] = useState(false);
    const [changeRoom, setChangeRoom] = useState(false);
    const [showCancelReservation, setShowCancelReservation] = useState(false);
    const [showRegisterService, setShowRegisterService] = useState(false);
    const [showAddCharge, setShowAddCharge] = useState(false);

    const info = reservation.info;

    const isCancelled = info.status === 'Cancelled';

    const handleRoomService = async () => {

        const result = await showDialog<boolean>({
            title: "Request Room Service",
            showHeader: true,
            width: 600,

            content: (
                <RequestRoomService onClose={() => setShowRoomService(false)} />

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };


    const handleChangeRoom = async () => {

        const result = await showDialog<boolean>({
            title: "Change Room",
            showHeader: true,
            width: 600,

            content: (
                <ChangeRoomModal
                    reservation={reservation as unknown as Parameters<typeof ChangeRoomModal>[0]["reservation"]}
                    onClose={() => setChangeRoom(false)}
                />

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };


    const handleCancelReservation = async () => {

        const result = await showDialog<boolean>({
            title: "Request Room Service",
            showHeader: true,
            width: 600,

            content: (
                <CancelReservationModal reservationNumber={reservation.id}
                    onClose={() => setShowCancelReservation(false)} />

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };

    const handleRegisterService = async () => {

        const result = await showDialog<boolean>({
            title: "Register Service",
            showHeader: true,
            width: 600,

            content: (
                <RegisterService
                    onClose={() => setShowRegisterService(false)}
                />

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };
    const handleAddCharge = async () => {

        const result = await showDialog<boolean>({
            title: "Request Room Service",
            showHeader: true,
            width: 600,

            content: (
                <AddChargeModal
                    onClose={() => setShowAddCharge(false)}
                />

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };


    return (

        <>

            <Toolbar
                left={
                    <>
                        <Bed className="h-5 w-5 text-blue-600" />
                        <span className="text-base font-semibold text-gray-800">{info.reservationCode}</span>
                        <span className="text-sm text-gray-500">({info.id})</span>

                        <span
                            className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${info.status === "Active" ? "bg-teal-600" : "bg-gray-400"
                                }`}
                        >
                            {info.status}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-400' : 'bg-green-400'}`} />
                    </>
                }
                center={
                    <>
                        <Button variant="danger" size="md"
                            // onClick={() => setShowRoomService(true)}
                            onClick={handleRoomService}
                        >
                            <Edit className="h-3.5 w-3.5" />
                            Room Service
                        </Button>


                        <PdfPreviewWrapper documentName="ReservationForm"
                            openInNewTab={false}
                            content={
                                <Invoice data={reservation.getInvoice()} />
                            }
                        >
                            <Button >
                                <Edit className="h-3.5 w-3.5" />
                                Invoice
                            </Button>
                        </PdfPreviewWrapper>


                        {/* FinalReceipts Popup */}
                        <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                            onClick={handleChangeRoom}
                        >
                            <Edit className="h-3.5 w-3.5" />
                            Swap Room
                        </button>

                        <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                            // onClick={() => setShowRegisterService(true)}
                            onClick={handleRegisterService}
                        >
                            <Edit className="h-3.5 w-3.5" />
                            Register Service
                        </button>

                        <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                            // onClick={() => setShowAddCharge(true)}
                            onClick={handleAddCharge}
                        >
                            <Edit className="h-3.5 w-3.5" />
                            Add Charge
                        </button>

                        <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                            onClick={() => {
                                console.log("Cancel Reservation clicked");
                            }}
                        >
                            <Download size={13} /> Export
                        </button>
                        <PdfPreviewWrapper documentName="ReservationForm"
                            openInNewTab={true}
                            content={
                                <PrintReservationForm
                                    data={
                                        reservation.getReservationPdfForm()}
                                />
                            }>
                            <Button >
                                <Printer size={13} />
                                Print
                            </Button>
                        </PdfPreviewWrapper>
                        <Button
                            variant={isCancelled ? "ghost" : "danger"}
                            onClick={handleCancelReservation}
                        >
                            <Edit className="h-3.5 w-3.5" />
                            Cancel
                        </Button>
                    </>
                }
            />
        </>
    );
}


