import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { InvoiceCards } from "../types/InvoiceTypes";

import {
  InvoicingCardCmdService,
  InvoicingCardQueryService,
} from "../../application/services";

// 1. Context type
interface BillingContextType {
  invoicingCards: InvoiceCards[];
  loading: boolean;

  refreshInvoicingCards: () => Promise<void>;

  createInvoicingCard: (card: InvoiceCards) => Promise<void>;
  removeInvoicingCard: (id: number) => Promise<void>;
}

// 2. Create Context
const BillingContext = createContext<BillingContextType | undefined>(undefined);

// 3. Provider
interface BillingProviderProps {
  children: ReactNode;
}

export const BillingProvider = ({ children }: BillingProviderProps) => {
  const [invoicingCards, setInvoicingCards] = useState<InvoiceCards[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch shared invoicing cards
  const refreshInvoicingCards = useCallback(async () => {
    const data = await InvoicingCardQueryService.getAll();
    setInvoicingCards(data);
  }, []);

  // Initial data loading
  useEffect(() => {
    const loadBillingData = async () => {
      try {
        setLoading(true);
        await refreshInvoicingCards();
      } catch (error) {
        console.error("Failed to load invoicing cards:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBillingData();
  }, [refreshInvoicingCards]);

  // Create invoicing card
  const createInvoicingCard = async (card: InvoiceCards) => {
    await InvoicingCardCmdService.create(card);
    await refreshInvoicingCards();
  };

  // Remove invoicing card
  const removeInvoicingCard = async (id: number) => {
    await InvoicingCardCmdService.delete(String(id));
    await refreshInvoicingCards();
  };

  return (
    <BillingContext.Provider
      value={{
        invoicingCards,
        loading,
        refreshInvoicingCards,
        createInvoicingCard,
        removeInvoicingCard,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

// 4. Custom Hook
export const useBilling = () => {
  const context = useContext(BillingContext);

  if (!context) {
    throw new Error("useBilling must be used inside BillingProvider");
  }

  return context;
};
