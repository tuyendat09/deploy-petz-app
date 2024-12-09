import ResponsiveImage from "@/components/ui/ResponsiveImage";
import formatMoney from "@/utils/formatMoney";
import React from "react";

interface ProductOption {
  name: string;
  productPrice: number;
  productQuantity: number;
  _id: string;
}

interface ProductId {
  _id: string;
  productName: string;
  salePercent: number;
  productBuy: number;
  productSlug: string;
  productThumbnail: string;
  productImages: string[];
  productCategory: string;
  productSubCategory: string;
  productDescription: string;
  productOption: ProductOption[];
  productDetailDescription: string;
  productRating: number;
  ratingCount: number;
  __v: number;
}

interface ProductData {
  _id: string;
  productId: ProductId;
  productQuantity: number;
}

interface OrderDetailProductProps {
  product: ProductData[];
}

export default function OrderDetailProduct({
  product,
}: OrderDetailProductProps) {
  product;
  return (
    <>
      {product &&
        product.map((data) => {
          const selectedOption =
            data &&
            data?.productId?.productOption.find(
              (option) => option.name === (data as any).productOption,
            );

          const isOnSale = data.productId.salePercent > 0;
          const salePrice = isOnSale
            ? (selectedOption?.productPrice || 0) *
              ((100 - data.productId.salePercent) / 100)
            : selectedOption?.productPrice || 0;

          const totalPrice = salePrice * data.productQuantity;

          return (
            <div
              key={data.productId._id}
              className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8"
            >
              <div className="w-full pb-4 md:w-40 md:pb-8">
                <ResponsiveImage
                  unoptimized
                  additionClass="hidden w-full md:block"
                  imageSrc={data.productId.productThumbnail as any}
                  altImage="Product Img"
                  imageHeight={500}
                  imageWidth={500}
                />
              </div>
              <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
                <div className="flex w-full flex-col items-start justify-start space-y-8">
                  <h3 className="text-xl font-semibold leading-6 text-gray-800 xl:text-2xl">
                    {data.productId.productName}
                  </h3>
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="space-x-2 text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Giá: </span>
                      {isOnSale ? (
                        <>
                          <span>{formatMoney(salePrice)}</span>
                          <del>{formatMoney(selectedOption?.productPrice)}</del>
                        </>
                      ) : (
                        <span>
                          {formatMoney(selectedOption?.productPrice)} VNĐ
                        </span>
                      )}
                    </p>
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Số lượng: </span>
                      {(data as any).productOption} x {data.productQuantity}{" "}
                      {`(${formatMoney(totalPrice)})`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
