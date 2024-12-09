import { FormikProps } from "formik";

interface AuthInputProps {
  labelText: string;
  inputName: string;
  formik: FormikProps<any>;
  errorMessage?: string;
  typePassword?: boolean;
}

export default function AuthInput({
  labelText,
  inputName,
  formik,
  errorMessage,
  typePassword,
}: AuthInputProps) {
  const isDirty = formik.touched[inputName];

  return (
    <div>
      <p className="ml-4 text-[12px] text-red-500">{isDirty && errorMessage}</p>
      <div
        className={`relative rounded-full border ${isDirty && errorMessage ? "border-red-500" : "border-[#eaedf3]"} bg-white`}
      >
        <input
          type={typePassword && typePassword ? "password" : "text"}
          id={inputName}
          name={inputName}
          className="peer block h-full w-full appearance-none rounded-full rounded-t-lg bg-transparent mt-[10px] pb-[10px] pt-[20px] pl-[25px] text-[13px] text-black focus:outline-none focus:ring-0 md:text-[14px]"
          placeholder=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor={inputName}
          className="absolute start-6 top-5 z-10 origin-[0] transform cursor-text text-sm text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-75"
        >
          {labelText}
        </label>
      </div>
    </div>
  );
}
