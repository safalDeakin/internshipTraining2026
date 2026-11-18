import FormBuilder, { type FormConfig } from "../../lib/formBuilder/FormBuilders";


export default function FormBuilderTest() {
    const config: FormConfig = {
        name: "Form Builder Test Form",
        code: "form-builder-test",

        fields: [
            {
                type: "text",
                label: "Guest Name",
                code: "guestName",
                placeholder: "Enter guest name",
                isRequired: true,
            },

            {
                type: "textArea",
                label: "Enter Description",
                code: "description",
                placeholder: "Enter Text here...",
                isRequired: true,
            },

            {
                type: "number",
                label: "Number of Guests",
                code: "numberOfGuests",
                placeholder: "Enter number of guests",
                isRequired: true,
            },

            {
                type: "dropdown",
                label: "Room Type",
                code: "roomType",
                isRequired: true,
                options: [
                    {
                        label: "Standard",
                        val: "standard",
                    },
                    {
                        label: "Deluxe",
                        val: "deluxe",
                    },
                    {
                        label: "Suite",
                        val: "suite",
                    },
                ],
            },

            {
                type: "radio",
                label: "Gender",
                code: "gender",
                isRequired: true,
                options: [
                    {
                        label: "Male",
                        val: "male",
                    },
                    {
                        label: "Female",
                        val: "female",
                    },
                    {
                        label: "Other",
                        val: "other",
                    },
                ],
            },

            {
                type: "checkbox",
                label: "Additional Services",
                code: "services",
                isRequired: false,
                options: [
                    {
                        label: "Breakfast",
                        val: "breakfast",
                    },
                    {
                        label: "Airport Pickup",
                        val: "airport-pickup",
                    },
                    {
                        label: "Laundry",
                        val: "laundry",
                    },
                    {
                        label: "Room Service",
                        val: "room-service",
                    },
                ],
            },

            {
                type: "date",
                label: "Date of Birth",
                code: "dateOfBirth",
                isRequired: true,
            },

            {
                type: "date-range",
                label: "Stay Duration",
                code: "stayDuration",
                isRequired: true,
            },

            {
                type: "date-time",
                label: "Arrival Date & Time",
                code: "arrivalDateTime",
                isRequired: true,
            },

        ],
    };

    const handleSubmit = (values: string) => {
        console.log("FORM SUBMITTED");
        console.log("Values:", values);

        console.log("Parsed:", JSON.parse(values));
    };

    const handleCancel = (values: string) => {
        console.log("FORM CANCELLED");
        console.log("Current Values:", values);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">
                Form Builder Test
            </h1>

            <p className="text-gray-500 mb-6">
                Test all available field types in the FormBuilder.
            </p>

            {FormBuilder.formConfig({
                formConfig: config,
                onSubmit: handleSubmit,
                onCancel: handleCancel,
            }).build()}
        </div>
    );
}


