interface FormAddProductTypeProps {
  onChangeEvent: React.ChangeEventHandler<HTMLSelectElement>;
  defaultText: string;
  inputName: string;
  optionValues?: React.ReactNode;
  errorMessage?: string;
  visitedInput?: boolean;
}

export default function FormAddProductType({
  onChangeEvent,
  defaultText,
  inputName,
  optionValues,
  errorMessage,
  visitedInput,
}: FormAddProductTypeProps) {
  return (
    <div className="w-full">
      <label className="block font-bold" htmlFor={inputName}>
        {defaultText}
        <span className="ml-1 text-xs text-red-500">
          {visitedInput && errorMessage}
        </span>
      </label>

      <select
        onChange={onChangeEvent}
        className="bg-gray-100 w-full rounded-md border px-2 py-2"
        name={inputName}
        defaultValue="DEFAULT"
        id={inputName}
      >
        <option disabled value="DEFAULT">
          {defaultText}
        </option>
        {optionValues}
      </select>
    </div>
  );
}
