import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  HeldVoucherQueryParams,
  useGetVouchersHeldQuery,
} from "@/libs/features/services/user";

export interface useHeldVoucherActionProps {
  initialPage: number;
}

export default function useHeldVoucherAction({
  initialPage,
}: useHeldVoucherActionProps) {
  // State
  const [pages, setPages] = useState<number>(initialPage);
  const [queryParams, setQueryParams] = useState<HeldVoucherQueryParams>({});
  const [totalPages, setTotalPages] = useState<number | undefined>(1);

  const { data: session } = useSession();

  const [selectedKeys, setSelectedKeys] = useState(
    new Set(["Sắp xếp % giảm giá"]),
  );
  const [typeSelect, setTypeSelected] = useState(
    new Set(["Lọc theo kiểu giảm giá"]),
  );

  // Query
  const { refetch, data: voucher } = useGetVouchersHeldQuery({
    userId: session?.user._id,
    page: pages,
    ...queryParams,
  });

  // Use Effect
  useEffect(() => {
    setTotalPages(voucher?.totalPages);
  }, [voucher]);

  // Hàm
  function handleSetPage(page: number) {
    setPages(page);
  }

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const selectedType = useMemo(
    () => Array.from(typeSelect).join(", "),
    [typeSelect],
  );

  useEffect(() => {
    if (selectedValue !== "Sắp xếp % giảm giá") {
      setQueryParams((prev) => ({
        ...prev,
        salePercentSort: selectedValue as any,
      }));
    }

    if (selectedType !== "Lọc theo kiểu giảm giá") {
      setQueryParams((prev) => ({ ...prev, typeFilter: selectedType }));
    }
    refetch();
  }, [selectedValue, selectedType]);

  function clearQuery() {
    refetch();
    setQueryParams({});
    setSelectedKeys(new Set(["Sắp xếp theo điểm"]));
    setTypeSelected(new Set(["Lọc theo kiểu giảm giá"]));
  }

  return {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    setSelectedKeys,
    selectedValue,
    clearQuery,
    setTypeSelected,
    selectedType,
  };
}
