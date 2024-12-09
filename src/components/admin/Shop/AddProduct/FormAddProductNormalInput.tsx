import { FormikProps } from "formik";

interface FormAddProductNormalInputProps {
  inputPlaceHolder: string;
  inputName: string;
  label: string;
  duplicatedMessage?: string;
  errorMessage?: string;
  inputType: string;
  formik: FormikProps<any>;
  className?: string;
}

export default function FormAddProductNormalInput({
  inputPlaceHolder,
  inputName,
  label,
  duplicatedMessage,
  errorMessage,
  inputType,
  formik,
  className = "",
}: FormAddProductNormalInputProps) {
  return (
    <div className={className}>
      <label className="block font-[500]" htmlFor={inputName}>
        {label}
      </label>
      <p className="text-sm text-red-500">
        {formik.touched[inputName] && errorMessage}
      </p>
      <p className="text-sm text-red-500">{duplicatedMessage}</p>
      <input
        className="bg-gray-100 mt-1 w-full rounded-md p-2 focus:outline-none"
        placeholder={inputPlaceHolder}
        type={inputType}
        onBlur={formik.handleBlur}
        name={inputName}
        onChange={formik.handleChange}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
      />
    </div>
  );
}
