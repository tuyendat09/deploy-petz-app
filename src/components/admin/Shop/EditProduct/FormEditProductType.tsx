interface FormEditProductTypeProps {
  onChangeEvent: React.ChangeEventHandler<HTMLSelectElement>;
  defaultText: string;
  defaultValue: string;
  inputName: string;
  optionValues?: React.ReactNode;
  errorMessage?: string;
  visitedInput?: boolean;
}

export default function FormEditProductType({
  onChangeEvent,
  defaultText,
  inputName,
  optionValues,
  errorMessage,
  visitedInput,
  defaultValue,
}: FormEditProductTypeProps) {
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
        className="w-full rounded-md border bg-gray-100 px-2 py-2"
        name={inputName}
        defaultValue={defaultValue}
        id={inputName}
      >
        {optionValues}
      </select>
    </div>
  );
}
