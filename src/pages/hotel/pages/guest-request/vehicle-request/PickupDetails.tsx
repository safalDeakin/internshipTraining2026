import { ChevronDown, MessageCircle, Pencil, User } from "lucide-react";

import type { GuestRequest } from "../../../../../domain/GuestRequest";
import Container from "../../../../../lib/component/Container/Container";
import ReusableButton from "../../../../../shell/shared/components/ReusableButton";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import { DetailItem } from "../components/DetailItem";
import PickupStatusModal from "../../../dropdown/modal/PickupStatusModal";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import { useGuestRequestTask } from "../provider/GuestRequestTaskProvider";

interface PickupDetailsProps {
  request: GuestRequest;
}

export default function PickupDetails({ request }: PickupDetailsProps) {
  const handleEdit = () => {
    console.log("Edit pickup request:", request.id);
  };
  const { showDialog, closeDialog } = useDialogBox();

  const { getTaskDetails, updateTaskDetails } = useGuestRequestTask();
  const taskDetails = getTaskDetails(request.id);
  const currentStatus = taskDetails.status;

  const handleStatusClick = () => {
    showDialog({
      title: "Pick up status",
      showHeader: true,
      // width: "600px",
      closeOnBackdrop: false,
      closeOnEscape: true,
      content: (
        <PickupStatusModal
          onClose={() => closeDialog()}
          onUpdate={(values) => {
            updateTaskDetails(request.id, {
              ...taskDetails,
              status: values.status,
              completionNote: values.remark,
            });

            console.log("Updated pickup status:", values);
          }}
        />
      ),
    });
  };

  return (
    <div className="w-full ">
      {/* PICKUP TOOLBAR */}
      <Toolbar
        left={
          <div className="flex font-bold">
            <User size={18} />
            <h2 className="text-sm">
              {request.guestName}-{" "}
              <span className="">Pick-up: {request.reservation}</span>
            </h2>
          </div>
        }
        right={
          <>
            <ReusableButton variant="secondary" size="sm" onClick={handleEdit}>
              <MessageCircle size={14} />
              Msg to WhatsApp
            </ReusableButton>
            <ReusableButton
              variant="outline"
              size="sm"
              onClick={handleStatusClick}
            >
              pickuo status
            </ReusableButton>
            <p>
              {" "}
              {currentStatus === "Completed"
                ? "Completed"
                : currentStatus === "Assigned"
                  ? "Assigned"
                  : "Pending"}
            </p>
          </>
        }
      />

      {/* PICKUP DETAILS */}
      <Container type="box" background="surface-default">
        <section className="w-full min-w-0 ">
          {/* PARTICULARS AND SERVICE INFORMATION */}
          <div className="grid grid-cols-1 gap-4 rounded-lg bg-rose-50 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-bold">Particulars</h3>

              <dl>
                <DetailItem
                  label="Guest Name"
                  value={request.guestName}
                  strong
                />
                <DetailItem
                  label="Reservation No"
                  value={request.reservation}
                />
                <DetailItem label="Room No" value={request.room} />
                <DetailItem
                  label="Contact Number"
                  value={request.contactNumber}
                />
              </dl>
            </div>

            <div className="lg:border-l lg:border-rose-100 lg:pl-5">
              <h3 className="mb-2 text-xs font-bold">Service Information</h3>

              <dl>
                <DetailItem label="Pick Up Type" value={request.pickupType} />
                <DetailItem label="Destination" value={request.destination} />
                <DetailItem
                  label="Pick up Date"
                  value={request.requestedDate}
                />
                <DetailItem
                  label="Pick up Time"
                  value={request.requestedTime}
                />
              </dl>
            </div>
          </div>

          {/* ADDITIONAL INFORMATION */}
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-bold">Additional Information</h3>

            <dl className="max-w-lg">
              <DetailItem label="Nationality" value={request.nationality} />
              <DetailItem label="Flight No" value={request.flightNo} />
              <DetailItem
                label="Passport Number"
                value={request.passportNumber}
              />
            </dl>
          </div>

          {/* ASSIGNED AND COMPLETION */}
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-bold">
              Assigned & Completion Detail
            </h3>

            <dl className="max-w-lg">
              <DetailItem label="Assigned To" value={request.assignedTo} />
              <DetailItem label="Completed By" value={request.completedBy} />
              <DetailItem label="Completed At" value={request.completedAt} />
            </dl>
          </div>

          {/* ADDITIONAL REQUEST */}
          <div className="mt-4">
            <h3 className="mb-1 text-sm font-bold">Additional Request</h3>
            <p className="text-sm text-slate-700">
              {request.additionalRequest || "-"}
            </p>
          </div>

          {/* NOTE */}
          <div className="mt-4">
            <h3 className="mb-1 text-sm font-bold">Note</h3>
            <p className="text-sm text-slate-700">{request.note || "-"}</p>
          </div>
        </section>
      </Container>
    </div>
  );
}
