import { useDeleteSubCategoryMutation } from "@/libs/features/services/subcategories";
import { errorModal, successModal } from "@/utils/callModalANTD";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useEffect } from "react";

interface ModalAddProps {
  isDialogOpen: boolean;
  subCategoryId?: string;
  handleCloseDialog: () => void;
}

export default function ModalDelete({
  isDialogOpen,
  subCategoryId,
  handleCloseDialog,
}: ModalAddProps) {
  const [deleteCategory, { data, error: deleteError }] =
    useDeleteSubCategoryMutation();

  async function handleDeleteCategory() {
    if (subCategoryId) {
      deleteCategory({ subCategoryId: subCategoryId });
    }
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Xóa danh mục con thành công" });
      handleCloseDialog();
    }

    if (deleteError) {
      errorModal({ content: "Xóa danh mục con thất bại", duration: 3 });
    }
  }, [data, deleteError]);

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
              Xóa danh mục
            </ModalHeader>
            <ModalBody className="dark:text-white">
              <p>Bạn có chắc chắn muốn xóa danh mục</p>
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
                color="danger"
                className="rounded-full text-white"
                onPress={handleDeleteCategory}
              >
                Xóa
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
