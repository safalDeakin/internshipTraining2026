import { useMemo, useState } from "react";

import { useOrdering } from "../context/OrderingProvider";
import type { OrderCardData } from "../types/OrderingTypes";

const useOrderHistory = () => {
  const { orders, loading } = useOrdering();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [orderId, setOrderId] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    invoiceNumber: "",
    customerName: "",
    receiptNumber: "",
    orderId: "",
  });

  // Convert shared Order data into card data
  const orderCards: OrderCardData[] = useMemo(
    () =>
      orders.map((order) => ({
        id: order.id,
        type: "Order",
        reference: order.orderNo,
        phone: order.phone,
        waiter: order.waiter,
        customerName: order.customerName,
        table: order.table,
        time: new Date(order.createdAt).toLocaleString(),
        invoiceItems: order.items.map((item) => ({
          id: item.id,
          name: item.label,
          quantity: item.qty,
        })),
      })),
    [orders],
  );

  // Dropdown options from actual order data
  const invoiceOptions = useMemo(
    () => [
      ...new Set(orders.map((order) => order.referenceNumber).filter(Boolean)),
    ],
    [orders],
  );

  const customerOptions = useMemo(
    () => [
      ...new Set(orders.map((order) => order.customerName).filter(Boolean)),
    ],
    [orders],
  );

  const orderIdOptions = useMemo(
    () => [...new Set(orders.map((order) => order.orderNo).filter(Boolean))],
    [orders],
  );

  // Receipt numbers are not part of the current Order model.
  const receiptOptions: string[] = [];

  // Apply filters only when Go is clicked
  const applyFilters = () => {
    setAppliedFilters({
      invoiceNumber,
      customerName,
      receiptNumber,
      orderId,
    });
  };

  const filteredItems = useMemo(() => {
    return orderCards.filter((order) => {
      const matchesCustomer =
        !appliedFilters.customerName ||
        order.customerName === appliedFilters.customerName;

      const matchesOrderId =
        !appliedFilters.orderId || order.reference === appliedFilters.orderId;

      const matchesInvoice =
        !appliedFilters.invoiceNumber ||
        orders.some(
          (originalOrder) =>
            originalOrder.id === order.id &&
            originalOrder.referenceNumber === appliedFilters.invoiceNumber,
        );

      // Receipt number is not supported by the current Order model.
      const matchesReceipt = !appliedFilters.receiptNumber;

      return (
        matchesCustomer && matchesOrderId && matchesInvoice && matchesReceipt
      );
    });
  }, [orderCards, orders, appliedFilters]);

  return {
    loading,

    viewMode,
    setViewMode,

    invoiceNumber,
    setInvoiceNumber,

    customerName,
    setCustomerName,

    receiptNumber,
    setReceiptNumber,

    orderId,
    setOrderId,

    invoiceOptions,
    customerOptions,
    orderIdOptions,
    receiptOptions,

    filteredItems,
    orderCards: filteredItems,

    applyFilters,
  };
};

export default useOrderHistory;
