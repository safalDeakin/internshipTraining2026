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

export default function PickupRequestForm({
  onClose,
}: PickupDropOffRequestFormProps) {
  const [tripType, setTripType] = useState<TripType | "">("");

  const reservationDetails: ReservationDetails = {
    reservation: "RES-001",
    guestName: "John Smith",
    room: "101",
    roomType: "Deluxe",
    requestedFor: "2026-11-20",
  };

  // Reservation details
  const reservationFields = [
    {
      type: "text" as const,
      label: "Reservation Number",
      code: "reservation",
      placeholder: "RES-001",
      isRequired: true,
      disabled: true,
    },
    {
      type: "text" as const,
      label: "Guest Name",
      code: "guestName",
      placeholder: "John Smith",
      disabled: true,
    },
    {
      type: "text" as const,
      label: "Room No",
      code: "room",
      placeholder: "101",
      disabled: true,
    },
    {
      type: "text" as const,
      label: "Room Type",
      code: "roomType",
      placeholder: "Deluxe",
      disabled: true,
    },
    {
      type: "date" as const,
      label: "Requested For",
      code: "requestedFor",
      disabled: true,
    },
  ];

  // Common fields
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

  // Pick Up fields
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

  // Drop Off fields
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
      label: "Pick Up Location",
      code: "pickupLocation",
      placeholder: "e.g. Hotel",
      isRequired: true,
    },
    {
      type: "text" as const,
      label: "Drop Off Location",
      code: "dropOffLocation",
      placeholder: "e.g. Airport",
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
      code: "arrivalDate",
    },
    {
      type: "text" as const,
      label: "Arrival Time",
      code: "arrivalTime",
      placeholder: "e.g. 01:00 PM",
    },
  ];

  const visibleFields = [
    ...reservationFields,

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

    onSubmit: (values: string) => {
      const request = {
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
