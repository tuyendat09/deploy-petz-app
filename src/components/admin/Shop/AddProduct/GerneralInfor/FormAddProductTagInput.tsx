import { FormikProps } from "formik";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format"; // Import NumericFormat

interface FormAddProductTagInputProps {
  inputPlaceHolder: string;
  inputName: string;
  errorMessage?: string;
  formik: FormikProps<any>;
  className?: string;
}

export default function FormAddProductTagInput({
  inputPlaceHolder,
  inputName,
  errorMessage,
  formik,
  className = "",
}: FormAddProductTagInputProps) {
  const [tagInput, setTagInput] = useState("");
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setDuplicateError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      // Check if tag already exists
      if (
        formik.values[inputName].some(
          (option: any) => option.name === tagInput.trim(),
        )
      ) {
        setDuplicateError("Tag already exists!");
      } else {
        formik.setFieldValue(inputName, [
          ...formik.values[inputName],
          { name: tagInput.trim(), price: "", quantity: "" }, // Add price and quantity fields
        ]);
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (index: number) => {
    const updatedOptions = formik.values[inputName].filter(
      (_: any, i: number) => i !== index,
    );
    formik.setFieldValue(inputName, updatedOptions);
  };

  const handleOptionChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedOptions = [...formik.values[inputName]];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    formik.setFieldValue(inputName, updatedOptions);
  };

  return (
    <div className={className}>
      <p className="text-sm text-red-500">
        {formik.touched[inputName] && errorMessage}
        {duplicateError}
      </p>
      <div className="mt-1 flex w-full flex-wrap items-center gap-2 rounded-lg bg-gray-100 p-2">
        <input
          className="flex-grow bg-transparent focus:outline-none"
          placeholder={inputPlaceHolder}
          type="text"
          value={tagInput}
          name={inputName}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-col gap-2">
        {formik.values[inputName].map((option: any, index: number) => (
          <div key={index} className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{option.name}</span>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleTagRemove(index)}
              >
                x
              </button>
            </div>
            <NumericFormat
              placeholder="Price"
              className="mt-1 w-full rounded-lg border p-2"
              value={option.productPrice}
              thousandSeparator={true}
              onValueChange={(values) => {
                const { floatValue } = values;
                handleOptionChange(index, "productPrice", floatValue as any);
              }}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="mt-1 w-full rounded-lg border p-2"
              value={option.productQuantity}
              onChange={(e) =>
                handleOptionChange(index, "productQuantity", e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
