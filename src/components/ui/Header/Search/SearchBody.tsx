import Link from "next/link";

interface SearchBodyProps {
  children: React.ReactNode;
  productAmount: number;
}

export default function SearchBody({
  children,
  productAmount,
}: SearchBodyProps) {
  return (
    <div className="h-96 space-y-4 overflow-y-auto p-4 text-white">
      <div className="flex items-center pb-5">
        <div>
          <span className="text-[14px]">Sản phẩm</span>
          <span className="text-sm"> {`(${productAmount})`}</span>
        </div>
        <Link
          className="ml-auto border-b border-transparent text-sm transition duration-300 hover:border-gray-500"
          href="/shop"
        >
          Xem tất cả
        </Link>
      </div>
      {children}
    </div>
  );
}
