import { useDeleteServiceMutation } from "@/libs/features/services/services";
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
  serviceId?: string;
  handleCloseDialog: () => void;
}

export default function ModalDelete({
  isDialogOpen,
  serviceId,
  handleCloseDialog,
}: ModalAddProps) {
  const [deleteService, { data }] = useDeleteServiceMutation();

  async function handleDeleteCategory() {
    if (serviceId) {
      await deleteService({ deleteServiceId: serviceId });
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
            <ModalHeader className="text-center">Xóa dịch vụ</ModalHeader>
            <ModalBody>
              <p>Bạn có chắc chắn muốn xóa dịch vụ này</p>
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
                className="rounded-full"
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
