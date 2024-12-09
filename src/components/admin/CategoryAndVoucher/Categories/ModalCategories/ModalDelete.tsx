import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/libs/features/services/categories";
import { errorModal, successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRefetchContext } from "../_store/reFetchContext";

interface ModalAddProps {
  isDialogOpen: boolean;
  categoryId?: string;
  handleCloseDialog: () => void;
}

export default function ModalDelete({
  isDialogOpen,
  categoryId,
  handleCloseDialog,
}: ModalAddProps) {
  const { handleRefetch } = useRefetchContext();
  const [deleteCategory, { data, error: deleteError }] =
    useDeleteCategoryMutation();
  const { data: category } = useGetCategoriesQuery();
  const [deleteAlong, setDeleteAlong] = useState(false);
  const [newCate, setNewCate] = useState(new Set([]));

  const filteredCategories = (category as any)?.filter(
    (filterCate: any) => filterCate._id !== categoryId,
  );

  async function handleDeleteCategory() {
    if (deleteAlong) {
      // Nếu deleteAlong được chọn, tiến hành xóa mà không cần kiểm tra newCate
      if (categoryId) {
        deleteCategory({
          deleteCategoryId: categoryId,
          deleteAlong: deleteAlong,
          newCategory: null, // Không cần newCategory khi deleteAlong là true
        });
      }
    } else {
      // Nếu deleteAlong không được chọn, kiểm tra xem newCate có được chọn hay chưa
      if (formatSelectedKeys(newCate) && categoryId) {
        deleteCategory({
          deleteCategoryId: categoryId,
          deleteAlong: deleteAlong,
          newCategory: formatSelectedKeys(newCate),
        });
      } else {
        errorModal({
          content:
            "Vui lòng chọn danh mục mới để cập nhật sản phẩm và danh mục con",
          duration: 3,
        });
      }
    }
  }

  useEffect(() => {
    if (data) {
      handleRefetch();

      successModal({ content: "Xóa danh mục thành công", duration: 3 });
      handleCloseDialog();
    }
    if (deleteError) {
      errorModal({ content: "Xóa danh mục thất bại", duration: 3 });
    }
  }, [data, deleteError]);

  function handleDeleteAlong() {
    setDeleteAlong((prevState) => !prevState);
    setNewCate(new Set([]));
  }

  console.log(formatSelectedKeys(newCate));

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
              <p>Vui lòng cập nhật sản phẩm và danh mục con trước khi xóa</p>

              <Checkbox
                isSelected={deleteAlong}
                onValueChange={handleDeleteAlong}
              >
                Xóa tất cả sản phẩm - danh mục con
              </Checkbox>
              {!deleteAlong && (
                <Select
                  labelPlacement={"inside"}
                  items={(filteredCategories as any) || []}
                  label="Cập nhật danh mục cha"
                  onSelectionChange={setNewCate as any}
                  selectedKeys={newCate}
                >
                  {(category) => (
                    <SelectItem
                      className="dark:text-white"
                      key={(category as any)._id}
                    >
                      {(category as any).categoryName}
                    </SelectItem>
                  )}
                </Select>
              )}
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
