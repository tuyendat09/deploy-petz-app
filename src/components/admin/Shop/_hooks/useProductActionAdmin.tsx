import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getProduct, deleteProduct } from "@/apis/product"; // Your custom API function
import { errorModal, successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import {
  QueryParams,
  useLowstockNofiMutation,
} from "@/libs/features/services/product";

interface UseGetProductProps {
  initialPage: number;
}

export default function useProductActionAdmin({
  initialPage,
}: UseGetProductProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [productList, setProductList] = useState<Product[]>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [saleFilter, setSaleFilter] = useState(new Set(["Giảm giá"]));
  const [outStockFilter, setOutStockFilter] = useState(new Set(["Tình trạng"]));
  const [productBuyFilter, setProductBuyFilter] = useState(
    new Set(["Lượt mua"]),
  );
  const [subCateFilter, setSubCateFilter] = useState(new Set(["Danh mục"]));
  const [lowstockNofi, { data, error, isLoading: lowstockNofiLoading }] =
    useLowstockNofiMutation();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProduct({
        page: pages,
        limit: 25,
        ...queryParams,
      });
      setTotalPages(response?.totalPages);
      setProductList(response?.products);
    };
    fetchProducts();
  }, [pages, queryParams]);

  function handleSetPage(page: number) {
    setPages(page);
  }

  const handleDeleteProduct = (productId: string) => {
    setDeleteProductId(productId); // Save the product ID for deletion
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  async function handleConfirmDelete() {
    if (deleteProductId) {
      try {
        await deleteProduct(deleteProductId);
        setDeleteModalOpen(false);
        setProductList((prevList) =>
          prevList?.filter((product) => product._id !== deleteProductId),
        );
        successModal({ content: "Xóa sản phẩm thành công", duration: 3 });
      } catch (error) {
        errorModal({ content: "Xóa sản phẩm thất bại", duration: 3 });
      }
    }
  }

  const handleSearchProduct = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => {
        const { productName, ...rest } = prev; //
        return rest;
      });
    } else {
      setQueryParams((prev) => ({
        ...prev,
        productName: value,
      }));
    }
  };

  useEffect(() => {
    if (formatSelectedKeys(saleFilter) !== "Giảm giá") {
      setQueryParams((prev) => ({
        ...prev,
        salePercent: formatSelectedKeys(saleFilter) as any,
      }));
    }
    if (formatSelectedKeys(outStockFilter) !== "Tình trạng") {
      setQueryParams((prev) => ({
        ...prev,
        lowStock: (formatSelectedKeys(outStockFilter) as any) == 1 && true,
      }));
    }
    if (formatSelectedKeys(productBuyFilter) !== "Lượt mua") {
      setQueryParams((prev) => ({
        ...prev,
        sortBy: formatSelectedKeys(productBuyFilter) as any,
      }));
    }
    if (formatSelectedKeys(subCateFilter) !== "Danh mục") {
      setQueryParams((prev) => ({
        ...prev,
        productSubCategory: formatSelectedKeys(subCateFilter) as any,
      }));
    }
  }, [saleFilter, outStockFilter, productBuyFilter, subCateFilter]);

  function handleClearQueryParams() {
    setQueryParams({});
    setSaleFilter(new Set(["Giảm giá"]));
    setOutStockFilter(new Set(["Tình trạng"]));
    setProductBuyFilter(new Set(["Lượt mua"]));
    setSubCateFilter(new Set(["Danh mục"]));
  }

  function handleLowstockNofi(productId: string) {
    setTimeout(() => {
      lowstockNofi(productId);
    }, 1000);
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Gửi thông báo thành công" });
    }
  }, [data]);

  return {
    productList,
    totalPages,
    pages,
    handleSetPage,
    handleDeleteProduct,
    handleCancelDelete,
    handleConfirmDelete,
    deleteProduct,
    deleteModalOpen,
    handleSearchProduct,
    setSaleFilter,
    saleFilter,
    outStockFilter,
    setOutStockFilter,
    handleClearQueryParams,
    setProductBuyFilter,
    productBuyFilter,
    subCateFilter,
    setSubCateFilter,
    handleLowstockNofi,
    lowstockNofiLoading,
  };
}
