import { NumericFormat } from "react-number-format";
import { FormikProps } from "formik";

interface FormEditProductPriceProps {
  visitedInput?: boolean;
  errorMessage?: string;
  formik: FormikProps<any>; // Type for Formik's context
}

export default function FormEditProductPrice({
  visitedInput,
  errorMessage,
  formik,
}: FormEditProductPriceProps) {
  const priceAfterDiscount =
    formik.values.productPrice -
    formik.values.productPrice * (formik.values.salePercent / 100);

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div className="w-1/2">
          <span className="font-bold">Giá</span>
          <span className="ml-1 text-sm text-red-500">
            {visitedInput && errorMessage}
          </span>
          <div className="flex items-center justify-center rounded-lg bg-gray-100 px-2 py-1">
            <p>đ</p>
            <NumericFormat
              onBlur={formik.handleBlur}
              name="productPrice"
              value={formik.values.productPrice}
              displayType={"input"}
              thousandSeparator={true}
              placeholder="Nhập giá sản phẩm"
              className="w-full bg-gray-100 p-1 focus:outline-none"
              onValueChange={(val) =>
                formik.setFieldValue("productPrice", val.floatValue)
              }
            />
          </div>
        </div>

        <div className="w-1/2">
          <p className="font-bold">Số lượng</p>
          <div className="flex items-center rounded-lg border bg-gray-100 px-2 py-1">
            <input
              onChange={formik.handleChange}
              name="productQuantity"
              type="number"
              placeholder="Nhập số lượng"
              value={formik.values.productQuantity}
              className="w-full bg-gray-100 p-1 focus:outline-none"
              max={100}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-1/2">
          <p className="font-bold">
            Giảm giá <span className="text-gray-text text-sm">(Optional)</span>
          </p>
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
        </div>
        <div className="w-1/2">
          <p className="font-bold">Giá sản phẩm</p>
          <div className="flex items-center rounded-md border bg-gray-100 px-2 py-1">
            <p>đ</p>
            <input
              disabled
              type="text"
              value={priceAfterDiscount}
              className="w-full bg-gray-100 p-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
