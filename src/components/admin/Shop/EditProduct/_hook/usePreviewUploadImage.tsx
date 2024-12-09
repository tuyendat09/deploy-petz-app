/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NoImg from "@@/assets/images/no-img.jpg";
import { FormikProps } from "formik";

interface ImageUploadProps {
  formik: FormikProps<any>;
  fieldToSetValue: string;
}

export default function usePreviewUploadImage({
  formik,
  fieldToSetValue,
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string>(NoImg.src);

  // Update preview when productThumbnail changes
  useEffect(() => {
    if (typeof formik.values[fieldToSetValue] === "string") {
      setImagePreview(formik.values[fieldToSetValue]);
    }
  }, [formik.values[fieldToSetValue]]);

  // Handle image preview when a file is selected
  function handlePreviewImg(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Show the preview
        formik.setFieldValue("newThumbnail", file); // Track the new thumbnail in a separate field
      };
      formik.setFieldValue("removeThumbnail", formik.values.productThumbnail);
      reader.readAsDataURL(file);
    }
  }

  return {
    imagePreview,
    handlePreviewImg,
  };
}
