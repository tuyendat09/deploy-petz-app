import { Icon } from "@iconify/react/dist/iconify.js";
import { Select } from "antd";
import { useCallback, useState } from "react";
import "./index.css";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { useRouter } from "next/navigation";
import CDrawer from "@/components/ui/Drawer";
import ReactPagination from "@/components/ui/ReactPagination";
import { useGetShopQuery } from "@/libs/features/services/shop";

export const Filter = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [sortVal, setSortVal] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const router = useRouter();
  const queryParams = {
    page,
    search: searchVal,
    limit: 12,
    sortBy: sortVal,
    size: filters,
    fromPrice: priceRange.from.replace(/,/g, ""),
    toPrice: priceRange.to.replace(/,/g, ""),
    productCategory: category,
  };
  const { refetch, data, isLoading } = useGetShopQuery(queryParams);
  const [activeIndexes, setActiveIndexes] = useState<number[]>(
    data?.products?.map(() => 0) || [],
  );

  const onClose = () => {
    setOpen(false);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchVal(query);
    if (query) {
      router.push(`/shop?productName=${encodeURIComponent(query)}`);
    } else {
      router.push("/shop");
    }
  };
  const onSwiper = () => {};

  const onSlideChange = (swiper: SwiperCore, key: number) => {
    setActiveIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[key] = swiper.activeIndex;
      return newIndexes;
    });
  };
  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };
  const [priceIndices, setPriceIndices] = useState(
    Array.isArray(data) ? data.map(() => 0) : [-1],
  );
  const handleSelectPriceIndex = (index: number, productIndex: number) => {
    const updatedPriceIndices = [...priceIndices];
    updatedPriceIndices[0] = index;
    updatedPriceIndices[1] = productIndex;
    setPriceIndices(updatedPriceIndices);
  };

  const handleSort = (value: string) => {
    setSortVal(value);
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page ?? 1);
    },
    [],
  );
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <button
            onClick={() => setOpen(true)}
            className="flex flex-row items-center gap-[5px] bg-[#eff0e8] px-[20px] py-[8px] font-[600]"
          >
            <Icon icon="system-uicons:filtering" width={20} />
            Bộ lọc
          </button>
        </div>
        <div className="flex flex-row items-center gap-[30px]">
          <div className="relative">
            <Icon
              icon="lets-icons:search-alt-light"
              width={25}
              className="absolute left-[4px] top-[5px]"
            />
            <input
              placeholder="Tìm kiếm theo tên"
              value={searchVal}
              onInput={handleSearch}
              className="h-[36px] rounded-[5px] border border-[#e9eaeb] pl-[30px] pr-[10px] outline-none placeholder:text-[14px] placeholder:font-[400]"
            />
          </div>
          <div className="flex flex-row items-center gap-[10px]">
            <span>Sort by:</span>
            <Select
              className="custom-sort h-[36px] w-[180px]"
              showSearch
              placeholder="Tất cả"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleSort}
              options={[
                { value: "0", label: "Tất cả" },
                { value: "1", label: "Bán chạy nhất" },
                { value: "2", label: "Mới nhất" },
                { value: "3", label: "Theo giá: từ cao đến thấp" },
                { value: "4", label: "Theo giá: từ thấp đến cao" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mb-[50px] mt-[20px]">
        <div className="grid grid-cols-4 gap-x-[15px] gap-y-[40px]">
          {data?.products?.map((item, index) => {
            const rating = (item?.productRating / item?.ratingCount).toFixed(1);
            return (
              <div
                key={index}
                onClick={() => router.push(`/shop/${item.productSlug}`)}
                className="flex cursor-pointer flex-col gap-[10px]"
              >
                <div className="swiper-container relative w-[352px]">
                  <button className={`swiper-button-prev-${index}`}>
                    <Icon icon="uil:angle-left" width={22} />
                  </button>
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                      prevEl: `.swiper-button-prev-${index}`,
                      nextEl: `.swiper-button-next-${index}`,
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={onSwiper}
                    onSlideChange={(swiper) => onSlideChange(swiper, index)}
                    initialSlide={activeIndexes[index]}
                  >
                    {item?.productImages?.map((img, imgKey) => (
                      <SwiperSlide key={imgKey}>
                        <Image
                          src={img}
                          width={352}
                          height={510}
                          className="h-[510px] rounded-[10px]"
                          alt={`Image ${imgKey}`}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className={`swiper-button-next-${index}`}>
                    <Icon icon="uis:angle-right" width={22} />
                  </button>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/shop/${item._id}`)}
                >
                  <div className="flex flex-row items-center gap-[5px]">
                    <div className="flex flex-row gap-[2px]">
                      {Number(rating) > 0 &&
                        Array(Math.floor(Number(rating)))
                          .fill(null)
                          .map((_, index) => (
                            <Icon key={index} icon="tdesign:star-filled" />
                          ))}
                    </div>
                    <div>
                      {Number(rating) > 0
                        ? Number(rating)
                        : 0 + " lượt đánh giá"}
                    </div>
                    <div>
                      {Number(item.ratingCount) > 0 && (
                        <b className="font-[500]">({item.ratingCount})</b>
                      )}
                    </div>
                  </div>
                  <h1 className="text-[18px] font-[500]">
                    {item?.productName}
                  </h1>
                </div>
                <div>
                  {priceIndices.length === 0 || priceIndices[0] !== index
                    ? formatCurrency(item.productOption[0].productPrice)
                    : item?.productOption[priceIndices[1]]?.productPrice &&
                      priceIndices[0] === index &&
                      formatCurrency(
                        item.productOption[priceIndices[1]].productPrice,
                      )}
                </div>
                <div className="flex flex-row gap-[10px]">
                  {item?.productOption.map(
                    (option: any, optionIndex: number) => {
                      const isActive =
                        priceIndices[1] === optionIndex &&
                        priceIndices[0] === index;
                      return (
                        <button
                          onClick={() =>
                            handleSelectPriceIndex(index, optionIndex)
                          }
                          className={`rounded-[3px] border border-black px-[10px] py-[2px] text-black ${isActive ? "bg-black text-white" : "bg-white text-black"}`}
                          key={optionIndex}
                        >
                          {option?.name}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {data && data?.totalPages > 1 && (
        <ReactPagination
          totalPages={data?.totalPages}
          handlePageChange={handlePageChange}
          pageNumber={page}
          className="pagination-custom"
        />
      )}
      <CDrawer
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
        category={category}
        setCategory={setCategory}
        open={open}
        onClose={onClose}
      />
    </>
  );
};
