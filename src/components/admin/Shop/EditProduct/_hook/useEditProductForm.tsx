// useEditProductForm.tsx
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  useEditProductMutation,
  useGetProductsQuery,
} from "@/libs/features/services/product";
import { successModal } from "@/utils/callModalANTD";
import { useRouter } from "next/navigation";

interface ErrorsValues {
  productName?: string;
  productThumbnail?: string;
  productImage?: string;
  productPrice?: string;
  salePercent?: string;
  productQuantity?: string;
  productCategory?: string;
  productSubcategory?: string;
  productDescription?: string;
  productOption?: string;
  productDetailDescription?: string;
}

export default function useEditProductForm({ slug }: { slug: string }) {
  const { data: productBySlug } = useGetProductsQuery({ productSlug: slug });
  const router = useRouter();
  const [editProduct, { data, error: mutationError }] =
    useEditProductMutation();
  const [duplicatedMessage, setDuplicatedMessage] = useState();

  // const router = useRouter();

  // Prepare initial values
  const initialValues = productBySlug?.products?.[0]
    ? {
        productId: productBySlug.products[0]._id || "",
        productName: productBySlug.products[0].productName || "",
        productThumbnail: productBySlug.products[0].productThumbnail || [],
        productImages: productBySlug.products[0].productImages || [],
        salePercent: productBySlug.products[0].salePercent || 0,
        productCategory: productBySlug.products[0].productCategory || "",
        productSubcategory: productBySlug.products[0].productSubCategory || "",
        productDescription: productBySlug.products[0].productDescription || "",
        productOption: productBySlug.products[0].productOption || [],
        productDetailDescription:
          productBySlug.products[0].productDetailDescription?.detailContent ||
          "",
        removeImages: [],
        newImages: [],
        newThumbnail: [],
        removeThumbnail: [],
      }
    : {
        productName: "",
        productThumbnail: null,
        productImages: [],
        salePercent: 0,
        productCategory: "",
        productSubcategory: "",
        productDescription: "",
        productOption: [],
        productDetailDescription: "",
      };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "newImages" && Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append("newImages", item);
            }
          });
        } else if (key === "newThumbnail" && value instanceof File) {
          formData.append("newThumbnail", value);
        } else if (key === "removeImages" && Array.isArray(value)) {
          value.forEach((imageArray, index) => {
            if (imageArray.length > 0) {
              formData.append(`removeImages[${index}]`, imageArray[0]);
            }
          });
        } else if (typeof value === "number") {
          formData.append(key, value.toString());
        } else if (typeof value === "string") {
          formData.append(key, value);
        } else if (key === "productOption") {
          // Loop through each option and append it correctly as an array in FormData
          (value as any)?.forEach((option: any, index: number) => {
            formData.append(`productOption[${index}][name]`, option.name);
            formData.append(
              `productOption[${index}][price]`,
              option.productPrice,
            );
            formData.append(
              `productOption[${index}][quantity]`,
              option.productQuantity,
            );
          });
        }
      });

      // Submit form data
      editProduct(formData);
    },

    validate: (values) => {
      let errors: ErrorsValues = {};
      if (!values.productOption || values.productOption.length === 0) {
        errors.productOption = "Option không được bỏ trống";
      } else {
        values.productOption.forEach((option, index) => {
          if (
            !(option as any).productPrice ||
            (option as any).productPrice <= 20000
          ) {
            errors.productOption = `Option ${index + 1}: Giá không hợp lệ`;
          }
          if (
            !(option as any).productQuantity ||
            (option as any).productQuantity <= 0
          ) {
            errors.productOption = `Option ${index + 1}: Số lượng không hợp lệ`;
          }
        });
      }

      if (!values.productName) {
        errors.productName = "Required name";
      }
      if (!values.productCategory) {
        errors.productCategory = "Required";
      }
      if (!values.productSubcategory) {
        errors.productSubcategory = "Required";
      }
      if (values.salePercent < 0) {
        errors.salePercent = "Sale percent must be between 0 and 100";
      } else if (values.salePercent > 100) {
        errors.salePercent = "Sale percent must be between 0 and 100";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (mutationError && "data" in mutationError) {
      setDuplicatedMessage((mutationError.data as any).message);
    }
    if (data) {
      successModal({ content: "Sửa sản phẩm thành công", duration: 3 });
      router.push("/admin/shop");
    }
  }, [mutationError, data]);

  useEffect(() => {
    if (formik.values.productName) {
      setDuplicatedMessage(undefined);
    }
  }, [formik.values.productName]);

  return {
    formik,

    duplicatedMessage,
  };
}
