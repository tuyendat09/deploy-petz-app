/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { errorModal, successModal } from "@/utils/callModalANTD";
import {
  useEditVoucherMutation,
  useGetVouchersQuery,
} from "@/libs/features/services/voucher";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import formatDate from "@/utils/formatDate";
import { parseDate } from "@internationalized/date";

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

export default function useEditVoucher({
  handleCloseDialog,
  voucherId,
}: {
  handleCloseDialog: () => void;
  voucherId: string;
}) {
  const { data: voucherById } = useGetVouchersQuery({ voucherId: voucherId });

  const [editVoucher, { data, error: editError }] = useEditVoucherMutation();
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedTotalToUse, setFormattedTotalToUse] = useState("");
  const [limitedDate, setLimitedDate] = useState<any>(null);

  async function handleResetValueOnChange(key: any) {
    await formik.setFieldValue("voucherType", formatSelectedKeys(key));
    await formik.setFieldValue("salePercent", null);
    await formik.setFieldValue("flatDiscountAmount", null);
    await formik.setFieldValue("shippingDiscountAmount", null);
    setFormattedPrice("");
  }

  function handleChangePrice(e: any) {
    const formattedValue = formatPrice(e.target.value);
    setFormattedPrice(formattedValue);
    formik.setFieldValue("flatDiscountAmount", e.target.value);
  }

  function handleChangeTotalTouse(e: any) {
    const formattedValue = formatPrice(e.target.value);
    setFormattedTotalToUse(formattedValue);
    formik.setFieldValue("totalToUse", e.target.value);
  }

  const formatPrice = (value: string | number | null): string => {
    if (value === null || value === undefined) return "";
    const stringValue = value.toString();

    const numericValue = stringValue.replace(/\./g, "").replace(/\D/g, "");
    if (!numericValue) return "";

    return parseInt(numericValue, 10).toLocaleString("de-DE");
  };

  const formik = useFormik({
    initialValues: {
      editVoucherId: voucherId,
      voucherType: voucherById?.vouchers[0].voucherType || "",
      voucherPoint: voucherById?.vouchers[0].voucherPoint || 0,
      expirationDate: voucherById?.vouchers[0].expirationDate || 0,
      maxRedemption: voucherById?.vouchers[0].maxRedemption || "",
      voucherDescription: voucherById?.vouchers[0].voucherDescription || "",
      flatDiscountAmount: voucherById?.vouchers[0].flatDiscountAmount || 0,
      salePercent: voucherById?.vouchers[0].salePercent || 0,
      shippingDiscountAmount:
        voucherById?.vouchers[0].shippingDiscountAmount || 0,
      totalToUse: voucherById?.vouchers[0].totalToUse || "",
      limitedDate: voucherById?.vouchers[0].limitedDate
        ? {
            day: new Date(voucherById.vouchers[0].limitedDate).getUTCDate(),
            year: new Date(
              voucherById.vouchers[0].limitedDate,
            ).getUTCFullYear(),
            month:
              new Date(voucherById.vouchers[0].limitedDate).getUTCMonth() + 1,
          }
        : { day: 0, year: 0, month: 0 },
      voucherQuantity: voucherById?.vouchers[0].voucherQuantity || 0,
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      console.log(values);
      const editVoucherObject = {
        editVoucherId: formik.values.editVoucherId,
        newVoucherType: formik.values.voucherType,
        newVoucherSalePercent: formik.values.salePercent,
        newExpirationDate: formik.values.expirationDate,
        newMaxRedemption: formik.values.maxRedemption,
        newVoucherPoint: formik.values.voucherPoint,
        newTotalToUse: formik.values.totalToUse,
        newVoucherDescription: formik.values.voucherDescription,
        newFlatDiscountAmount: formik.values.flatDiscountAmount,
        newShippingDiscountAmount: formik.values.shippingDiscountAmount,
        newVoucherQuantity: formik.values.voucherQuantity,
        newLimitedDate: formik.values.limitedDate,
      };
      editVoucher(editVoucherObject as any);
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
    if (editError) {
      errorModal({ content: (editError as any).data.message });
    }
  }, [data, editError]);

  useEffect(() => {
    if (formik.values.flatDiscountAmount) {
      setFormattedPrice(formatPrice(formik.values.flatDiscountAmount as any));
    }
    if (formik.values.totalToUse) {
      setFormattedTotalToUse(formatPrice(formik.values.totalToUse as any));
    }
  }, [formik.values.flatDiscountAmount, formik.values.totalToUse]);

  useEffect(() => {
    if (voucherById && voucherById.vouchers[0].limitedDate) {
      setLimitedDate(
        parseDate(formatDate(voucherById.vouchers[0]?.limitedDate) as any),
      );
    }
  }, [voucherById]);

  const handleClearDate = () => {
    setLimitedDate(null);
    formik.setFieldValue("limitedDate", null);
  };

  const handleDateChange = (value: any) => {
    if (value) {
      setLimitedDate(value);
      const { day, year, month } = value;
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
    limitedDate,
    handleClearDate,
  };
}
