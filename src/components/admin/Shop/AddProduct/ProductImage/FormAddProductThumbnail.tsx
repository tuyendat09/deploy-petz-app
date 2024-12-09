/* eslint-disable @next/next/no-img-element */
import { FormikProps } from "formik";
import usePreviewUploadImage from "../_hook/usePreviewUploadImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCallback, useRef } from "react";

interface FormAddProductThumbnailProps {
  formik: FormikProps<any>;
}

export default function FormAddProductThumbnail({
  formik,
}: FormAddProductThumbnailProps) {
  const { imagePreview, handlePreviewImg } = usePreviewUploadImage({
    formik: formik,
    fieldToSetValue: "productThumbnail",
  });

  const sliderRef = useRef(null);

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const updatedImages = [...formik.values.productImages, ...fileArray];
      formik.setFieldValue("productImages", updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.productImages];
    updatedImages.splice(index, 1);
    formik.setFieldValue("productImages", updatedImages);
  };

  const getImageSrc = (image: File | string) => {
    return image instanceof File ? URL.createObjectURL(image) : image;
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as any).swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as any).swiper.slideNext();
  }, []);

  return (
    <div className="form-group h-fit w-2/4 max-w-[560px] rounded-[20px] bg-gray-50 px-4 py-8">
      <h1 className="text-xl font-bold">Thêm hình</h1>
      <p className="text-base text-red-500">
        {formik.touched.productThumbnail &&
          (formik.errors as any).productThumbnail}
      </p>
      <div>
        <div className="group relative max-h-[500px] space-y-2">
          <div className="rounded-xl absolute bottom-0 left-0 right-0 top-0 opacity-35 transition delay-75 duration-300 group-hover:bg-stone-700" />
          <label
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-lg bg-primary px-4 py-2 opacity-0 transition delay-75 duration-300 group-hover:block group-hover:-translate-y-8 group-hover:opacity-100"
            htmlFor="productThumbnail"
          >
            Select
          </label>
          <img
            className="rounded-xl h-[500px] w-full object-cover"
            src={imagePreview}
            alt="Sản phẩm không có hình ảnh"
          />
        </div>
        <input
          onChange={handlePreviewImg}
          id="productThumbnail"
          name="productThumbnail"
          className="hidden"
          type="file"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          className="relative h-32 w-full"
          ref={sliderRef}
        >
          {formik.values.productImages.map(
            (image: File | string, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <img
                    src={getImageSrc(image)}
                    alt={`Sản phẩm ${index}`}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded-full bg-white p-2 text-red-500 shadow-md"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Icon className="size-2" icon="streamline:delete-1-solid" />
                  </button>
                </div>
              </SwiperSlide>
            ),
          )}
          <button
            type="button"
            className="absolute right-0 top-1/2 z-10 rounded-full bg-black p-1 text-white"
            onClick={handleNext}
          >
            <Icon icon="tabler:chevron-right" />
          </button>
          <button
            type="button"
            className="absolute left-0 top-1/2 z-10 bg-black p-1 text-white"
            onClick={handlePrev}
          >
            <Icon icon="tabler:chevron-left" />
          </button>
        </Swiper>
        <div className="mt-4 w-1/4">
          <label
            htmlFor="productImages"
            className="mt-2 inline-block cursor-pointer rounded-md bg-black p-2 text-white"
          >
            Thêm ảnh
          </label>
          <input
            id="productImages"
            type="file"
            className="hidden"
            multiple
            onChange={handleAddImages}
          />
        </div>
      </div>
    </div>
  );
}
