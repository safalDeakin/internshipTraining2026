import ReceiptFrame from "../../../shared/components/forms/ReceiptFrame";
import type { OrderReceiptProps, ReceiptItem } from "../types/OrderingTypes";

const OrderReceipt = ({
  restaurantName,
  address,
  restaurantPhone,
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
    <div className="mb-4 rounded-md bg-gray-100 p-3">
      <p className="mb-2 text-sm font-bold">{title}</p>

      <table className="w-full table-fixed text-xs">
        <thead>
          <tr className="text-left">
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
    <ReceiptFrame
      hotelName={restaurantName}
      address={address}
      phone={restaurantPhone}
      onDownloadPDF={onDownloadPDF}
    >
      {/* Order information */}
      <div className="mb-4 text-right text-sm text-gray-500">
        <p>
          Sales Order No:{" "}
          <span className="font-semibold text-black">{orderNo}</span>
        </p>
        <p>
          Date: <span className="text-black">{date}</span>
        </p>
      </div>

      {/* Customer information */}
      <div className="mb-4 space-y-1 text-sm">
        <p>Customer: {customerName}</p>
        <p>Phone Number: {phone}</p>
        <p>Location: {location}</p>
      </div>

      {/* KOT and BOT */}
      {renderItems("KOT", kotItems)}
      {renderItems("BOT", botItems)}

      <h3 className="mt-5 text-center text-sm font-semibold">Thank you!</h3>
    </ReceiptFrame>
  );
};

export default OrderReceipt;
