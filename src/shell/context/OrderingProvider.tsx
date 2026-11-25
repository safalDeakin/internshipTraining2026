import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { FoodItem, Order } from "../types/OrderingTypes";

import {
  FoodItemQueryService,
  OrderCmdService,
  OrderQueryService,
} from "../../application/services";

interface OrderingContextType {
  foodItems: FoodItem[];
  orders: Order[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  createOrder: (order: Order) => Promise<void>;
}

const OrderingContext = createContext<OrderingContextType | undefined>(
  undefined,
);

interface OrderingProviderProps {
  children: ReactNode;
}

export const OrderingProvider = ({ children }: OrderingProviderProps) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Load menu items and existing orders
  const loadData = async () => {
    try {
      setLoading(true);

      const [foodData, orderData] = await Promise.all([
        FoodItemQueryService.getAll(),
        OrderQueryService.getAll(),
      ]);

      setFoodItems(foodData);
      setOrders(orderData);
    } catch (error) {
      console.error("Failed to load ordering data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reload orders after creating an order
  const refreshOrders = async () => {
    try {
      const data = await OrderQueryService.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Failed to refresh orders:", error);
      throw error;
    }
  };

  // Create order through the command service
  const createOrder = async (order: Order) => {
    await OrderCmdService.create(order);
    await refreshOrders();
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <OrderingContext.Provider
      value={{
        foodItems,
        orders,
        loading,
        refreshOrders,
        createOrder,
      }}
    >
      {children}
    </OrderingContext.Provider>
  );
};

export const useOrdering = () => {
  const context = useContext(OrderingContext);

  if (!context) {
    throw new Error("useOrdering must be used inside OrderingProvider");
  }

  return context;
};
