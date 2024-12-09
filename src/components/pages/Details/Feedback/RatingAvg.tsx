import { Icon } from "@iconify/react/dist/iconify.js";

export default function RatingAvg({ avgRating }: { avgRating: number }) {
  return (
    <div className="flex flex-col">
      <h4>Đánh giá trung bình của sản phẩm</h4>
      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-h2 font-bold">{avgRating.toFixed(1) || 0} </h3>
          <div className="flex items-center gap-0.5 rounded-[20px] bg-yellow-500 px-4 py-1 text-[12px] text-white">
            <Icon icon="prime:star-fill" />
            <Icon icon="prime:star-fill" />
            <Icon icon="prime:star-fill" />
            <Icon icon="prime:star-fill" />
            <Icon icon="prime:star-fill" />
          </div>
        </div>
        <p className="text-[14px] text-gray-500">
          Đánh giá của khách hàng dành cho sản phẩm này
        </p>
      </div>
    </div>
  );
}
