import { createContext, useContext, ReactNode } from "react";
import useBookingAction from "../_hooks/useBookingsAction";

// Define the shape of your context
interface BookingContextProps {
  bookingList: any;
  handleDateChange: (date: Date) => void;
  selectedValue: string | null;
  setSelectedKeys: (keys: any) => void;
  handleClearDate: () => void;
  handleCustomerNameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
}

// Create the context
const BookingContext = createContext<BookingContextProps | undefined>(
  undefined,
);

// Create a provider component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const {
    bookingList,
    handleDateChange,
    handleClearDate,
    selectedValue,
    setSelectedKeys,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
  } = useBookingAction({ initialPage: 1 });

  return (
    <BookingContext.Provider
      value={{
        bookingList,
        handleDateChange,
        handleClearDate,
        selectedValue,
        setSelectedKeys,
        handleCustomerNameSearch,
        handleSetPage,
        page,
        totalPages,
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
