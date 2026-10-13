import { Download, Printer } from "lucide-react";

export interface ReceiptItem {
  id: number;
  label: string;
  qty: number;
  remarks?: string;
}

interface OrderReceiptProps {
  restaurantName: string;
  address: string;
  orderNo: string;
  date: string;
  customerName: string;
  phone: string;
  location: string;
  kotItems: ReceiptItem[];
  botItems: ReceiptItem[];
  onDownloadPDF?: () => void;
}

const OrderReceipt = ({
  restaurantName,
  address,
  orderNo,
  date,
  customerName,
  phone,
  location,
  kotItems,
  botItems,
  onDownloadPDF,
}: OrderReceiptProps) => {
  const renderItems = (title: string, items: ReceiptItem[]) => (
    <div className="mb-2 bg-gray-200">
      <p className="mb-2 text-sm font-bold">{title}</p>

      <table className="w-full table-fixed text-xs">
        <thead>
          <tr className=" text-left">
            <th className="w-[27%] py-1">Quantity</th>
            <th className="w-[43%] py-1">Items</th>
            <th className="w-[30%] py-1">Remarks</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-1">{item.qty} unit</td>
              <td className="break-words py-1">{item.label}</td>
              <td className="break-words py-1">{item.remarks || "-"}</td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan={3} className="py-2 text-gray-400">
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mx-auto w-full">
      <div id="order-receipt">
        <header className="mb-3 text-center">
          <h2 className="font-bold">{restaurantName}</h2>
          <p className="">{address}</p>
        </header>

        <div className="mb-3 text-right text-sm text-gray-500">
          <p className="text-gray-500">
            Sales Order No:{" "}
            <span className="font-semibold text-black">{orderNo}</span>
          </p>
          <p className="text-gray-500">
            Date: <span className="text-black ">{date}</span>
          </p>
        </div>

        <div className="mb-3 text-sm">
          <p>Customer: {customerName}</p>
          <div className="flex flex-wrap justify-between gap-x-2">
            <p>Phone Number: {phone}</p>
            <p>Location: {location}</p>
          </div>
        </div>

        {renderItems("KOT", kotItems)}
        {renderItems("BOT", botItems)}
      </div>
      <h1 className="text-center ">Thankyou !</h1>
      <div className="mt-3 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 rounded-md bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Printer size={14} />
          Print Order
        </button>

        <button
          type="button"
          onClick={onDownloadPDF}
          className="flex items-center justify-center gap-2 rounded-md border border-gray-200 py-2 text-sm hover:bg-gray-50"
        >
          <Download size={14} />
          Download PDF
        </button>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #order-receipt,
          #order-receipt * {
            visibility: visible;
          }

          #order-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderReceipt;
