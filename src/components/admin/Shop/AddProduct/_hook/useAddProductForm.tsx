/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useAddNewProductMutation } from "@/libs/features/services/product";
import { useRouter } from "next/navigation";
import { successModal } from "@/utils/callModalANTD";

interface errorsValues {
  productName: string;
  productThumbnail: string;
  productImage: string;
  salePercent: string;
  productCategory: string;
  productSubcategory: string;
  productDescription: string;
  productOption: string;
}

export default function useAddProductForm() {
  const [duplicatedMessage, setDuplicatedMessage] = useState<
    string | undefined
  >();
  const router = useRouter();

  const [addNewProduct, { data: mutationResponse, error: mutationError }] =
    useAddNewProductMutation();

  const formik = useFormik({
    initialValues: {
      productName: "",
      productThumbnail: null,
      productImages: [],
      productCategory: "",
      productSubcategory: "",
      productDescription: "",
      productOption: [], // Each option will now contain price and quantity
      productDetailDescription: "",
      salePercent: 0,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "productImages" && Array.isArray(value)) {
          value.forEach((item: any) => {
            if (item instanceof File) {
              formData.append(`productImages`, item);
            }
          });
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
        } else if (typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value as string);
        }
      });

      addNewProduct(formData);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};

      if (values.productThumbnail == null) {
        errors.productThumbnail = "Vui lòng thêm thumbnail cho sản phẩm";
      }

      if (!values.productName) {
        errors.productName = "Vui lòng nhập tên sản phẩm";
      }

      if (!values.productCategory) {
        errors.productCategory = "Vui lòng nhập danh mục";
      }

      if (!values.productSubcategory) {
        errors.productSubcategory = "Vui lòng nhập danh mục";
      }

      if (values.salePercent < 0) {
        formik.setFieldValue("salePercent", 0);
      }

      if (values.salePercent > 100) {
        formik.setFieldValue("salePercent", 100);
      }

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

      return errors;
    },
  });

  useEffect(() => {
    if (mutationError && "data" in mutationError) {
      setDuplicatedMessage((mutationError.data as any).message);
    }
    if (mutationResponse) {
      successModal({ content: "Thêm sản phẩm thành công", duration: 3 });
      router.push("/admin/shop");
    }
  }, [mutationError, mutationResponse]);

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
