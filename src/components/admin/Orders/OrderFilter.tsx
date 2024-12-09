import {
  Button,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useOrderContext } from "./store/OrderContext";
import { OrderStatus } from "@/types/Order";
import formatSelectedKeys from "@/utils/formatSelectedValue";

enum SortValue {
  desc = "Tăng dần",
  asc = "Giảm dần",
}

enum userType {
  yes = "Khách đăng ký",
  no = "Khách lẻ",
}

export default function OrderFilter() {
  const {
    handleDateChange,
    handleClearDate,
    handleCustomerNameSearch,
    statusFilter,
    setStatusFilter,
    orderTotalFilter,
    productQuantityFilter,
    userFilter,
    setProductQuantityFilter,
    setOrderTotalFilter,
    setUserFilter,
  } = useOrderContext();

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        className="w-1/2"
        aria-label="Chọn ngày"
        onChange={(date) => handleDateChange(date as any)}
      />
      <Input
        onValueChange={handleCustomerNameSearch}
        className="w-1/2"
        placeholder="Tên khách hàng"
      />

      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button
            className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
            variant="bordered"
          >
            {OrderStatus[
              formatSelectedKeys(statusFilter) as keyof typeof OrderStatus
            ] || "Status"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setStatusFilter as any}
        >
          {Object.keys(OrderStatus).map((statusKey) => (
            <DropdownItem className="dark:text-white" key={statusKey}>
              {OrderStatus[statusKey as keyof typeof OrderStatus]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button
            variant="bordered"
            className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
          >
            {SortValue[
              formatSelectedKeys(orderTotalFilter) as keyof typeof SortValue
            ] || "Tổng tiền"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setOrderTotalFilter as any}
        >
          <DropdownItem className="dark:text-white" key="desc">
            Tổng tiền giảm dần
          </DropdownItem>
          <DropdownItem className="dark:text-white" key="asc">
            Tổng tiền tăng dần
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button
            variant="bordered"
            className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
          >
            {userType[
              formatSelectedKeys(userFilter) as keyof typeof userType
            ] || "Khách"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setUserFilter as any}
        >
          <DropdownItem className="dark:text-white" key="no">
            Khách lẻ
          </DropdownItem>
          <DropdownItem className="dark:text-white" key="yes">
            Khách có đăng ký
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button variant="flat" onClick={handleClearDate}>
        Xóa lọc
      </Button>
    </div>
  );
}
