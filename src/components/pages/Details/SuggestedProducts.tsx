import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { useGetProductsQuery } from "@/libs/features/services/product";
import Image from "next/image";
import { useCursorHover } from "@/components/ui/Cursor/_store/CursorContext";

export default function SuggestedProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  const { handleMouseEnterLink, handleMouseLeaveLink } = useCursorHover();

  const { data } = useGetProductsQuery({
    productCategory: categoryId,
    limit: 4,
  });
  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };
  return (
    <div>
      <div className="flex flex-row gap-[10px]">
        {data?.products.slice(0, 4).map((item: any, i: number) => {
          return (
            <div
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
              key={item._id}
            >
              <NormalTransitionLink href={`/shop/${item.productSlug}`}>
                <Image
                  unoptimized
                  src={item.productThumbnail}
                  width={300}
                  height={300}
                  alt=""
                />
                <div className="flex flex-col items-center justify-center">
                  <h2>{item?.productName}</h2>
                  <p>{formatCurrency(item?.productOption[0].productPrice)}</p>
                </div>
              </NormalTransitionLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
