import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { useUserContext } from "./_store/UserContext";
import { UserRole } from "@/types/User";

export default function UserFilter() {
  const {
    roleFilter,
    setRoleFilter,
    handleClearQueryParams,
    handleUsernameSearch,
    handleEmailUserSearch,
  } = useUserContext();

  return (
    <div className="flex items-center gap-4">
      <Input
        onValueChange={handleUsernameSearch}
        className="w-1/3"
        placeholder="Tìm theo username"
      />
      <Input
        onValueChange={handleEmailUserSearch}
        className="w-1/3"
        placeholder="Tìm theo email"
      />

      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button
            variant="bordered"
            className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
          >
            {UserRole[
              formatSelectedKeys(roleFilter) as keyof typeof UserRole
            ] || "Theo Role"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setRoleFilter as any}
        >
          {Object.keys(UserRole).map((statusKey) => (
            <DropdownItem className="dark:text-white" key={statusKey}>
              {UserRole[statusKey as keyof typeof UserRole]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Button variant="flat" onClick={handleClearQueryParams}>
        Xóa lọc
      </Button>
    </div>
  );
}
