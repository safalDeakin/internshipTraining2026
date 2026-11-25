import FormBuilder from "../../../../lib/formBuilder/FormBuilders";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";

interface RequestTypeOptionsProps {
  onSelect: (type: "room-service" | "pickup") => void;
}

interface GuestRequestFormProps {
  onClose: () => void;
}

/* ---------------- Request Type Selection ---------------- */

export function RequestTypeOptions({ onSelect }: RequestTypeOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <ReusableButton
        variant="primary"
        size="md"
        className="w-full justify-center"
        onClick={() => onSelect("room-service")}
      >
        Room Service
      </ReusableButton>

      <ReusableButton
        variant="primary"
        size="md"
        className="w-full justify-center"
        onClick={() => onSelect("pickup")}
      >
        Pick Up / Drop Off
      </ReusableButton>
    </div>
  );
}

/* ---------------- Room Service Form ---------------- */

export function RoomServiceRequestForm({ onClose }: GuestRequestFormProps) {
  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Room Service Request",
      code: "room_service_request",
      fields: [
        {
          type: "dropdown",
          label: "Service Type",
          code: "serviceType",
          isRequired: true,
          options: [
            { label: "Extra Towel & Linen", val: "Extra Towel & Linen" },
            { label: "Room Cleaning", val: "Room Cleaning" },
            { label: "Food & Beverage", val: "Food & Beverage" },
            { label: "Laundry", val: "Laundry" },
            { label: "Room Setup", val: "Room Setup" },
            { label: "Other", val: "Other" },
          ],
        },
        {
          type: "number",
          label: "Quantity",
          code: "quantity",
          placeholder: "Enter quantity",
          isRequired: true,
        },
        {
          type: "number",
          label: "Price",
          code: "price",
          placeholder: "250",
          isRequired: true,
        },
        {
          type: "date",
          label: "Requested Date",
          code: "requestedDate",
          isRequired: true,
        },
        {
          type: "text",
          label: "Requested Time",
          code: "requestedTime",
          placeholder: "11:00 AM",
          isRequired: true,
        },
        {
          type: "text",
          label: "Service Location",
          code: "serviceLocation",
          placeholder: "Room 101",
          isRequired: true,
        },
        {
          type: "textArea",
          label: "Special Instruction",
          code: "specialInstruction",
          placeholder: "Please bring ...",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values) => {
      console.log("Room Service Request:", JSON.parse(values));
      onClose();
    },

    onCancel: () => onClose(),
  });

  return <div className="w-full p-3">{form.build()}</div>;
}

/* ---------------- Pickup / Drop Off Form ---------------- */

export function PickupDropOffRequestForm({ onClose }: GuestRequestFormProps) {
  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Pick Up / Drop Off Request",
      code: "pickup_dropoff_request",
      fields: [
        {
          type: "text",
          label: "Reservation Number",
          code: "reservation",
          placeholder: "RV-#1221",
          isRequired: true,
        },
        {
          type: "text",
          label: "Guest Name",
          code: "guestName",
          placeholder: "Enter guest name",
          isRequired: true,
        },
        {
          type: "text",
          label: "Room No",
          code: "room",
          placeholder: "101",
          isRequired: true,
        },
        {
          type: "text",
          label: "Room Type",
          code: "roomType",
          placeholder: "Deluxe Room",
          isRequired: true,
        },
        {
          type: "date",
          label: "Requested For",
          code: "requestedFor",
          isRequired: true,
        },
        {
          type: "dropdown",
          label: "Trip Type",
          code: "tripType",
          isRequired: true,
          options: [
            { label: "Pick Up", val: "Pick Up" },
            { label: "Drop Off", val: "Drop Off" },
            { label: "Round Trip", val: "Round Trip" },
          ],
        },
        {
          type: "date",
          label: "Pick Up Date",
          code: "pickupDate",
          isRequired: true,
        },
        {
          type: "text",
          label: "Pick Up Time",
          code: "pickupTime",
          placeholder: "01:00 PM",
          isRequired: true,
        },
        {
          type: "number",
          label: "Night",
          code: "night",
          placeholder: "2",
          isRequired: false,
        },
        {
          type: "text",
          label: "Pick Up Location",
          code: "pickupLocation",
          placeholder: "Tribhuvan Airport",
          isRequired: true,
        },
        {
          type: "text",
          label: "Drop Off Location",
          code: "dropOffLocation",
          placeholder: "Hotel",
          isRequired: true,
        },
        {
          type: "text",
          label: "Travel Type",
          code: "travelType",
          placeholder: "Private Vehicle",
          isRequired: true,
        },
        {
          type: "text",
          label: "Flight No",
          code: "flightNo",
          placeholder: "RA 123",
          isRequired: false,
        },
        {
          type: "date",
          label: "Arrival Date",
          code: "arrivalDate",
          isRequired: false,
        },
        {
          type: "text",
          label: "Arrival Time",
          code: "arrivalTime",
          placeholder: "01:00 PM",
          isRequired: false,
        },
        {
          type: "text",
          label: "Driver",
          code: "driver",
          placeholder: "Driver name",
          isRequired: false,
        },
        {
          type: "text",
          label: "Contact",
          code: "contact",
          placeholder: "Contact number",
          isRequired: true,
        },
        {
          type: "textArea",
          label: "Special Instruction",
          code: "specialInstruction",
          placeholder: "Please bring ...",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values) => {
      console.log("Pickup / Drop Off Request:", JSON.parse(values));
      onClose();
    },

    onCancel: () => onClose(),
  });

  return <div className="w-full p-3">{form.build()}</div>;
}
