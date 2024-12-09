import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  SelectItem,
  Select,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";

import { useUserContext } from "./_store/UserContext";
import { User, UserRole } from "@/types/User";
import { useSession } from "next-auth/react";
import ModalEdit from "./Modal/EditModal";

const columns = [
  {
    key: "username",
    label: "USERNAME",
  },
  {
    key: "displayName",
    label: "TÊN HIỂN THỊ",
  },
  {
    key: "userEmail",
    label: "EMAIL USER",
  },
  {
    key: "userRole",
    label: "ROLE",
  },

  {
    key: "userPoint",
    label: "ĐIỂM USER",
  },
  {
    key: "userShift",
    label: "CA LÀM VIỆC HIỆN TẠI",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function BookingsTable() {
  const {
    userList,
    handleSetPage,
    page,
    totalPages,
    handleChangeUserRole,
    changeShift,
    editUserId,
    handleCancelChangeShift,
    handleChangeShift,
  } = useUserContext();

  const session = useSession();
  const userId = session.data?.user._id;
  const currentRole = session?.data?.user.userRole;

  return (
    <>
      <div className="mt-4">
        <Table
          className="dark:text-white"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                classNames={{
                  cursor: "bg-black",
                }}
                total={totalPages}
                onChange={(page) => handleSetPage(page)}
              />
            </div>
          }
          aria-label="Example table with dynamic content"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="Không tìm người dùng nào"
            items={userList?.data || []}
          >
            {(user: User) => (
              <TableRow key={user._id}>
                {(columnKey) => {
                  if (columnKey === "displayName") {
                    return (
                      <TableCell>
                        {user.displayName || "Chưa có tên hiển thị"}
                      </TableCell>
                    );
                  }
                  if (columnKey === "userRole") {
                    return (
                      <TableCell>
                        <Select
                          onSelectionChange={(value) => {
                            handleChangeUserRole(user._id, value as any);
                          }}
                          isDisabled={
                            user._id === userId || user.userRole === "admin"
                          }
                          disabledKeys={
                            currentRole === "manager"
                              ? ["admin", "manager"]
                              : ["admin"]
                          }
                          defaultSelectedKeys={[user.userRole]}
                          label="Role"
                        >
                          {Object.keys(UserRole).map((userRole) => (
                            <SelectItem
                              className="dark:text-white"
                              key={userRole}
                              value={userRole}
                            >
                              {UserRole[userRole as keyof typeof UserRole]}
                            </SelectItem>
                          ))}
                        </Select>
                      </TableCell>
                    );
                  }
                  if (columnKey === "userShift") {
                    if (["admin", "manager", "user"].includes(user.userRole)) {
                      return (
                        <TableCell className="text-[12px]">
                          Không phải nhân viên
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell>
                        {user.userShift.length > 0
                          ? user.userShift.map((shift: any, index) => (
                              <p className="mb-1 text-[12px]" key={shift._id}>
                                Thời gian: {shift.startTime} - {shift.endTime}
                              </p>
                            ))
                          : "Chưa có ca làm việc"}
                      </TableCell>
                    );
                  }
                  if (columnKey === "action") {
                    const notEmployee = ["admin", "manager", "user"].includes(
                      user.userRole,
                    );
                    return (
                      <TableCell>
                        <Button
                          onClick={() => handleChangeShift(user._id)}
                          isDisabled={notEmployee}
                          className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
                        >
                          Sửa ca
                        </Button>
                      </TableCell>
                    );
                  }
                  return <TableCell>{getKeyValue(user, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {changeShift && (
          <ModalEdit
            handleCloseDialog={handleCancelChangeShift}
            userId={editUserId}
            isDialogOpen={changeShift}
          />
        )}
      </div>
    </>
  );
}
