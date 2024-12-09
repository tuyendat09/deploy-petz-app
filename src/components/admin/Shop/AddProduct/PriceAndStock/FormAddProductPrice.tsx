import { NumericFormat } from "react-number-format";
import { FormikProps } from "formik";

interface FormAddProductPriceProps {
  visitedInput?: boolean;
  errorMessage?: string;
  formik: FormikProps<any>; // Type for Formik's context
}

export default function FormAddProductPrice({
  visitedInput,
  errorMessage,
  formik,
}: FormAddProductPriceProps) {
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
          <div className="bg-gray-100 flex items-center justify-center rounded-lg px-2 py-1">
            <p>đ</p>
            <NumericFormat
              onBlur={formik.handleBlur}
              name="productPrice"
              value={1000}
              displayType={"input"}
              thousandSeparator={true}
              placeholder="Nhập giá sản phẩm"
              className="bg-gray-100 w-full p-1 focus:outline-none"
              onValueChange={(val) =>
                formik.setFieldValue("productPrice", val.floatValue)
              }
            />
          </div>
        </div>

        <div className="w-1/2">
          <p className="font-bold">Số lượng</p>
          <div className="bg-gray-100 flex items-center rounded-lg border px-2 py-1">
            <input
              onChange={formik.handleChange}
              name="productQuantity"
              type="number"
              placeholder="Nhập số lượng"
              value={formik.values.productQuantity}
              className="bg-gray-100 w-full p-1 focus:outline-none"
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
            Giảm giá <span className="text-sm text-gray-text">(Optional)</span>
          </p>
          <div className="bg-gray-100 flex items-center rounded-md border px-2 py-1">
            <p>%</p>
            <input
              onChange={formik.handleChange}
              name="salePercent"
              type="number"
              placeholder="Nhập phần trăm giảm"
              value={formik.values.salePercent}
              className="bg-gray-100 w-full p-1 focus:outline-none"
              max={100}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
            />
          </div>
        </div>
        <div className="w-1/2">
          <p className="font-bold">Giá sản phẩm</p>
          <div className="bg-gray-100 flex items-center rounded-md border px-2 py-1">
            <p>đ</p>
            <input
              disabled
              type="text"
              value={priceAfterDiscount}
              className="bg-gray-100 w-full p-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
