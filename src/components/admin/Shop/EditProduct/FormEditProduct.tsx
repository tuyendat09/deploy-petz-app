/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import FormEditProductPrice from "./PriceAndStock/FormEditProductPrice";
import FormEditProductType from "./FormEditProductType";
import useAddProductForm from "./_hook/useEditProductForm";
import { useLazyGetSubCategoriesQuery } from "@/libs/features/services/subcategories";
import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import MyEditor from "./CKEditorComponent";
import FormEditProductThumnail from "./ProductImage/FormEditProductThumbnail";
import GerneralInformation from "./GerneralInfor/GerneralInformation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";

interface FormEditProductProps {
  slug: string;
}

export default function FormEditProduct({ slug }: FormEditProductProps) {
  const { data: categories } = useGetCategoriesQuery("");
  const [getSubCategories, { data: subCategories }] =
    useLazyGetSubCategoriesQuery();
  const { formik, duplicatedMessage } = useAddProductForm({ slug });
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
          type="submit"
          onClick={handleButtonSubmit}
          className="rounded-lg bg-black px-6 py-2 text-white"
        >
          Save
        </button>
      </div>
      <form encType="multipart/form-data">
        <div className="flex gap-8">
          <FormEditProductThumnail formik={formik} />
          <div className="w-3/4">
            <GerneralInformation
              formik={formik}
              duplicatedMessage={duplicatedMessage}
            />

            <div className="mt-4 flex gap-4">
              <div className="w-full space-y-4 rounded-lg bg-gray-50 p-4">
                <FormEditProductType
                  visitedInput={formik.touched.productCategory}
                  errorMessage={formik.errors.productCategory}
                  defaultValue={formik.values.productCategory}
                  onChangeEvent={formik.handleChange}
                  defaultText="Chọn danh mục"
                  inputName="productCategory"
                  optionValues={(categories as any)?.map((data: any) => (
                    <option key={data._id} value={data._id}>
                      {data.categoryName}
                    </option>
                  ))}
                />

                <FormEditProductType
                  visitedInput={formik.touched.productSubcategory}
                  errorMessage={formik.errors.productSubcategory}
                  defaultValue={formik.values.productSubcategory}
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
