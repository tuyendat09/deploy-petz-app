import {
  Button,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useBookingContext } from "./store/BookingContext";
import { BookingStatus } from "@/types/Booking";

export default function BookingsFilter() {
  const {
    handleDateChange,
    handleClearDate,
    handleCustomerNameSearch,
    selectedValue,
    setSelectedKeys,
  } = useBookingContext();

  return (
    <div className="mt-16 border-t-1 pt-12">
      <h1 className="mb-4 text-2xl font-semibold dark:text-white">
        Danh sách dịch vụ
      </h1>
      <div className="mb-6 flex items-center gap-4">
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
            <Button variant="flat" className="capitalize">
              {BookingStatus[selectedValue as keyof typeof BookingStatus] ||
                "Status"}
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
            {Object.keys(BookingStatus).map((statusKey) => (
              <DropdownItem className="dark:text-white" key={statusKey}>
                {BookingStatus[statusKey as keyof typeof BookingStatus]}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button variant="flat" onClick={handleClearDate}>
          Xóa lọc
        </Button>
      </div>
    </div>
  );
}
