import Image from "next/image";

import { useMemo } from "react";
import Link from "next/link";
import calculateSalePrice from "@/utils/caculateSalePrice";
import formatMoney from "@/utils/formatMoney";

interface SearchProductProps {
  productImg: string;
  productSalePercent: number;
  productName: string;
  productPrice: number;
  productSlug: string;
}

export default function SearchProduct({
  productImg,
  productSalePercent,
  productSlug,
  productName,
  productPrice,
}: SearchProductProps) {
  const { salePrice } = useMemo(() => {
    return calculateSalePrice(productSalePercent, productPrice);
  }, [productSalePercent, productPrice]);

  return (
    <div className="flex items-center gap-4 text-white">
      <Link href={`/shop/${productSlug}`} className="w-32">
        <Image
          priority
          className="object-contain"
          src={productImg}
          alt="Product Image"
          width={150}
          unoptimized
          height={150}
        ></Image>
      </Link>
      <div>
        <p className="text-xl">{productName}</p>
        <span className="text-sm">{formatMoney(salePrice)}</span>
      </div>
    </div>
  );
}
