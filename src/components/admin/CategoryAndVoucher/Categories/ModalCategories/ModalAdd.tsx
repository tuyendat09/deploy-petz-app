import { useAddCategoryMutation } from "@/libs/features/services/categories";
import { successModal } from "@/utils/callModalANTD";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ModalAddProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

export default function ModalAdd({
  isDialogOpen,
  handleCloseDialog,
}: ModalAddProps) {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [addCategory, { data, error: mutationError }] =
    useAddCategoryMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleChangeCategoryName(e: React.ChangeEvent<HTMLInputElement>) {
    if (errorMessage) setErrorMessage("");
    setNewCategoryName(e.target.value);
  }

  // Handle adding the category
  function handleAddCategory() {
    if (!newCategoryName.trim()) {
      setErrorMessage("Tên danh mục không được để trống");
    } else {
      addCategory({ newCategoryName: newCategoryName });
    }
  }

  useEffect(() => {
    if (mutationError) {
      setErrorMessage((mutationError as any).data?.message);
    }
    if (data) {
      setNewCategoryName("");
      handleCloseDialog();
      successModal({ content: "Thêm danh mục thành công", duration: 3 });
    }
  }, [mutationError, data, handleCloseDialog]);

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
              Thêm danh mục mới
            </ModalHeader>
            <ModalBody>
              <Input
                value={newCategoryName}
                onChange={handleChangeCategoryName}
                placeholder="Nhập tên danh mục mới"
                errorMessage={errorMessage}
                isInvalid={errorMessage === "" ? false : true}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCloseDialog}
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                className="rounded-full text-white"
                color="success"
                onPress={handleAddCategory}
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
