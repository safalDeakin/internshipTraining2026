
import FormBuilder, { type FormConfig } from "../../../lib/formBuilder/FormBuilders";
import useDialogBox from "../../../lib/component/DialogueBox/useDialogueBox";

const config: FormConfig = {
    name: "Add New Item",
    code: "ADDITEM",
    fields: [
        {
            type: "text",
            label: "Name",
            code: "name",
            placeholder: "Enter full name.",
        },
        {
            type: "number",
            label: "Age",
            code: "age",
            placeholder: "Enter Your age.",
        },
        {
            type: "number",
            label: "Age",
            code: "age",
            placeholder: "Enter Your age.",
        },
        {
            type: "number",
            label: "Age",
            code: "age",
            placeholder: "Enter Your age.",
        },
        {
            type: 'radio',
            label: 'Select Gender?',
            code: 'gender',
            options: [
                { label: "Boy", val: "bbb" },
                { label: "Girl", val: "ggg" }
            ]
        },
        {
            type: 'checkbox',
            label: 'Select Theses',
            code: 'checkboxCode123',
            options: [
                { label: "Boy", val: "bbb" },
                { label: "Girl", val: "ggg" }
            ]
        },
        {
            type: 'checkbox',
            label: '',
            code: 'TnC_approved',
            options: [
                { label: "I have understood everything. And except all the clause as mention in these terms and conditions", val: "true" },
            ]
        }
    ]
}


export default function InvoicePage() {
    const { showDialog, closeDialog } = useDialogBox();

    const formBuilder = FormBuilder.createForm({
        name: "Asas",
        code: "asas",
        onSubmit: (values: string) => alert("Submit " + values),
        onCancel: (values: string) => alert("Cancel " + values)
    })
        .addTextField("Name", "name", "Full Name")
        .addTextField("Email", "email", "Email Address")
        .addNumberField("Age", "age", "Age")

        .addRadiobox("Status", "status",
            [{ label: "Married", val: "married" },
            { label: "Single", val: "single" }
            ])
        .addDropdown("Role", "role", [
            { label: "Admin", val: "admin12" },
            { label: "User", val: "user12" },
        ])
        .addCheckbox("", "user_accepted", [
            { label: "I have read and understood the T&C", val: "is_accepted" }
        ]);

    const formFromConfig = FormBuilder.fromConfig({
        onSubmit: (values: string) => {
            alert("Submit " + values);
        },
        formConfig: config,
    });

    return (
        <>
            <button onClick={() => {
                showDialog(

                    {
                        title: 'Update New Item',
                        width: 600,
                        showHeader: true,
                        content:
                            // <div> Hello People</div>
                            formBuilder.build()
                        // formFromConfig.build()
                    }


                )
            }}>
                Here Here
            </button >

        </>
    )
}
