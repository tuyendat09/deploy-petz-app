/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { errorModal, successModal } from "@/utils/callModalANTD";
import { useInsertVoucherMutation } from "@/libs/features/services/voucher";
import formatSelectedKeys from "@/utils/formatSelectedValue";

interface errorsValues {
  voucherType: string;
  voucherPoint: string;
  expirationDate: string;
  voucherDescription: string;
  flatDiscountAmount: string;
  salePercent: string;
  shippingDiscountAmount: string;
  maxRedemption: string;
}

export default function useInsertVoucher({
  handleCloseDialog,
}: {
  handleCloseDialog: () => void;
}) {
  const [insertVoucher, { data, error: insertError }] =
    useInsertVoucherMutation();
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedTotalToUse, setFormattedTotalToUse] = useState("");

  async function handleResetValueOnChange(key: any) {
    await formik.setFieldValue("voucherType", formatSelectedKeys(key));
    await formik.setFieldValue("salePercent", null);
    setFormattedPrice("");
    await formik.setFieldValue("flatDiscountAmount", null);
    await formik.setFieldValue("shippingDiscountAmount", null);
  }

  function handleChangePrice(e: any) {
    const formattedValue = formatPrice(e.target.value);
    setFormattedPrice(formattedValue);
    formik.setFieldValue(
      "flatDiscountAmount",
      parseInt(e.target.value.replace(/\./g, ""), 10),
    );
  }

  function handleChangeTotalTouse(e: any) {
    const formattedValue = formatPrice(e.target.value);
    setFormattedTotalToUse(formattedValue);
    formik.setFieldValue(
      "totalToUse",
      parseInt(e.target.value.replace(/\./g, ""), 10),
    );
  }

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\./g, "").replace(/\D/g, "");
    if (!numericValue) return "";

    return parseInt(numericValue, 10).toLocaleString("de-DE");
  };

  const formik = useFormik({
    initialValues: {
      voucherType: "",
      voucherPoint: 0,
      expirationDate: 0,
      maxRedemption: null,
      voucherDescription: "",
      flatDiscountAmount: 0,
      salePercent: 0,
      shippingDiscountAmount: 0,
      limitedDate: { day: 0, year: 0, month: 0 },
      totalToUse: 0,
      voucherQuantity: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      insertVoucher(values as any);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};

      if (!values.voucherType) {
        errors.voucherType = "Vui lòng chọn kiểu voucher!";
      }

      if (values.voucherType === "ON_ORDER_SAVINGS" && !values.salePercent) {
        errors.salePercent = "Vui lòng nhập mức giảm giá!";
      }
      if (
        values.voucherType === "FLAT_DISCOUNT" &&
        !values.flatDiscountAmount
      ) {
        errors.flatDiscountAmount = "Vui lòng nhập số tiền giảm giá!";
      }

      if (
        values.voucherType === "SHIPPING_DISCOUNT" &&
        !values.shippingDiscountAmount
      ) {
        errors.shippingDiscountAmount = "Vui lòng mức freeship giảm giá!";
      }

      if (values.salePercent > 100 || values.salePercent < 0) {
        formik.setFieldValue("salePercent", values.salePercent > 100 ? 100 : 0);
      }

      if (
        values.shippingDiscountAmount > 100 ||
        values.shippingDiscountAmount < 0
      ) {
        formik.setFieldValue(
          "shippingDiscountAmount",
          values.shippingDiscountAmount > 100 ? 100 : 0,
        );
      }

      if (!values.voucherPoint) {
        errors.voucherPoint = "Vui lòng nhập điểm voucher!";
      }

      if (!values.voucherDescription) {
        errors.voucherDescription = "Vui lòng nhập mô tả voucher!";
      }
      if (!values.expirationDate) {
        errors.expirationDate = "Vui lòng nhập ngày hết hạn của voucher!";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (data) {
      successModal({ content: "Thêm voucher thành công" });
      handleCloseDialog();
    }
    if (insertError) {
      errorModal({ content: (insertError as any).data.message });
    }
  }, [data, insertError]);

  const handleDateChange = (value: any) => {
    if (value) {
      const { day, year, month } = value; // Lấy day, year, month từ dữ liệu trả về
      formik.setFieldValue("limitedDate", { day, year, month });
    }
  };

  return {
    formik,
    formattedPrice,
    handleResetValueOnChange,
    handleChangePrice,
    formattedTotalToUse,
    handleChangeTotalTouse,
    handleDateChange,
  };
}
