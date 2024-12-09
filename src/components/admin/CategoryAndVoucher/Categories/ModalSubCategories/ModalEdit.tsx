import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import {
  useEditSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/libs/features/services/subcategories";
import { successModal } from "@/utils/callModalANTD";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRefetchContext } from "../_store/reFetchContext";

interface ModalEditProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  subCategoryId?: string;
}

export default function ModalEdit({
  isDialogOpen,
  handleCloseDialog,
  subCategoryId,
}: ModalEditProps) {
  const { data: categories } = useGetCategoriesQuery();
  const { data } = useGetSubCategoriesQuery({ subCategoryId: subCategoryId });
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [oldCate, setOldCate] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const [editSubCategory, { data: mutationResponse, error: mutationError }] =
    useEditSubCategoryMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setEditSubCategoryName(data[0]?.subCategoryName);
      setOldCate(data[0].categoryId);
      setCurrentCategory(data[0].categoryId);
    }
  }, [data]);

  function handleChangeSubCategoryName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditSubCategoryName(e.target.value);
  }

  function handleEditSubCategoryName() {
    const isNameUnchanged =
      data &&
      data[0]?.subCategoryName.trim().replace(/\s+/g, " ") ===
        editSubCategoryName.trim().replace(/\s+/g, " ");

    const isCategoryUnchanged = oldCate === currentCategory;

    if (isNameUnchanged && isCategoryUnchanged) {
      return handleCloseDialog();
    }

    if (subCategoryId && editSubCategoryName) {
      editSubCategory({
        editSubCategoryId: subCategoryId,
        newCategoryId: currentCategory,
        newSubCategoryName: editSubCategoryName,
      });
    }
  }

  useEffect(() => {
    if (mutationError) {
      setErrorMessage((mutationError as any).data.message);
      console.log(mutationError);
    }
    if (mutationResponse) {
      successModal({ content: "Sửa danh mục thành công", duration: 3 });
      handleCloseDialog();
    }
  }, [mutationResponse, mutationError, handleCloseDialog]);

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
              Chỉnh sửa danh mục con
            </ModalHeader>
            <ModalBody>
              <Select
                labelPlacement={"inside"}
                items={(categories as any) || []}
                label="Danh mục cha"
                className="w-full"
                selectedKeys={[currentCategory]}
                onSelectionChange={(keys) =>
                  setCurrentCategory(Array.from(keys)[0] as string)
                }
              >
                {(category) => (
                  <SelectItem key={(category as any)._id}>
                    {(category as any).categoryName}
                  </SelectItem>
                )}
              </Select>
              <Input
                label="Tên danh mục chỉnh sửa"
                value={editSubCategoryName}
                onChange={(e) => handleChangeSubCategoryName(e)}
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
                onPress={handleEditSubCategoryName}
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
