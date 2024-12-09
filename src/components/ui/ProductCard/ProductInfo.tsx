import { ProductOption } from "@/types/Product";

import calculateSalePrice from "@/utils/caculateSalePrice";
import formatMoney from "@/utils/formatMoney";
import { memo } from "react";
interface ProductInfoProps {
  productName: string;
  subCategoryId: string;
  salePercent: number;
  productOption: ProductOption[];
}

const ProductInfo = memo(
  ({ productName, productOption, salePercent }: ProductInfoProps) => {
    const productPrice = productOption[0].productPrice;
    const { salePrice } = calculateSalePrice(salePercent, productPrice);

    return (
      <div className="absolute bottom-4 left-4 flex items-center justify-between text-left">
        <div>
          <h2 className="flex justify-between font-serif text-[14px] text-black lg:text-h4">
            {productName}
          </h2>
          <h2 className="lg text-[12px] text-gray-500 lg:text-base">
            <span>{formatMoney(salePrice)}</span>
            <span className="ml-2 text-gray-400">
              {`(${productOption.length} lựa chọn)`}
            </span>
          </h2>
        </div>
      </div>
    );
  },
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
