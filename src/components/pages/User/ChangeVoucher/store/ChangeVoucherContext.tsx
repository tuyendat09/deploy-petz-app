import { createContext, useContext, ReactNode } from "react";
import useChangeVoucherAction, {
  useVoucherActionProps,
} from "../_hook/useChangeVoucherAction";
import { Voucher, VoucherPaginate } from "@/types/Voucher";
import { ChangeVoucherParams } from "@/libs/features/services/voucher";

interface VoucherContextProps {
  voucher: VoucherPaginate | undefined;
  pages: number;
  totalPages?: number;
  handleSetPage: (page: number) => void;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedValue: any;
  clearQuery: () => void;
  setTypeSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedType: any;
  handleChangeVoucher: ({
    voucherPoint,
    voucherId,
    userId,
  }: ChangeVoucherParams) => void;
  userPoint: number | undefined;
  session: any;
}
const VoucherContext = createContext<VoucherContextProps | undefined>(
  undefined,
);

export function VoucherProvider({
  children,
  initialPage,
}: { children: ReactNode } & useVoucherActionProps) {
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
    handleChangeVoucher,
    userPoint,
    session,
  } = useChangeVoucherAction({
    initialPage,
  });

  return (
    <VoucherContext.Provider
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
        handleChangeVoucher,
        userPoint,
        session,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
}

export function useVoucherContext() {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVoucherContext must be used within a VoucherProvider");
  }
  return context;
}
