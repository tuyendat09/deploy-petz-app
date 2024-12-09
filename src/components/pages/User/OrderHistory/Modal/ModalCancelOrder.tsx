import { useCancelBookingMutation } from "@/libs/features/services/booking";
import { useCancelOrderMutation } from "@/libs/features/services/order";
import { successModal } from "@/utils/callModalANTD";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

interface ModalCancelOrderProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  orderId: string;
}

export default function ModalCancelOrder({
  isDialogOpen,
  handleCloseDialog,
  orderId,
}: ModalCancelOrderProps) {
  const [cancelOrder] = useCancelOrderMutation();

  function handleCancelOrder() {
    cancelOrder({ orderId: orderId });
    handleCloseDialog();
    successModal({ content: "Hủy đơn thành công", duration: 3 });
  }

  return (
    <Modal
      backdrop="blur"
      onClose={handleCloseDialog}
      isOpen={isDialogOpen}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center">
              Bạn có chắc chắn muốn hủy đơn hàng
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Đóng
              </Button>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCancelOrder}
              >
                Hủy đơn
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
