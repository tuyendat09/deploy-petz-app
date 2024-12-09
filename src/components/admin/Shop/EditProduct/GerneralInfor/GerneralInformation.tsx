import { FormikProps } from "formik";
import FormEditProductTagInput from "./FormEditProductTagInput";

interface GerneralInformationProps {
  duplicatedMessage?: string;
  formik: FormikProps<any>;
}

export default function GerneralInformation({
  formik,
  duplicatedMessage,
}: GerneralInformationProps) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-8">
      <h1 className="mb-4 text-xl font-bold">Thông tin sản phẩm</h1>

      <div className="mb-4">
        <label className="block font-[500]" htmlFor="productName">
          Tên sản phẩm
        </label>
        <p className="text-sm text-red-500">
          {formik.touched.productName &&
          typeof formik.errors.productName === "string"
            ? formik.errors.productName
            : undefined}
        </p>
        <p className="text-sm text-red-500">{duplicatedMessage}</p>
        <input
          className="mt-1 w-full rounded-md bg-gray-100 p-2 focus:outline-none"
          placeholder="Tên sản phẩm"
          type="text"
          value={formik.values.productName}
          onBlur={formik.handleBlur}
          name="productName"
          onChange={formik.handleChange}
        />
      </div>

      <div className="mb-4">
        <p className="mb-1 font-[500]">Mô tả sản phẩm</p>
        <textarea
          onChange={formik.handleChange}
          rows={5}
          value={formik.values.productDescription}
          placeholder="Nhập mô tả sản phẩm"
          name="productDescription"
          id="productDescription"
          className="focus w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-1 font-[500]">Tùy chọn sản phẩm</p>
        <FormEditProductTagInput
          errorMessage={
            typeof formik.errors.productOption === "string"
              ? formik.errors.productOption
              : undefined
          }
          inputName="productOption"
          formik={formik}
          inputPlaceHolder="Nhập và nhấn Enter để thêm tag"
        />
      </div>
    </div>
  );
}
