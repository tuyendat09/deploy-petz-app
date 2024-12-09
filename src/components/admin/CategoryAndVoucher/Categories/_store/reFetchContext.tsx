import { createContext, useContext, ReactNode, useState } from "react";

// Define the shape of your context
interface RefetchContextProps {
  refetch: boolean;
  handleRefetch: () => void;
}

// Create the context
const RefetchContext = createContext<RefetchContextProps | undefined>(
  undefined,
);

// Create a provider component
export const RefetchProvider = ({ children }: { children: ReactNode }) => {
  const [refetch, setRefetch] = useState(false);

  function handleRefetch() {
    setRefetch((prevState) => !prevState);
  }

  return (
    <RefetchContext.Provider
      value={{
        refetch,
        handleRefetch,
      }}
    >
      {children}
    </RefetchContext.Provider>
  );
};

// Create a hook to use the BookingContext
export const useRefetchContext = () => {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
