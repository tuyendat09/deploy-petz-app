import { useDeleteSubCategoryMutation } from "@/libs/features/services/subcategories";
import { useDeleteVoucherMutation } from "@/libs/features/services/voucher";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

interface ModalAddProps {
  isDialogOpen: boolean;
  voucherId: string;
  handleCloseDialog: () => void;
}

export default function ModalDelete({
  isDialogOpen,
  voucherId,
  handleCloseDialog,
}: ModalAddProps) {
  const [deleteVoucher, { data }] = useDeleteVoucherMutation();

  async function handleDeleteCategory() {
    if (voucherId) {
      await deleteVoucher({ deleteVoucherId: voucherId });
      handleCloseDialog();
    }
  }

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
      <ModalContent className="dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="text-center">Xóa voucher</ModalHeader>
            <ModalBody>
              <p>Bạn có chắc chắn muốn xóa voucher</p>
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
                className="rounded-full bg-black text-white"
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
