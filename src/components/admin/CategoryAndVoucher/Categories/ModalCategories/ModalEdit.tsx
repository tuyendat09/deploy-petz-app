import {
  useGetCategoriesQuery,
  useEditCategoryMutation,
} from "@/libs/features/services/categories";
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
import { useRefetchContext } from "../_store/reFetchContext";

interface ModalEditProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  categoryId?: string;
}

export default function ModalEdit({
  isDialogOpen,
  handleCloseDialog,
  categoryId,
}: ModalEditProps) {
  const { handleRefetch } = useRefetchContext();

  const { data } = useGetCategoriesQuery(categoryId);
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");
  const [editCategory, { data: mutationResponse, error: mutationError }] =
    useEditCategoryMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setEditedCategoryName(
      (data as any)?.categoryName.trim().replace(/\s+/g, " ") || "",
    );
  }, [data]);

  function handleChangeCategoryName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedCategoryName(e.target.value);
    setErrorMessage("");
  }

  function handleEditCategoryName() {
    if (
      (data as any)?.categoryName.trim().replace(/\s+/g, " ") ===
      editedCategoryName
    ) {
      handleCloseDialog();
    }
    if (categoryId && editedCategoryName) {
      editCategory({ categoryId, editCategoryName: editedCategoryName });
    }
  }

  useEffect(() => {
    if (mutationError) {
      setErrorMessage((mutationError as any).data.message);
    }
    if (mutationResponse) {
      handleRefetch();
      successModal({ content: "Sửa danh mục thành công", duration: 3 });
      handleCloseDialog();
    }
  }, [mutationResponse, mutationError]);

  console.log(mutationResponse);

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
              Chỉnh sửa danh mục
            </ModalHeader>
            <ModalBody>
              <Input
                value={editedCategoryName}
                onChange={(e) => handleChangeCategoryName(e)}
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
                color="success"
                className="rounded-full text-white"
                onPress={handleEditCategoryName}
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
