import { useState, type ReactNode } from "react";
import { BadgeCheck, Download, Printer } from "lucide-react";

import LoadingOverlay from "../LoadingOverlay";
import StatusOverlay from "../StatusOverlay";
import ReusableButton from "../reuse/ReusableButton";
import type { ReceiptFrameProps } from "../../../types/posSessionTypes";

const ReceiptFrame = ({
  hotelName,
  address,
  phone,
  children,
  onPrint,
  onDownloadPDF,
}: ReceiptFrameProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  const handlePrint = async () => {
    if (isPrinting) return;
    setIsPrinting(true);
    try {
      // Show loading overlay before printing.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onPrint) {
        await onPrint();
      } else {
        window.print();
      }
      setPrintSuccess(true);
      setTimeout(() => {
        setPrintSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Printing failed:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Printable receipt content */}
      <div id="receipt-content" className="min-h-0 flex-1 overflow-y-auto p-4">
        {/* Common hotel information */}
        <header className="mb-4  border-gray-300 pb-3 text-center">
          <h2 className="font-bold ">{hotelName}</h2>
          <p className="mt-1 text-xs ">{address}</p>
          <p className="mt-1 text-xs ">Phone: {phone}</p>
        </header>

        {/* Individual receipt content */}
        {children}
      </div>

      {/* Common receipt actions */}
      <div className="flex shrink-0 flex-col gap-2 border-t border-gray-200 bg-white p-4">
        <ReusableButton
          title="Print Receipt"
          icon={<Printer size={15} />}
          onClick={handlePrint}
          loading={isPrinting}
          disabled={isPrinting}
          className="w-full"
        />

        <ReusableButton
          title="Download PDF"
          icon={<Download size={15} />}
          variant="outline"
          onClick={onDownloadPDF}
          className="w-full"
        />
      </div>

      {isPrinting && <LoadingOverlay />}

      <StatusOverlay
        show={printSuccess}
        icon={<BadgeCheck className="h-16 w-16 text-green-500" />}
        title="Receipt Printed Successfully!"
      />

      {/* Print only the receipt content
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }

          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            overflow: visible;
            padding: 8px;
          }
        }
      `}</style> */}
    </div>
  );
};

export default ReceiptFrame;
