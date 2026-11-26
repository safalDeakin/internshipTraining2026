import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface AddChargeModalProps {
  onSubmit: (values: string) => void;
}

const AddVehicleChargeModal = ({ onSubmit }: AddChargeModalProps) => {
  const formBuilder = FormBuilder.formConfig({
    formConfig: {
      name: "Vehicle Charge",
      code: "vehicle-charge",
      fields: [
        // Vehicle Information
        {
          type: "dropdown",
          label: "Vehicle Name",
          code: "vehicleName",
          isRequired: true,
          options: [
            { label: "Car", val: "Car" },
            { label: "Jeep", val: "Jeep" },
            { label: "Van", val: "Van" },
            { label: "Motorcycle", val: "Motorcycle" },
            { label: "Airport Transfer", val: "Airport Transfer" },
          ],
        },
        {
          type: "dropdown",
          label: "Charge Type",
          code: "typeName",
          isRequired: true,
          options: [
            { label: "Pick Up", val: "pickup" },
            { label: "Drop Off", val: "dropoff" },
          ],
        },

        // Charge Information
        {
          type: "number",
          label: "Quantity / No of Guest",
          code: "quantity",
          placeholder: "Enter quantity",
          isRequired: true,
        },
        {
          type: "number",
          label: "Rate",
          code: "rate",
          placeholder: "Enter rate",
          isRequired: true,
        },
        {
          type: "number",
          label: "Amount",
          code: "amt",
          placeholder: "Enter amount",
          isRequired: true,
        },

        // Charge Destination
        {
          type: "radio",
          label: "Charge To",
          code: "chargeTo",
          isRequired: true,
          options: [
            { label: "Folio", val: "Folio" },
            { label: "Pay Now", val: "Pay Now" },
            { label: "No Charge", val: "No Charge" },
          ],
        },

        // Additional Information
        {
          type: "textArea",
          label: "Note",
          code: "note",
          placeholder: "Enter",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      const quantity = Number(data.quantity || 0);
      const rate = Number(data.rate || 0);

      const chargeData = {
        ...data,
        quantity,
        rate,
        totalAmount: quantity * rate,
      };

      onSubmit(JSON.stringify(chargeData));
    },
  });

  return (
    <div className="max-h-[75vh] overflow-y-auto p-4">
      <div className="mb-4">
        <h3 className="mb-3 text-base font-semibold">Charge Detail</h3>
      </div>

      {formBuilder.build()}
    </div>
  );
};

export default AddVehicleChargeModal;
