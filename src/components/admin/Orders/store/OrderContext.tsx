import { createContext, useContext, ReactNode } from "react";
import useOrderAction from "../_hooks/useOrdersAction";
import { PaginateOrder } from "@/types/Order";

// Define the shape of your context
interface OrderContextProps {
  isLoading: boolean;
  orderList: PaginateOrder | undefined;
  handleDateChange: (date: Date) => void;
  statusFilter: any;
  setStatusFilter: (keys: any) => void;
  handleClearDate: () => void;
  handleCustomerNameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
  handleViewOrderDetail: (orderId: string) => void;
  viewDetail: boolean;
  orderId: string;
  handleCancelViewOrderDetail: () => void;
  orderTotalFilter: any;
  productQuantityFilter: any;
  userFilter: any;
  setProductQuantityFilter: (keys: any) => void;
  setOrderTotalFilter: (keys: any) => void;
  setUserFilter: (keys: any) => void;
}

// Create the context
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Create a provider component
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    orderList,
    handleDateChange,
    handleClearDate,
    statusFilter,
    setStatusFilter,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
    orderTotalFilter,
    productQuantityFilter,
    userFilter,
    setProductQuantityFilter,
    setOrderTotalFilter,
    setUserFilter,
  } = useOrderAction({ initialPage: 1 });

  return (
    <OrderContext.Provider
      value={{
        isLoading,

        orderList,
        handleDateChange,
        handleClearDate,
        statusFilter,
        setStatusFilter,
        handleCustomerNameSearch,
        handleSetPage,
        page,
        totalPages,
        handleViewOrderDetail,
        viewDetail,
        orderId,
        handleCancelViewOrderDetail,
        orderTotalFilter,
        productQuantityFilter,
        userFilter,
        setProductQuantityFilter,
        setOrderTotalFilter,
        setUserFilter,
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
