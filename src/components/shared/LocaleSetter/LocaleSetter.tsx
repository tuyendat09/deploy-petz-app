"use client";
import { setLng } from "@/libs/globalStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface LocaleSetterProps {
  initialLocale: string;
}

const LocaleSetter: React.FC<LocaleSetterProps> = ({ initialLocale }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialLocale) {
      dispatch(setLng(initialLocale));
    }
  }, [initialLocale, dispatch]);

  return null;
};

export default LocaleSetter;
