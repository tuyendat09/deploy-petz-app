import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useVoucherContext } from "../store/ChangeVoucherContext";
import { VoucherType } from "@/types/Voucher";

enum SortOrder {
  asc = "Điểm tăng dần",
  desc = "Điểm giảm dần",
}

export default function ChangeVoucherFilter() {
  const {
    setSelectedKeys,
    selectedValue,
    setTypeSelected,
    selectedType,
    clearQuery,
  } = useVoucherContext();

  return (
    <div className="flex items-center gap-4">
      <Dropdown className="h-full">
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {SortOrder[selectedValue as keyof typeof SortOrder] ||
              "Sắp xếp theo điểm"}
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
          <DropdownItem key="asc">Điểm tăng dần</DropdownItem>
          <DropdownItem key="desc">Điểm giảm dần</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {VoucherType[selectedType as keyof typeof VoucherType] ||
              "Theo loại voucher"}
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
