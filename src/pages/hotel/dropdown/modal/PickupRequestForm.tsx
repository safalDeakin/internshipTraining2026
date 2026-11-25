import { useState } from "react";
import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface PickupDropOffRequestFormProps {
  onClose: () => void;
}

interface ReservationDetails {
  reservation: string;
  guestName: string;
  room: string;
  roomType: string;
  requestedFor: string;
}

type TripType = "Pick Up" | "Drop Off";

// Reusable read-only detail row
const DetailRow = ({ title, value }: { title: string; value: string }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm font-medium text-gray-600">{title}</span>
    <span className="text-sm font-semibold text-gray-800 text-right">
      {value || "-"}
    </span>
  </div>
);

export default function PickupRequestForm({
  onClose,
}: PickupDropOffRequestFormProps) {
  const [tripType, setTripType] = useState<TripType | "">("");

  // Reservation details
  const reservationDetails: ReservationDetails = {
    reservation: "RES-001",
    guestName: "John Smith",
    room: "101",
    roomType: "Deluxe",
    requestedFor: "2026-11-20",
  };

  // Common fields used in both Pick Up and Drop Off
  const commonFields = [
    {
      type: "text" as const,
      label: "Contact",
      code: "contact",
      placeholder: "Enter contact number",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Driver",
      code: "driver",
      placeholder: "Enter driver name",
    },
    {
      type: "textArea" as const,
      label: "Special Instruction",
      code: "specialInstruction",
      placeholder: "Enter special instructions...",
    },
  ];

  // Pick Up specific fields
  const pickupFields = [
    {
      type: "date" as const,
      label: "Pick Up Date",
      code: "pickupDate",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Pick Up Time",
      code: "pickupTime",
      placeholder: "e.g. 01:00 PM",
      isRequired: true,
    },
    {
      type: "number" as const,
      label: "Night",
      code: "night",
    },
    {
      type: "text" as const,
      label: "Pick Up Location",
      code: "pickupLocation",
      placeholder: "e.g. Tribhuvan Airport",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Flight No",
      code: "flightNo",
      placeholder: "e.g. RA 123",
    },
    {
      type: "date" as const,
      label: "Arrival Date",
      code: "arrivalDate",
    },
    {
      type: "text" as const,
      label: "Arrival Time",
      code: "arrivalTime",
      placeholder: "e.g. 01:00 PM",
    },
    {
      type: "text" as const,
      label: "Travel Type",
      code: "travelType",
      placeholder: "e.g. Private Vehicle",
      isRequired: true,
    },
  ];

  // Drop Off specific fields
  const dropOffFields = [
    {
      type: "date" as const,
      label: "Drop Off Date",
      code: "dropOffDate",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Drop Off Time",
      code: "dropOffTime",
      placeholder: "e.g. 01:00 PM",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: " Pick up Location",
      code: "pick up Location",
      placeholder: "e.g. Hotel",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Drop Off",
      code: "dropOffLocation",
      placeholder: "e.g. Hotel",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Passport No",
      code: "passportNo",
      placeholder: "Enter passport number",
    },
    {
      type: "text" as const,
      label: "Flight Type",
      code: "flightType",
      placeholder: "e.g. Domestic / International",
    },
    {
      type: "date" as const,
      label: "Arrival Date",
      code: "arrivaldate",
      placeholder: "2080/01/23",
    },
    {
      type: "number" as const,
      label: "Arrival time",
      code: "arrivaltime",
    },
  ];

  // Show fields according to selected Trip Type
  const visibleFields = [
    {
      type: "dropdown" as const,
      label: "Trip Type",
      code: "tripType",
      isRequired: true,
      options: [
        { label: "Pick Up", val: "Pick Up" },
        { label: "Drop Off", val: "Drop Off" },
      ],
    },

    ...(tripType === "Pick Up"
      ? pickupFields
      : tripType === "Drop Off"
        ? dropOffFields
        : []),

    ...(tripType ? commonFields : []),
  ];

  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Pick Up / Drop Off Request",
      code: "pickup_dropoff_request",
      fields: visibleFields,
    },

    onSubmit: (values) => {
      const request = {
        ...reservationDetails,
        ...JSON.parse(values),
        tripType,
      };

      console.log("Pickup / Drop Off Request:", request);
      onClose();
    },

    onCancel: onClose,
  });

  return (
    <div className="w-full">
      {/* Reservation Details */}
      <div className="mb-5 rounded-lg bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-x-8">
          <DetailRow
            title="Reservation Number"
            value={reservationDetails.reservation}
          />
          <DetailRow title="Guest Name" value={reservationDetails.guestName} />
          <DetailRow title="Room No" value={reservationDetails.room} />
          <DetailRow title="Room Type" value={reservationDetails.roomType} />
          <DetailRow
            title="Requested For"
            value={reservationDetails.requestedFor}
          />
        </div>
      </div>

      {/* Trip Type and Conditional Form */}
      <div
        className="border-t border-gray-200 pt-4"
        onChangeCapture={(event) => {
          const target = event.target;

          if (
            target instanceof HTMLSelectElement &&
            target.name === "tripType"
          ) {
            setTripType(target.value as TripType);
          }
        }}
      >
        {form.build()}
      </div>
    </div>
  );
}
