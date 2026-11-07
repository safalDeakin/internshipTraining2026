import type { ReactNode } from "react";
import type { PrintReservationFormData } from "../types";

interface PrintReservationFormProps {
    data: PrintReservationFormData;
    onClose: () => void;
}

const PrintReservationForm = ({
    data,
    onClose,
}: PrintReservationFormProps) => {
    return (
        <>
            {/* Action Buttons */}
            <div className="reservation-print-actions mx-auto mb-4 flex w-[210mm] justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Close
                </button>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                    Print
                </button>
            </div>

            {/* FORM CONTAINER */}
            <div
                id="print-reservation-form"
                className="
                    mx-auto box-border min-h-[297mm] w-[210mm]
                    bg-white p-[8mm] text-[13px] text-black shadow-lg
                "
            >
                <div>
                    {/* HEADER */}
                    <div>
                        {/* Form Title */}
                        <div className="reservation-form-title flex items-center justify-center px-5 py-4">
                            <div className="text-center">
                                <h2 className="text-[17px] font-bold uppercase">
                                    Reservation Form
                                </h2>
                            </div>
                        </div>

                        {/* Document Information */}
                        <div className="reservation-document-info flex items-center px-5 py-4">
                            <div className="ml-auto flex flex-col">
                                <div className="flex">
                                    <div className="w-20 shrink-0 px-2 py-1 font-bold">
                                        Date:
                                    </div>

                                    <div className="flex-1 border-b px-2 py-1">
                                        {data.date}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-20 shrink-0 px-2 py-1 font-bold">
                                        Res. No.:
                                    </div>

                                    <div className="flex-1 border-b px-2 py-1 font-medium">
                                        {data.reservationNo}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1. GUEST INFORMATION */}
                    <FormSection title="1. Guest Information">
                        <div>
                            <FormField
                                label="Title:"
                                value={data.title}
                            />

                            <FormField
                                label="Full Name:"
                                value={data.fullName}
                            />

                            <FormField
                                label="Phone Number:"
                                value={data.phoneNumber}
                            />

                            <FormField
                                label="Email Address:"
                                value={data.emailAddress}
                            />

                            <FormField
                                label="Address:"
                                value={data.address}
                            />

                            <FormField
                                label="Nationality:"
                                value={data.nationality}
                            />

                            <FormField
                                label="ID Type:"
                                value={data.idType}
                            />

                            <FormField
                                label="ID Number:"
                                value={data.idNumber}
                            />
                        </div>
                    </FormSection>

                    {/* 2. RESERVATION DETAILS */}
                    <FormSection title="2. Reservation Details">
                        <div>
                            <FormField
                                label="Arrival Date:"
                                value={data.arrivalDate}
                            />

                            <FormField
                                label="Departure Date:"
                                value={data.departureDate}
                            />

                            <FormField
                                label="No. of Nights:"
                                value={data.noOfNight}
                            />

                            <FormField
                                label="No. of Adults:"
                                value={data.noOfAdult}
                            />

                            <FormField
                                label="No. of Children:"
                                value={data.noOfChildren}
                            />

                            <FormField
                                label="Reservation No.:"
                                value={data.reservationNo}
                            />
                        </div>
                    </FormSection>

                    {/* 3. RATE & PAYMENT */}
                    <FormSection title="3. Rate & Payment Information">
                        <div>
                            <FormField
                                label="Rate Plan Package:"
                                value={data.ratePlan}
                            />

                            <FormField
                                label="Currency:"
                                value={data.currency}
                            />

                            <FormField
                                label="Rate Per Room:"
                                value={formatAmount(data.ratePerRoom)}
                            />

                            <FormField
                                label="Total Estimate Amount:"
                                value={formatAmount(
                                    data.totalEstimateAmount
                                )}
                            />
                        </div>
                    </FormSection>

                    {/* 4. PAYMENT GUARANTEE */}
                    <FormSection title="4. Payment Guarantee">
                        <div className="reservation-payment-options flex flex-wrap items-center gap-8 px-4 py-3">
                            <span className="font-semibold">
                                Select Payment Method:
                            </span>

                            <PaymentOption
                                label="Cash"
                                selected={
                                    data.paymentGuarantee === "Cash"
                                }
                            />

                            <PaymentOption
                                label="Credit"
                                selected={
                                    data.paymentGuarantee === "Credit"
                                }
                            />

                            <PaymentOption
                                label="Bank Transfer"
                                selected={
                                    data.paymentGuarantee === "Bank Transfer"
                                }
                            />
                        </div>
                    </FormSection>

                    {/* 5. AGREEMENT */}
                    <FormSection title="5. Agreement">
                        <div className="reservation-agreement px-4 py-3">
                            <p className="leading-5">
                                I hereby confirm that the above information
                                provided by me is correct and complete.
                            </p>

                            <p className="leading-5">
                                I understand and agree to the hotel terms
                                and conditions.
                            </p>

                            {/* Signature Area */}
                            <div className="reservation-signatures mt-8 grid grid-cols-1 gap-6">
                                <SignatureField
                                    label="Full Name"
                                    value={data.agreementName}
                                />

                                <SignatureField
                                    label="Signature"
                                    value={data.signature}
                                />
                            </div>
                        </div>
                    </FormSection>
                </div>
            </div>
        </>
    );
};

/* ================================================================
   FORM SECTION
================================================================ */

interface FormSectionProps {
    title: string;
    children: ReactNode;
}

const FormSection = ({
    title,
    children,
}: FormSectionProps) => {
    return (
        <section>
            <div className="reservation-section-heading px-4 py-2">
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
    value?: string | number;
}

const FormField = ({
    label,
    value = "",
}: FormFieldProps) => {
    return (
        <div className="reservation-form-field flex min-h-7.5">
            <div className="reservation-field-label flex w-50 shrink-0 items-center px-6 font-medium">
                {label}
            </div>

            <div className="reservation-field-value flex min-w-0 flex-1 items-center border-b px-3 font-normal">
                {value}
            </div>
        </div>
    );
};

/* ================================================================
   PAYMENT OPTION
================================================================ */

interface PaymentOptionProps {
    label: string;
    selected: boolean;
}

const PaymentOption = ({
    label,
    selected,
}: PaymentOptionProps) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className="
                    flex h-3.25 w-3.25
                    items-center justify-center
                    border-[1.5px] border-black
                    text-[9px] font-bold
                "
            >
                {selected ? "✓" : ""}
            </div>

            <span>{label}</span>
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
    value = "",
}: SignatureFieldProps) => {
    return (
        <div>
            <div className="reservation-signature-line mb-1 h-4 w-45 border-b border-black px-1">
                {value}
            </div>

            <p className="text-[13px] font-medium">
                {label}
            </p>
        </div>
    );
};

/* ================================================================
   HELPERS
================================================================ */

const formatAmount = (amount: number): string => {
    return amount.toLocaleString("en-NP");
};

export default PrintReservationForm;