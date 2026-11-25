import { useMemo } from "react";
import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface VehicleFormData {
  vehicleCode: string;
  vehicleName: string;
  category: string;
  type: string;
  model: string;
  brand: string;
  purchaseDate: string;
  supplier: string;
  invoiceNo: string;
  cost: number;
  condition: string;
  rateType: string;
  rate: number;
}

interface AddVehicleModalProps {
  onClose: () => void;
  onConfirm: (data: VehicleFormData) => void;
}

export default function VehicleAddModal({
  onClose,
  onConfirm,
}: AddVehicleModalProps) {
  const form = useMemo(
    () =>
      FormBuilder.formConfig({
        formConfig: {
          name: "Add Vehicle",
          code: "add-vehicle",
          fields: [
            {
              type: "text",
              label: "Vehicle Code",
              code: "vehicleCode",
              placeholder: "Enter vehicle code",
            },
            {
              type: "text",
              label: "Vehicle Name",
              code: "vehicleName",
              placeholder: "Enter vehicle name",
            },
            {
              type: "text",
              label: "Category",
              code: "category",
              placeholder: "Enter category",
              isRequired: false,
            },
            {
              type: "dropdown",
              label: "Type",
              code: "type",
              options: [
                { label: "2 Seater", val: "2 Seater" },
                { label: "4 Seater", val: "4 Seater" },
                { label: "5 Seater", val: "5 Seater" },
                { label: "7 Seater", val: "7 Seater" },
              ],
            },
            {
              type: "text",
              label: "Model",
              code: "model",
              placeholder: "Enter model",
            },
            {
              type: "text",
              label: "Brand",
              code: "brand",
              placeholder: "Enter brand",
            },
            {
              type: "date",
              label: "Purchase Date",
              code: "purchaseDate",
            },
            {
              type: "text",
              label: "Supplier",
              code: "supplier",
              placeholder: "Enter supplier",
            },
            {
              type: "text",
              label: "Invoice No",
              code: "invoiceNo",
              placeholder: "Enter invoice number",
            },
            {
              type: "number",
              label: "Cost",
              code: "cost",
              placeholder: "Enter cost",
            },
            {
              type: "dropdown",
              label: "Condition",
              code: "condition",
              options: [
                { label: "New", val: "New" },
                { label: "Used", val: "Used" },
                { label: "Refurbished", val: "Refurbished" },
              ],
            },
            {
              type: "dropdown",
              label: "Rate Type",
              code: "rateType",
              options: [
                { label: "Per Day", val: "Per Day" },
                { label: "Per Hour", val: "Per Hour" },
                { label: "Per Trip", val: "Per Trip" },
              ],
            },
            {
              type: "number",
              label: "Rate",
              code: "rate",
              placeholder: "Enter rental rate",
            },
          ],
        },
        onSubmit: (values) => {
          onConfirm(JSON.parse(values) as VehicleFormData);
        },
        onCancel: onClose,
      }),
    [onClose, onConfirm],
  );

  return <div className="vehicle-form">{form.build()}</div>;
}
