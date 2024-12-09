import { createContext, useContext, ReactNode } from "react";
import useOrderAction from "../_hooks/useOrdersAction";
import { PaginateOrder } from "@/types/Order";

// Define the shape of your context
interface OrderContextProps {
  orderList: PaginateOrder | undefined;
  handleDateChange: (date: Date) => void;
  selectedValue: string | null;
  setSelectedKeys: (keys: any) => void;
  handleClearDate: () => void;
  handleCustomerNameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
  handleViewOrderDetail: (orderId: string) => void;
  viewDetail: boolean;
  orderId: string;
  handleCancelViewOrderDetail: () => void;
}

// Create the context
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Create a provider component
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const {
    orderList,
    handleDateChange,
    handleClearDate,
    selectedValue,
    setSelectedKeys,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
  } = useOrderAction({ initialPage: 1 });

  return (
    <OrderContext.Provider
      value={{
        orderList,
        handleDateChange,
        handleClearDate,
        selectedValue,
        setSelectedKeys,
        handleCustomerNameSearch,
        handleSetPage,
        page,
        totalPages,
        handleViewOrderDetail,
        viewDetail,
        orderId,
        handleCancelViewOrderDetail,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Create a hook to use the BookingContext
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};
