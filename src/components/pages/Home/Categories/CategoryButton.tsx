interface CategoryButtonProps {
  handleFilter: (filterOption: string) => void;
  filterOption: string;
  buttonLabel: string;
  currentFilter: string;
}

export default function CategoryButton({
  filterOption,
  handleFilter,
  buttonLabel,
  currentFilter,
}: CategoryButtonProps) {
  return (
    <button
      onClick={() => handleFilter(filterOption)}
      className={`${currentFilter === filterOption ? "border-none bg-primary text-white shadow-badget" : "border-black-900"} xl:px- cursor-none rounded-full border px-2 py-2 text-[10px] transition duration-300 hover:bg-primary hover:text-white md:px-[20px] md:py-[7px] md:text-[17px]`}
    >
      {buttonLabel}
    </button>
  );
}
