"use client";
import React, { useEffect } from "react";
import { useGetProductsQuery } from "@/libs/features/services/product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import "./index.css";
import SuggestedProducts from "@/components/pages/Details/SuggestedProducts";
import { useAddItemToCartMutation } from "@/libs/features/services/cart";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useCursorHover } from "@/components/ui/Cursor/_store/CursorContext";
import Link from "next/link";
import Feedback from "@/components/pages/Details/Feedback/Feedback";
export const Index = () => {
  const { slug } = useParams();
  const [addToCart, { data: newCart }] = useAddItemToCartMutation();
  const productSlug = Array.isArray(slug) ? slug[0] : slug;
  const { data, error, isLoading } = useGetProductsQuery({ productSlug });
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [option, setOption] = useState("");
  const session = useSession();
  const { update: sessionUpdate } = useSession();
  const userId = session.data?.user?._id;
  const [messageApi, contextHolder] = message.useMessage();
  const { handleMouseEnterActionButton, handleMouseLeaveActionButton } =
    useCursorHover();

  useEffect(() => {
    document.body.classList.remove("dark");

    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  const success = () => {
    message.success(
      <div>
        Thêm giỏ hàng thành công.{" "}
        <Link href="/cart" className="text-blue-400">
          Xem giỏ hàng
        </Link>
      </div>,
    );
  };
  const handleQuantity = (action: string) => {
    if (action === "increase") {
      if (quantity < maxQuantity) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };
  const handleAddToCart = (
    name: string,
    id: string,
    price: number,
    salePercent: number,
  ) => {
    const cart_obj = {
      productName: name,
      productId: id,
      productPrice: price,
      salePercent: salePercent,
      productQuantity: quantity,
      productOption: option
        ? option
        : data?.products[0]?.productOption[0]?.name,
      productImage: data?.products[0]?.productThumbnail,
      cartId: session.data?.user?.userCart?._id || null,
      userId: userId,
    };
    addToCart(cart_obj);
    success();
  };

  useEffect(() => {
    if (newCart) {
      sessionUpdate({
        ...session,
        user: {
          ...session?.data?.user,
          userCart: newCart,
        },
      });
    }
  }, [newCart]);

  return (
    <div className="bg-[#F4F2EE] px-[20px] py-[110px]">
      {data?.products?.map((item, i) => {
        const originalPrice = Math.round(
          item?.productOption[index]?.productPrice /
            ((100 - item.salePercent) / 100),
        );
        return (
          <div key={i}>
            <div className="flex flex-row items-center justify-between">
              <div className="w-[35%]">
                <div className="flex flex-row items-center justify-between gap-[20px]">
                  <h1 className="text-[40px] font-black leading-[40px]">
                    {item.productName}
                  </h1>
                  <span className="bg-[#dc633a] px-[15px] py-[4px] text-[14px] font-[500] text-white">
                    -{item.salePercent}%
                  </span>
                </div>
                <div className="mt-[50px] flex w-[500px] flex-row items-center justify-between rounded-[25px] bg-black pr-[30px] text-white">
                  <div className="flex flex-row items-center gap-[5px] px-[30px] py-[12px]">
                    <button
                      onMouseEnter={() => handleMouseEnterActionButton("Tăng")}
                      onMouseLeave={handleMouseLeaveActionButton}
                      onClick={() => handleQuantity("decrease")}
                    >
                      -
                    </button>
                    <span className="ml-[10px] inline-block w-[20px] bg-black outline-none">
                      {quantity}
                    </span>
                    <button
                      onMouseEnter={() => handleMouseEnterActionButton("Giảm")}
                      onMouseLeave={handleMouseLeaveActionButton}
                      onClick={() => {
                        handleQuantity("increase");
                        setMaxQuantity(
                          item?.productOption[index]?.productQuantity,
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-row gap-[7px]">
                    <p>
                      {formatCurrency(item?.productOption[index]?.productPrice)}
                    </p>
                    <del className="text-[15px] text-gray-400">
                      {formatCurrency(originalPrice)}
                    </del>
                  </div>
                  <div>
                    {item?.productOption[index]?.productQuantity === 0 ? (
                      <button className="text-[14px] font-[500] text-primary">
                        OUT OF STOCK
                      </button>
                    ) : (
                      <button
                        className="cursor-none text-[14px] font-[500] tracking-[0.5px]"
                        onMouseEnter={() =>
                          handleMouseEnterActionButton("Thêm")
                        }
                        onMouseLeave={handleMouseLeaveActionButton}
                        onClick={() =>
                          handleAddToCart(
                            item.productName,
                            item._id,
                            item?.productOption[index]?.productPrice,
                            item.salePercent,
                          )
                        }
                      >
                        Thêm vào giỏ
                      </button>
                    )}
                  </div>
                </div>
                <div className="mr-[70px] mt-[20px] flex flex-row items-center justify-center gap-[10px]">
                  {item?.productOption?.map((option, i) => {
                    return (
                      option?.name && (
                        <div
                          onMouseEnter={() =>
                            handleMouseEnterActionButton("Chọn")
                          }
                          onMouseLeave={handleMouseLeaveActionButton}
                          key={i}
                          onClick={() => {
                            setIndex(i);
                            setMaxQuantity(option?.productQuantity);
                            setOption(option?.name);
                          }}
                        >
                          <button
                            className={`${index === i ? "bg-primary text-white" : ""} rounded-[5px] border-2 border-primary px-[10px] py-[2px]`}
                          >
                            {option?.name}
                          </button>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
              <div className="w-[38%]">
                <Image
                  unoptimized
                  src={item.productThumbnail}
                  width="500"
                  height="400"
                  alt=""
                />
              </div>
              <div className="w-[27%]">
                <div className="flex flex-row gap-[30px]">
                  <h6 className="text-[12px]">DESCRIPTION</h6>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.productDescription,
                    }}
                    className="text-[13px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[35%]">
                <h1 className="mb-[30px] text-[28px] font-[600]">BỘ SƯU TẬP</h1>
                <div className="flex flex-wrap gap-[10px]">
                  {item?.productImages.map((img, i) => {
                    return (
                      <Image
                        unoptimized
                        src={img}
                        width={150}
                        height={300}
                        alt=""
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-[30%] text-[14px]">
                Thức ăn cho mèo giàu chất dinh dưỡng là sản phẩm lý tưởng giúp
                chăm sóc sức khỏe và sự phát triển toàn diện của mèo cưng. Được
                chế biến từ các thành phần tự nhiên chất lượng cao, sản phẩm này
                cung cấp nguồn dinh dưỡng phong phú, đáp ứng nhu cầu của mèo ở
                mọi lứa tuổi.
                <br />
                <strong>Thành phần</strong>: Thức ăn chứa protein từ thịt gà, cá
                và các nguồn thực phẩm khác, giúp xây dựng và duy trì cơ bắp.
                Ngoài ra, sản phẩm còn bổ sung chất béo lành mạnh, vitamin A, D,
                E và khoáng chất như canxi, phốt pho để tăng cường hệ miễn dịch
                và hỗ trợ sức khỏe xương khớp. Các axit béo omega-3 và omega-6
                trong công thức giúp cải thiện tình trạng da và lông, mang đến
                bộ lông bóng mượt.
                <br />
                Với thức ăn cho mèo giàu chất dinh dưỡng, bạn có thể yên tâm
                mang lại cho thú cưng một chế độ ăn uống lành mạnh, góp phần kéo
                dài tuổi thọ và cải thiện chất lượng cuộc sống của chúng. Hãy
                chọn sản phẩm này để chăm sóc sức khỏe cho mèo yêu của bạn!
              </div>
              <div className="w-[35%]">
                <Image
                  unoptimized
                  src={item.productThumbnail}
                  width="500"
                  height="400"
                  alt=""
                />
              </div>
            </div>
          </div>
        );
      })}
      <div id="this-zone">
        <h1 className="text-[28px] font-[500]">SẢN PHẨM GỢI Ý</h1>
        <div>
          <div>
            <SuggestedProducts
              categoryId={data?.products[0]?.productCategory || ""}
            />
          </div>
        </div>
      </div>
      {contextHolder}
      <Feedback
        totalReview={data?.products[0]?.productRating}
        reviewCount={data?.products[0]?.ratingCount}
        productId={data?.products[0]?._id as any}
      />
    </div>
  );
};
