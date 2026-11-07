
const PrintReservationForm = () => {
    return (
        <>
            <div
                id="print-reservation-form"
                className="
                mx-auto
                box-border
                min-h-[297mm]
                w-[210mm]
                bg-white
                p-[12mm]
                text-[13px]
                text-black
                shadow-lg

                print:m-0
                print:min-h-[306mm]
                print:w-[210mm]
                print:p-[12mm]
                print:shadow-none"
            >
                {/*FORM CONTAINER*/}
                <div className="min-h-[273mm]">

                    {/*HEADER*/}
                    <div className="">

                        <div className="flex items-center justify-center px-5 py-4">

                            {/* Form Title */}
                            <div className="text-center">
                                <h2 className="text-[17px] font-bold uppercase">
                                    Reservation Form
                                </h2>
                            </div>

                        </div>
                        {/* Document Information */}
                        <div className="flex items-center px-5 py-4">

                            <div className="ml-auto flex flex-col">
                                <div className="flex">
                                    <div className="w-16.25 px-2 py-1 font-bold">
                                        Date:
                                    </div>

                                    <div className="flex-1 px-2 py-1 border-b w-25">
                                        {/* {data.date} */}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-20 px-2 py-1 font-bold">
                                        Res. No.:
                                    </div>

                                    <div className="flex-1 px-2 py-1 font-medium border-b">
                                        {/* {data.reservationNo} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GUEST INFORMATION*/}
                    <FormSection title="1. Guest Information">

                        <div className="grid grid-cols-1">

                            <FormField
                                label="Title:"
                            />

                            <FormField
                                label="Full Name:"
                            />

                            <FormField
                                label="Phone Number:"
                            />

                            <FormField
                                label="Email Address:"
                            />

                            <FormField
                                label="Address:"
                            />

                            <FormField
                                label="Nationality:"
                            />

                            <FormField
                                label="ID Type:"
                            />

                            <FormField
                                label="ID Number:"
                            />

                        </div>

                    </FormSection>

                    {/* RESERVATION DETAIL*/}
                    <FormSection title="2. Reservation Details">

                        <div className="grid grid-cols-1">

                            <FormField
                                label="Arrival Date:"
                            />

                            <FormField
                                label="Departure Date:"

                            />

                            <FormField
                                label="No. of Nights:"

                            />

                            <FormField
                                label="No. of Adults:"

                            />

                            <FormField
                                label="No. of Children:"

                            />

                            <FormField
                                label="Reservation No.:"

                            />

                        </div>

                    </FormSection>

                    {/* RATE & PAYMENT*/}
                    <FormSection title="3. Rate & Payment Information">

                        <div className="grid grid-cols-1">

                            <FormField
                                label="Rate Plan Package:"

                            />

                            <FormField
                                label="Currency:"

                            />

                            <FormField
                                label="Rate Per Room:"

                            />

                            <FormField
                                label="Total Estimate Amount:"

                            />

                        </div>

                    </FormSection>

                    {/* PAYMENT GUARANTEE*/}
                    <FormSection title="4. Payment Guarantee">

                        <div className="flex items-center gap-8 px-4 py-3">

                            <span className="font-semibold">
                                Select Payment Method:
                            </span>

                            <PaymentOption
                                label="Cash"

                            />

                            <PaymentOption
                                label="Credit"

                            />

                            <PaymentOption
                                label="Bank Transfer"
                            />

                        </div>

                    </FormSection>

                    {/*AGREEMENT*/}
                    <FormSection title="5. Agreement">

                        <div className="px-4 py-3">

                            <p className="leading-5">
                                I hereby confirm that the above information
                                provided by me is correct and complete.
                            </p>

                            <p className="leading-5">
                                I understand and agree to the hotel terms
                                and conditions.
                            </p>

                            {/* Signature Area */}
                            <div className="mt-8 grid grid-cols-1 gap-6">

                                <SignatureField
                                    label="Full Name"
                                />

                                <SignatureField
                                    label="Signature"
                                />

                            </div>

                        </div>

                    </FormSection>

                </div>
            </div>
            <button onClick={() => window.print()}>Print</button>
        </>
    );
};

/*FORM SECTION*/

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

const FormSection = ({
    title,
    children,
}: FormSectionProps) => {
    return (
        <section>

            {/* Section Header */}
            <div className=" px-4 py-2">
                <h3 className="text-[13px] font-bold uppercase tracking-wide">
                    {title}
                </h3>
            </div>

            {children}

        </section>
    );
};

/* ================================================================
   FORM FIELD
================================================================ */

interface FormFieldProps {
    label: string;
    value?: string;
}

const FormField = ({
    label,
}: FormFieldProps) => {
    return (
        <div className="flex min-h-7.5">

            {/* Label */}
            <div className="flex w-50 shrink-0 items-center  px-6 font-medium">
                {label}
            </div>

            {/* Value */}
            <div className="flex flex-1 items-center px-3 font-normal border-b">
            </div>

        </div>
    );
};

/* ================================================================
   PAYMENT OPTION
================================================================ */

interface PaymentOptionProps {
    label: string;
}

const PaymentOption = ({
    label,
}: PaymentOptionProps) => {
    return (
        <div className="flex items-center gap-2">

            <div
                className={`
                    flex
                    h-3.25
                    w-3.25
                    items-center
                    justify-center
                    border-[1.5px]
                    border-black
                    text-[9px]
                    font-bold
                `}
            >
                {""}
            </div>

            <span>
                {label}
            </span>

        </div>
    );
};

/* ================================================================
   SIGNATURE FIELD
================================================================ */

interface SignatureFieldProps {
    label: string;
    value?: string;
}

const SignatureField = ({
    label,
}: SignatureFieldProps) => {
    return (
        <div>

            <div className="mb-1 w-45 h-4 border-b border-black px-1">

            </div>

            <p className="text-center text-[13px] font-medium absolute">
                {label}
            </p>

        </div>
    );
};

export default PrintReservationForm;