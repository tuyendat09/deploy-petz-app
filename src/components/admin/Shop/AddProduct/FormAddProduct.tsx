/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import FormAddProductType from "./FormAddProductType";
import useAddProductForm from "./_hook/useAddProductForm";
import { useLazyGetSubCategoriesQuery } from "@/libs/features/services/subcategories";
import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import MyEditor from "./CKEditorComponent";
import FormAddProductThumbnail from "./ProductImage/FormAddProductThumbnail";
import GerneralInformation from "./GerneralInfor/GerneralInformation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";

export default function FormAddProduct() {
  const { data: categories } = useGetCategoriesQuery("");

  const [getSubCategories, { data: subCategories }] =
    useLazyGetSubCategoriesQuery();
  const { formik, duplicatedMessage } = useAddProductForm();

  const router = useRouter();

  useEffect(() => {
    getSubCategories({
      categoryId: formik.values.productCategory,
    });
  }, [formik.values.productCategory, getSubCategories]);

  function handleButtonSubmit() {
    formik.handleSubmit();
  }

  return (
    <>
      <div className="mb-2 flex justify-between text-xl">
        <NormalTransitionLink
          className="flex items-center gap-1 dark:text-white"
          href="/admin/shop"
        >
          <Icon icon="gravity-ui:arrow-left" />
          Quay về
        </NormalTransitionLink>

        <button
          onClick={handleButtonSubmit}
          className="rounded-lg bg-black px-6 py-2 text-white"
        >
          Save
        </button>
      </div>
      <form encType="multipart/form-data">
        <div className="flex gap-8">
          <FormAddProductThumbnail formik={formik} />
          <div className="w-3/4">
            <GerneralInformation
              formik={formik}
              duplicatedMessage={duplicatedMessage}
            />

            <div className="mt-4 flex gap-4">
              <div className="w-full space-y-4 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center rounded-md border bg-gray-100 px-2 py-1">
                  <p>%</p>
                  <input
                    onChange={formik.handleChange}
                    name="salePercent"
                    type="number"
                    placeholder="Nhập phần trăm giảm"
                    value={formik.values.salePercent}
                    className="w-full bg-gray-100 p-1 focus:outline-none"
                    max={100}
                    onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                      e.currentTarget.blur()
                    }
                  />
                </div>
                <FormAddProductType
                  visitedInput={formik.touched.productCategory}
                  errorMessage={formik.errors.productCategory}
                  onChangeEvent={formik.handleChange}
                  defaultText="Chọn danh mục"
                  inputName="productCategory"
                  optionValues={(categories as any)?.map((data: any) => (
                    <option key={data._id} value={data._id}>
                      {data.categoryName}
                    </option>
                  ))}
                />
                <FormAddProductType
                  visitedInput={formik.touched.productSubcategory}
                  errorMessage={formik.errors.productSubcategory}
                  onChangeEvent={formik.handleChange}
                  defaultText="Chọn danh mục con"
                  inputName="productSubcategory"
                  optionValues={subCategories?.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.subCategoryName}
                    </option>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
        <MyEditor formik={formik} />
      </form>
    </>
  );
}
