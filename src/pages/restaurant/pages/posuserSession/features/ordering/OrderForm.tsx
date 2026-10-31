import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AU, GB, IN, NP, US } from "country-flag-icons/react/1x1";

import OrderSection, { type OrderLine } from "./OrderSection";
import OrderReceipt from "./OrderReceipt";
import FormFrame from "../../shared/components/forms/FormFrame";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import ReusableButton from "../../shared/components/reuse/ReusableButton";

// Properties this form accepts
interface OrderFormProps {
  orderedItems: OrderLine[];
  kotItems: OrderLine[];
  botItems: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}

const countries = [
  { code: "NP", dialCode: "+977", Flag: NP },
  { code: "IN", dialCode: "+91", Flag: IN },
  { code: "US", dialCode: "+1", Flag: US },
  { code: "GB", dialCode: "+44", Flag: GB },
  { code: "AU", dialCode: "+61", Flag: AU },
];

const OrderForm = ({
  orderedItems,
  kotItems,
  botItems,
  onChangeQty,
  onRemove,
  onClose,
}: OrderFormProps) => {
  const [selectedCode, setSelectedCode] = useState("+977");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const selectedCountry =
    countries.find((country) => country.dialCode === selectedCode) ??
    countries[0];

  // Handle order submission
  const handleSubmit = async () => {
    if (orderedItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Replace with actual API request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // console.log("Submitted order:", {
      //   customerName,
      //   referenceNumber,
      //   phone: `${selectedCode}${phone}`,
      //   location,
      //   items: orderedItems,
      // });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show receipt after successful submission
  if (submitted) {
    return (
      <OrderReceipt
        restaurantName="VIP Restaurant"
        address="Banepa-07, Kavre"
        orderNo="INN_55"
        date="04-02-2026"
        customerName={customerName || "ram"}
        phone={`${selectedCode}${phone}`}
        location={location || "Banepa"}
        kotItems={kotItems}
        botItems={botItems}
        onDownloadPDF={() => {
          // Connect PDF generation here
        }}
      />
    );
  }
  return (
    <FormFrame
      title="Place Order"
      onClose={onClose}
      footer={
        <ReusableButton
          title="Submit"
          type="submit"
          form="order-form"
          disabled={orderedItems.length === 0 || isSubmitting}
          loading={isSubmitting}
        />
      }
    >
      <form
        id="order-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        className="relative flex flex-col gap-5"
      >
        {/* Customer name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Particular</label>
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Full Name"
            className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Reference and mobile number */}
        <div className="grid grid-cols-[1fr_1.6fr] gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <label className="text-sm font-medium">Reference Number</label>
            <input
              value={referenceNumber}
              onChange={(event) => setReferenceNumber(event.target.value)}
              placeholder="000-123-999"
              className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <label className="text-sm font-medium">Mobile Number</label>

            <div className="flex h-9 items-center rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
              <div className="relative flex h-full shrink-0 items-center border-r border-gray-300">
                <selectedCountry.Flag className="pointer-events-none absolute left-2.5 h-4 w-4 rounded-full object-cover" />

                <select
                  value={selectedCode}
                  onChange={(event) => setSelectedCode(event.target.value)}
                  className="h-full appearance-none rounded-l-lg bg-transparent pl-9 pr-7 text-sm outline-none"
                >
                  {countries.map(({ code, dialCode }) => (
                    <option key={code} value={dialCode}>
                      {dialCode}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-gray-400" />
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="9800000000"
                className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {/* KOT / BOT items */}
        <div className="flex flex-col gap-3">
          {orderedItems.length === 0 ? (
            <>
              <h3 className="text-left text-sm font-medium">KOT/BOT</h3>
              <p className="rounded-lg py-6 text-center text-sm text-gray-500">
                No items added till now
              </p>
            </>
          ) : (
            <>
              {kotItems.length > 0 && (
                <OrderSection
                  title="KOT"
                  items={kotItems}
                  onChangeQty={onChangeQty}
                  onRemove={onRemove}
                />
              )}

              {botItems.length > 0 && (
                <OrderSection
                  title="BOT"
                  items={botItems}
                  onChangeQty={onChangeQty}
                  onRemove={onRemove}
                />
              )}
            </>
          )}
        </div>
      </form>

      {/* Loading overlay during submission */}
      {isSubmitting && <LoadingOverlay />}
    </FormFrame>
  );
};

export default OrderForm;
