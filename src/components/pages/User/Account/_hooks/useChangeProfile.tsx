/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "@/libs/features/services/booking";
import { useSession } from "next-auth/react";
import { useEditUserMutation } from "@/libs/features/services/user";
import { successModal } from "@/utils/callModalANTD";

interface errorsValues {
  displayName: string;
  birthDay: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
}

export default function useChangeProfile() {
  const [changeProfile, { data, error }] = useEditUserMutation();

  const { data: sessionData, update: sessionUpdate } = useSession();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
    },
    onSubmit: (values) => {
      const userId = sessionData?.user._id;
      changeProfile({
        userId: userId as any,
        displayName: values.displayName,
        userEmail: values.userEmail,
        userPhone: values.userPhone,
        userAddress: values.userAddress,
      });
    },
  });

  useEffect(() => {
    if (data) {
      successModal({ content: "Cập nhật thành công" });
      sessionUpdate({
        ...sessionData,
        user: {
          ...sessionData?.user,
          displayName: data.displayName,
        },
      });
    }
  }, [data]);

  console.log(sessionData);

  return {
    formik,
  };
}
