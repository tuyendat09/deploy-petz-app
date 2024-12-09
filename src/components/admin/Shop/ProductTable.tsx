"use client";

import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tabs,
  Tab,
  Input,
  Button,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useProductActionAdmin from "./_hooks/useProductActionAdmin";
import { ProductOption } from "@/types/Product";
import ModalDelete from "./Modal/ModalDelete";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import formatMoney from "@/utils/formatMoney";
import { useSession } from "next-auth/react";
import ProductTableFilter from "./ProductTableFilter";

const columns = [
  {
    key: "productName",
    label: "TÊN SẢN PHẨM",
  },
  {
    key: "salePercent",
    label: "GIẢM GIÁ",
  },
  {
    key: "productBuy",
    label: "LƯỢT MUA",
  },
  {
    key: "productThumbnail",
    label: "ẢNH",
  },
  {
    key: "productOption",
    label: "OPTION",
  },
  {
    key: "productStatus",
    label: "TRẠNG THÁI",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function ProductTable() {
  const {
    productList,
    pages,
    totalPages,
    handleSetPage,
    handleDeleteProduct,
    deleteModalOpen,
    handleCancelDelete,
    handleConfirmDelete,
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
  } = useProductActionAdmin({ initialPage: 1 });

  const session = useSession();
  const userRole = session.data?.user.userRole;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Input
          className="w-2/3"
          onValueChange={handleSearchProduct}
          placeholder="Tên sản phẩm"
        />
        <ProductTableFilter
          setSaleFilter={setSaleFilter}
          saleFilter={saleFilter}
          setOutStockFilter={setOutStockFilter}
          outStockFilter={outStockFilter}
          setProductBuyFilter={setProductBuyFilter}
          productBuyFilter={productBuyFilter}
          subCateFilter={subCateFilter}
          setSubCateFilter={setSubCateFilter}
        />
        <Button variant="flat" onClick={handleClearQueryParams}>
          Xóa lọc
        </Button>

        <Button
          className="bg-[#f3f3f3] px-6 dark:text-black"
          variant="flat"
          isDisabled={userRole === "seller"}
        >
          <NormalTransitionLink href="/admin/add-product">
            + Thêm sản phẩm
          </NormalTransitionLink>
        </Button>
      </div>
      <Table
        aria-label="Product Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              classNames={{
                cursor: "bg-black",
              }}
              page={pages}
              total={totalPages || 1}
              onChange={(page: number) => handleSetPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="Không tìm thấy sản phẩm nào"
          items={productList || []}
        >
          {(item) => (
            <TableRow className="dark:text-white" key={item._id}>
              {(columnKey) => {
                if (columnKey === "action") {
                  return (
                    <TableCell>
                      {userRole === "seller" ? (
                        <Button
                          isDisabled={lowstockNofiLoading}
                          onClick={() => handleLowstockNofi(item._id)}
                          className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
                        >
                          Thông báo hết hàng
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleDeleteProduct(item._id)}>
                            <Icon className="size-6" icon="mdi:trash" />
                          </button>
                          <NormalTransitionLink
                            href={`shop/edit-product/${item.productSlug}`}
                          >
                            <Icon className="size-6" icon="mynaui:edit" />
                          </NormalTransitionLink>
                        </div>
                      )}
                    </TableCell>
                  );
                } else if (columnKey === "productOption") {
                  return (
                    <TableCell>
                      <Tabs aria-label="Options">
                        {item.productOption.map((option: ProductOption) => (
                          <Tab key={option._id} title={option.name}>
                            <p>Giá: {formatMoney(option.productPrice)}</p>
                            <p>Số lượng: {option.productQuantity}</p>
                          </Tab>
                        ))}
                      </Tabs>
                    </TableCell>
                  );
                } else if (columnKey === "productThumbnail") {
                  return (
                    <TableCell>
                      <Image
                        unoptimized
                        src={item.productThumbnail}
                        alt={item.productName}
                        width={500}
                        height={500}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                  );
                } else if (columnKey === "productStatus") {
                  const totalQuantity = item.productOption.reduce(
                    (sum: number, option: ProductOption) =>
                      sum + option.productQuantity,
                    0,
                  );

                  const status =
                    totalQuantity < 5 ? (
                      <span className="rounded-full bg-red-500 px-4 py-2 text-white">
                        Sắp hết hàng
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-700 px-4 py-2 text-white">
                        Còn hàng
                      </span>
                    );

                  return <TableCell>{status}</TableCell>;
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {deleteModalOpen && (
        <ModalDelete
          handleConfirmDelete={handleConfirmDelete}
          isDialogOpen={deleteModalOpen}
          handleCloseDialog={handleCancelDelete}
        />
      )}
    </div>
  );
}
