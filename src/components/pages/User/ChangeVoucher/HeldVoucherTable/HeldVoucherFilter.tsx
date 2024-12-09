import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { VoucherType } from "@/types/Voucher";
import { useHeldVoucherContext } from "../store/HeldVoucherContext";

enum SortOrder {
  asc = "% giảm giá tăng dần",
  desc = "% giảm giá  giảm dần",
}

export default function HeldVoucherFilter() {
  const {
    setSelectedKeys,
    selectedValue,
    setTypeSelected,
    selectedType,
    clearQuery,
  } = useHeldVoucherContext();

  return (
    <div className="flex items-center gap-4">
      <Dropdown className="h-full">
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {SortOrder[selectedValue as keyof typeof SortOrder] ||
              "Sắp xếp % giảm giá"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setSelectedKeys as any}
        >
          <DropdownItem key="asc">% Giảm giá giảm dần</DropdownItem>
          <DropdownItem key="desc">% Giảm giá tăng dần</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {VoucherType[selectedType as keyof typeof VoucherType] ||
              "Sắp xếp kiểu giảm giá"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setTypeSelected as any}
        >
          {Object.keys(VoucherType).map((statusKey) => (
            <DropdownItem key={statusKey}>
              {VoucherType[statusKey as keyof typeof VoucherType]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Button variant="flat" onClick={clearQuery}>
        Xóa lọc
      </Button>
    </div>
  );
}
