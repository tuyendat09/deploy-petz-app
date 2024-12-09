import { useCancelBookingMutation } from "@/libs/features/services/booking";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

interface ModalCancelBookingProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  bookingId: string;
}

export default function ModalCancelBooking({
  isDialogOpen,
  handleCloseDialog,
  bookingId,
}: ModalCancelBookingProps) {
  const [cancelBooking] = useCancelBookingMutation();

  function handleCancelBooking() {
    cancelBooking({ bookingId: bookingId });
    handleCloseDialog();
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
              Bạn có chắc chắn muốn hủy đặt lịch
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
                onPress={handleCancelBooking}
              >
                Hủy đặt lịch
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
