import { useState } from "react";
import { ChevronDown, Loader, X } from "lucide-react";
import { AU, GB, IN, NP, US } from "country-flag-icons/react/1x1";

import { ButtonMode } from "../../../../popup/SessionModeModal";
import OrderSection, { type OrderLine } from "./OrderSection";
import OrderReceipt from "./OrderReceipt";
import LoadingOverlay from "../LoadingOverlay";

//properties this form accepts
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
  const [selectedCode, setSelectedCode] = useState("+977"); //selected phone country code.
  const [isSubmitting, setIsSubmitting] = useState(false); //order is currently being submitted.
  const [submitted, setSubmitted] = useState(false); //order is currently being submitted.

  const [customerName, setCustomerName] = useState(""); //customer's name typed into the input.
  const [referenceNumber, setReferenceNumber] = useState(""); //customer's reference number.
  const [phone, setPhone] = useState(""); //phone number, without the country code.
  const [location, setLocation] = useState(""); //customer's location.
  //Finding the selected country
  const selectedCountry =
    countries.find((country) => country.dialCode === selectedCode) ??
    countries[0];
  //function that processes the Submit button.
  const handleSubmit = async () => {
    //no items to order.An order is already being submitted.
    if (orderedItems.length === 0 || isSubmitting) return;
    setIsSubmitting(true);

    try {
      //replace with actual api request
      //waits for approximately two seconds. {loadin gshow in form place}
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

  return (
    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      {/* /If submitted is true, display OrderReceipt. */}
      {submitted ? (
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
            // Connect PDF generation here.
          }}
        />
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
          className="relative"
        >
          {" "}
          <div className="mb-4 flex items-center justify-between">
            {" "}
            <h2 className="font-bold">Place Order</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Particular</label>
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Full Name"
                className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

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
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {orderedItems.length === 0 ? (
              <>
                <h3 className="text-left">KOT/BOT</h3>
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
          <div className="mt-4 w-full">
            <ButtonMode
              title="Submit"
              type="submit"
              disabled={orderedItems.length === 0 || isSubmitting}
              loading={isSubmitting}
            />
          </div>
          {isSubmitting && (
            <>
              {/* Blur the entire form
              <div className="absolute inset-0 z-20 rounded-lg bg-white/30 backdrop-blur-[3px]" />

              {/* Keep the loader clear */}
              {/* <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3">
                <Loader className="h-10 w-10 animate-spin text-gray-700" />
              </div> */}
              <LoadingOverlay />
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default OrderForm;
