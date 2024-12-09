import { createContext, useContext, ReactNode } from "react";
import useHeldVoucherAction, {
  useHeldVoucherActionProps,
} from "../_hook/useHeldVoucherAction";
import { HeldVouchersResponse } from "@/types/Voucher";

interface HeldVoucherContextProps {
  voucher: HeldVouchersResponse | undefined;
  pages: number;
  totalPages?: number;
  handleSetPage: (page: number) => void;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedValue: any;
  clearQuery: () => void;
  setTypeSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedType: any;
}
const HeldVoucherContext = createContext<HeldVoucherContextProps | undefined>(
  undefined,
);

export function HeldVoucherProvider({
  children,
  initialPage,
}: { children: ReactNode } & useHeldVoucherActionProps) {
  const {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    setSelectedKeys,
    selectedValue,
    clearQuery,
    setTypeSelected,
    selectedType,
  } = useHeldVoucherAction({
    initialPage,
  });

  return (
    <HeldVoucherContext.Provider
      value={{
        voucher,
        pages,
        totalPages,
        handleSetPage,
        setSelectedKeys,
        selectedValue,
        clearQuery,
        setTypeSelected,
        selectedType,
      }}
    >
      {children}
    </HeldVoucherContext.Provider>
  );
}

export function useHeldVoucherContext() {
  const context = useContext(HeldVoucherContext);
  if (!context) {
    throw new Error(
      "useHeldVoucherContext must be used within a HeldVoucherProvider",
    );
  }
  return context;
}
