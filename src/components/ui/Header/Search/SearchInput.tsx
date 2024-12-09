import { ChangeEvent } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SearchInputProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ handleSearch }: SearchInputProps) {
  return (
    <div className="border-b-1 border-gray-500">
      <div className="flex items-center pt-[10px] px-[10px] text-white">
        <input
          onChange={handleSearch}
          placeholder="Tìm kiếm.."
          className="placeholder:text-white w-full bg-transparent pl-[5px] pr-[20px] py-2 outline-0 text-[15px]"
          type="text"
        />
        <Icon className="text-2xl text-white pr-[5px]" icon="tabler:search" />
      </div>
    </div>
  );
}
