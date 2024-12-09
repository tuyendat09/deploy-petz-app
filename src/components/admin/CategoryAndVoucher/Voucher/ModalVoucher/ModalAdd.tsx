import { VoucherType } from "@/types/Voucher";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import useInsertVoucher from "../_hooks/useInsertVoucher";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
  DateInput,
  DatePicker,
} from "@nextui-org/react";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

interface ModalAddProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const DISCOUNT_TYPE = [
  "ON_ORDER_SAVINGS",
  "FLAT_DISCOUNT",
  "SHIPPING_DISCOUNT",
];

export default function ModalAdd({
  isDialogOpen,
  handleCloseDialog,
}: ModalAddProps) {
  const {
    formik,
    formattedPrice,
    handleResetValueOnChange,
    handleChangePrice,
    formattedTotalToUse,
    handleChangeTotalTouse,
    handleDateChange,
  } = useInsertVoucher({ handleCloseDialog: handleCloseDialog });

  return (
    <Modal
      backdrop="blur"
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center dark:text-white">
              Thêm voucher mới
            </ModalHeader>
            <ModalBody>
              <Select
                labelPlacement={"inside"}
                name="voucherType"
                label="Loại giảm giá"
                className="w-full"
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.voucherType && formik.errors.voucherType
                }
                isInvalid={
                  formik.touched.voucherType && !!formik.errors.voucherType
                }
                onSelectionChange={(key) => {
                  handleResetValueOnChange(key);
                }}
              >
                {DISCOUNT_TYPE.map((type) => (
                  <SelectItem
                    className="dark:text-white"
                    key={type}
                    value={type}
                  >
                    {VoucherType[type as keyof typeof VoucherType]}
                  </SelectItem>
                ))}
              </Select>
              {formik.values.voucherType === "ON_ORDER_SAVINGS" && (
                <Input
                  onBlur={formik.handleBlur}
                  type="number"
                  label="Nhập phần trăm giảm giá"
                  name="salePercent"
                  onChange={formik.handleChange}
                  value={formik.values.salePercent as any}
                  errorMessage={
                    formik.touched.salePercent && formik.errors.salePercent
                  }
                  isInvalid={
                    formik.touched.salePercent && !!formik.errors.salePercent
                  }
                />
              )}
              {formik.values.voucherType === "FLAT_DISCOUNT" && (
                <Input
                  name="flatDiscountAmount"
                  value={formattedPrice}
                  onChange={handleChangePrice}
                  onBlur={formik.handleBlur}
                  type="text"
                  label="Nhập số tiền giảm trực tiếp"
                  errorMessage={
                    formik.touched.flatDiscountAmount &&
                    formik.errors.flatDiscountAmount
                  }
                  isInvalid={
                    formik.touched.flatDiscountAmount &&
                    !!formik.errors.flatDiscountAmount
                  }
                />
              )}
              {formik.values.voucherType === "SHIPPING_DISCOUNT" && (
                <Input
                  name="shippingDiscountAmount"
                  onChange={formik.handleChange}
                  value={formik.values.shippingDiscountAmount as any}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.shippingDiscountAmount &&
                    formik.errors.shippingDiscountAmount
                  }
                  isInvalid={
                    formik.touched.shippingDiscountAmount &&
                    !!formik.errors.shippingDiscountAmount
                  }
                  type="number"
                  label="Nhập số % giảm ship"
                />
              )}
              <Input
                name="voucherPoint"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.voucherPoint && formik.errors.voucherPoint
                }
                isInvalid={
                  formik.touched.voucherPoint && !!formik.errors.voucherPoint
                }
                type="number"
                label="Nhập điểm của voucher"
              />
              <Input
                value={formattedTotalToUse}
                name="totalToUse"
                onChange={handleChangeTotalTouse}
                onBlur={formik.handleBlur}
                type="text"
                label="Nhập tổng đơn tối đa để sử dụng"
              />
              <Input
                name="expirationDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.expirationDate && formik.errors.expirationDate
                }
                isInvalid={
                  formik.touched.expirationDate &&
                  !!formik.errors.expirationDate
                }
                label="Ngày hết hạn sau khi đổi (VD: x ngày)"
              />
              <DatePicker
                minValue={today(getLocalTimeZone()) as any}
                aria-label="Ngày hết hạn"
                label="Ngày hết hạn của voucher (tùy chọn)"
                name="limitedDate"
                onChange={handleDateChange}
              />
              <Input
                onChange={formik.handleChange}
                name="voucherQuantity"
                label="Số lượng voucher (tùy chọn)"
              />
              <Input
                onChange={formik.handleChange}
                name="maxRedemption"
                label="Số lần có thể đổi tối đa (tùy chọn)"
                errorMessage={formik.errors.maxRedemption}
                isInvalid={!!formik.errors.maxRedemption}
              />
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="voucherDescription"
                errorMessage={
                  formik.touched.voucherDescription &&
                  formik.errors.voucherDescription
                }
                isInvalid={
                  formik.touched.voucherDescription &&
                  !!formik.errors.voucherDescription
                }
                label="Mô tả ngắn của voucher (VD: Giảm xx phần trăm)"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCloseDialog}
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                onPress={formik.handleSubmit as any}
                color="success"
                className="rounded-full text-white"
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
