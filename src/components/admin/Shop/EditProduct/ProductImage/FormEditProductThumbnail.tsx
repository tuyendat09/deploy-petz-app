/* eslint-disable @next/next/no-img-element */
import { FormikProps } from "formik";
import usePreviewUploadImage from "../_hook/usePreviewUploadImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface FormEditProductThumbnailProps {
  formik: FormikProps<any>;
}

export default function FormEditProductThumbnail({
  formik,
}: FormEditProductThumbnailProps) {
  const { imagePreview, handlePreviewImg } = usePreviewUploadImage({
    formik: formik,
    fieldToSetValue: "productThumbnail",
  });

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const updatedImages = [...formik.values.productImages, ...fileArray];
      formik.setFieldValue("productImages", updatedImages);
      // Add new images to newImages field to track them for upload
      formik.setFieldValue("newImages", [
        ...formik.values.newImages,
        ...fileArray,
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.productImages];
    const removeImage = updatedImages.splice(index, 1);
    formik.setFieldValue("productImages", updatedImages);
    formik.setFieldValue("removeImages", [
      ...formik.values.removeImages,
      removeImage,
    ]);
  };

  const getImageSrc = (image: File | string) => {
    return image instanceof File ? URL.createObjectURL(image) : image;
  };

  return (
    <div className="form-group h-fit w-2/4 max-w-[560px] rounded-[20px] bg-gray-50 px-4 py-8">
      <h1 className="text-xl font-bold">Thêm hình</h1>
      <div>
        <div className="group relative space-y-2">
          <div className="rounded-xl absolute bottom-0 left-0 right-0 top-0 opacity-35 transition delay-75 duration-300 group-hover:bg-stone-700" />
          <label
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-lg bg-primary px-4 py-2 opacity-0 transition delay-75 duration-300 group-hover:block group-hover:-translate-y-8 group-hover:opacity-100"
            htmlFor="productThumbnail"
          >
            Select
          </label>
          <img
            className="rounded-xl w-full"
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
        <Swiper spaceBetween={20} slidesPerView={3} className="h-32 w-full">
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
        </Swiper>
        <div className="mt-4">
          <label
            htmlFor="productImages"
            className="mt-2 inline-block cursor-pointer rounded-md bg-black p-2 text-white"
          >
            Thêm hình ảnh
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
