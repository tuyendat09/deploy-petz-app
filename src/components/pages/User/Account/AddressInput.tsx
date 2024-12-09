import { MapSearchType } from "@/types/Map";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import useSearchMap from "./_hooks/useSearchMap";
import { FormikProps } from "formik";

interface AddressInputProps {
  formik: FormikProps<any>;
}

export default function AddressInput({ formik }: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<MapSearchType[]>([]);

  const { handleAutoComplete } = useSearchMap();
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      formik.setFieldValue("userAddress", e.currentTarget.value);
      const response = await handleAutoComplete(e.currentTarget.value);
      setSuggestions(response);
    }
  };

  return (
    <Autocomplete
      defaultItems={suggestions}
      label="Thay đổi địa chỉ"
      className="w-full"
      onKeyUp={(e) => handleKeyUp(e)}
      listboxProps={{
        emptyContent: "Không tìm thấy địa chỉ.",
      }}
      allowsCustomValue={true}
      onSelectionChange={(value) => {
        formik.setFieldValue("userAddress", value);
      }}
      onInputChange={formik.handleChange}
    >
      {(suggestion) => (
        <AutocompleteItem key={suggestion.label}>
          {suggestion.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
