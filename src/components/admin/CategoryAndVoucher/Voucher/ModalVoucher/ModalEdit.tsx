import { VoucherType } from "@/types/Voucher";
import useEditVoucher from "../_hooks/useEditVoucher";
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
  DatePicker,
} from "@nextui-org/react";
import { useEffect } from "react";
import {
  getLocalTimeZone,
  today,
  parseZonedDateTime,
  parseDate,
} from "@internationalized/date";
import formatDate from "@/utils/formatDate";

interface ModalAddProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  voucherId: string;
}

const DISCOUNT_TYPE = [
  "ON_ORDER_SAVINGS",
  "FLAT_DISCOUNT",
  "SHIPPING_DISCOUNT",
];

export default function ModalAdd({
  isDialogOpen,
  handleCloseDialog,
  voucherId,
}: ModalAddProps) {
  const {
    formik,
    formattedPrice,
    handleResetValueOnChange,
    handleChangePrice,
    formattedTotalToUse,
    handleChangeTotalTouse,
    handleDateChange,
    limitedDate,
    handleClearDate,
  } = useEditVoucher({
    handleCloseDialog: handleCloseDialog,
    voucherId: voucherId,
  });

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
              {/* <p className="text-base text-red-500">{duplicatedMessage}</p> */}
              <Select
                labelPlacement={"inside"}
                name="voucherType"
                label="Loại giảm giá"
                className="w-full"
                onBlur={formik.handleBlur}
                selectedKeys={[formik.values.voucherType]}
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
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.shippingDiscountAmount &&
                    formik.errors.shippingDiscountAmount
                  }
                  isInvalid={
                    formik.touched.shippingDiscountAmount &&
                    !!formik.errors.shippingDiscountAmount
                  }
                  value={formik.values.shippingDiscountAmount as any}
                  type="number"
                  label="Nhập số % giảm ship"
                />
              )}
              <Input
                name="voucherPoint"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucherPoint as any}
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
                value={formik.values.expirationDate as any}
                label="Ngày hết hạn của voucher (VD: x ngày)"
              />
              <div>
                <DatePicker
                  aria-label="Ngày hết hạn"
                  label="Ngày hết hạn của voucher (tùy chọn)"
                  name="limitedDate"
                  onChange={handleDateChange}
                  value={limitedDate}
                  minValue={today(getLocalTimeZone()) as any}
                />
                <button onClick={handleClearDate} className="ml-2 text-[12px]">
                  Xóa ngày{" "}
                </button>
              </div>
              <Input
                onChange={formik.handleChange}
                name="voucherQuantity"
                value={formik.values.voucherQuantity as any}
                label="Số lượng voucher (tùy chọn)"
              />
              <Input
                onChange={formik.handleChange}
                name="maxRedemption"
                label="Số lần có thể đổi tối đa (tùy chọn)"
                value={formik.values.maxRedemption as any}
                errorMessage={formik.errors.maxRedemption}
                isInvalid={!!formik.errors.maxRedemption}
              />
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="voucherDescription"
                value={formik.values.voucherDescription as any}
                errorMessage={
                  formik.touched.expirationDate && formik.errors.expirationDate
                }
                isInvalid={
                  formik.touched.expirationDate &&
                  !!formik.errors.expirationDate
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
