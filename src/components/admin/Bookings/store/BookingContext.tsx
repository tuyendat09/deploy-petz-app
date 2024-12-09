import { createContext, useContext, ReactNode } from "react";
import useBookingAction from "../_hooks/useBookingsAction";

interface BookingContextProps {
  isLoading: boolean;
  bookingList: any;
  handleDateChange: (date: Date) => void;
  selectedValue: string | null;
  setSelectedKeys: (keys: any) => void;
  handleClearDate: () => void;
  handleCustomerNameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
  handleViewBookingDetail: (bookingId: string) => void;
  handleCancelBookingDetail: () => void;
  viewDetail: any;
  bookingId: any;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined,
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    bookingList,
    handleDateChange,
    handleClearDate,
    selectedValue,
    setSelectedKeys,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
    handleViewBookingDetail,
    handleCancelBookingDetail,
    viewDetail,
    bookingId,
  } = useBookingAction({ initialPage: 1 });

  return (
    <BookingContext.Provider
      value={{
        isLoading,
        bookingList,
        handleDateChange,
        handleClearDate,
        selectedValue,
        setSelectedKeys,
        handleCustomerNameSearch,
        handleSetPage,
        page,
        totalPages,
        handleViewBookingDetail,
        handleCancelBookingDetail,
        viewDetail,
        bookingId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Create a hook to use the BookingContext
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
