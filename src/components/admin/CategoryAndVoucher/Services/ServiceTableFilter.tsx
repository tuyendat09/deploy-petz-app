import { ServicesType } from "@/types/Services";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ButtonAdmin from "../../UI/Sidebar/ButtonAdmin";

interface ServiceTableFilterProps {
  setSelectedKeys: any;
  selectedValue: any;
  clearQueryParams: any;
  setbookingOrder: any;
  bookingOrderSelect: any;
}

export default function ServiceTableFilter({
  setSelectedKeys,
  selectedValue,
  clearQueryParams,
  setbookingOrder,
  bookingOrderSelect,
}: ServiceTableFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button variant="flat">
            {ServicesType[selectedValue as keyof typeof ServicesType] ||
              "Loại dịch vụ"}
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
          {Object.keys(ServicesType).map((statusKey) => (
            <DropdownItem className="dark:text-white" key={statusKey}>
              {ServicesType[statusKey as keyof typeof ServicesType]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button variant="flat">Sắp xếp theo lượt đặt</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setbookingOrder as any}
        >
          <DropdownItem className="dark:text-white" key="asc">
            Lượt booking tăng dần
          </DropdownItem>
          <DropdownItem className="dark:text-white" key="desc">
            Lượt booking giảm dần
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button variant="flat" onClick={clearQueryParams}>
        Xóa lọc
      </Button>
    </div>
  );
}
