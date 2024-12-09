import { useGetCategoriesPaginateQuery } from "@/libs/features/services/categories";
import { useEffect, useState } from "react";
import { useRefetchContext } from "../_store/reFetchContext";

interface useGetCategoriesByPageProps {
  initialPage: number;
}

export default function useCategoriesAction({
  initialPage,
}: useGetCategoriesByPageProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const { data: categories } = useGetCategoriesPaginateQuery(pages);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteCategory, setDeleteCategory] = useState<string>("");

  useEffect(() => {
    setTotalPages(categories?.totalPages);
  }, [categories]);

  function handleSetPage(page: number) {
    setPages(page);
  }

  function handleAddCategory() {
    setAddModalOpen(true);
  }

  function handleCancelAddCategory() {
    setAddModalOpen(false);
  }

  function handleEditCategory(id: string) {
    setEditModalOpen(true);
    setEditCategory(id);
  }

  function handleCancelEdit() {
    setEditModalOpen(false);
  }

  function handleDeleteCategory(id: string) {
    setDeleteModalOpen(true);
    setDeleteCategory(id);
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  return {
    categories,
    pages,
    totalPages,
    handleSetPage,
    handleEditCategory,
    handleCancelEdit,
    editCategory,
    editModalOpen,
    addModalOpen,
    handleAddCategory,
    handleCancelAddCategory,
    deleteModalOpen,
    handleDeleteCategory,
    deleteCategory,
    handleCancelDelete,
  };
}
