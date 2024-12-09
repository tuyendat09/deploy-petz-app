import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useEditUserShiftMutation } from "@/libs/features/services/user";
import { successModal } from "@/utils/callModalANTD";

interface ModalEditProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  userId: string;
}

export default function ModalEdit({
  isDialogOpen,
  handleCloseDialog,
  userId,
}: ModalEditProps) {
  const userShifts = [
    { startTime: "08:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "20:00" },
  ];

  const [changeUserShift, { data }] = useEditUserShiftMutation();
  const [selectedShifts, setSelectedShifts] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSelectionChange = (selectedKeys: Set<string>) => {
    const selected = Array.from(selectedKeys).map(
      (key) => userShifts[parseInt(key)],
    );
    setSelectedShifts(selected);
    setErrorMessage(""); // Xóa thông báo lỗi khi có lựa chọn
  };

  const handleSubmit = () => {
    if (selectedShifts.length === 0) {
      setErrorMessage("Ca làm việc là bắt buộc");
      return;
    }

    changeUserShift({ userId, shifts: selectedShifts });
  };

  useEffect(() => {
    if (data) {
      successModal({ content: "Thay đổi ca làm việc thành công" });
      handleCloseDialog();
    }
  }, [data]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center dark:text-white">
              Thay đổi ca làm việc
            </ModalHeader>
            <ModalBody>
              <Select
                label="Chọn ca làm việc"
                selectionMode="multiple"
                isInvalid={errorMessage ? true : false}
                errorMessage={errorMessage}
                onSelectionChange={(selectedKeys) =>
                  handleSelectionChange(selectedKeys as Set<string>)
                }
              >
                {userShifts.map((shift, index) => (
                  <SelectItem
                    className="dark:text-white"
                    key={index.toString()}
                  >
                    {`Ca ${index + 1}: Từ ${shift.startTime} đến ${shift.endTime}`}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={handleCloseDialog}
                variant="light"
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                color="success"
                className="rounded-full text-white"
                onPress={handleSubmit}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
