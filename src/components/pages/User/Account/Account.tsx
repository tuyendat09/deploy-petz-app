/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DateInput, Input, Card, CardBody } from "@nextui-org/react";
import AddressInput from "./AddressInput";
import UserCard from "./UserCard";
import { useSession } from "next-auth/react";
import { useGetUserQuery } from "@/libs/features/services/user";
import { useEffect } from "react";
import useChangeProfile from "./_hooks/useChangeProfile";

interface User {
  displayName: string;
  birthDay: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
}

export default function Profile() {
  const { formik } = useChangeProfile();
  const { data: session, update: sessionUpdate } = useSession();
  const userId = session?.user?._id;
  const { data: userData, isLoading } = useGetUserQuery(userId || "");

  useEffect(() => {
    if (userData) {
      sessionUpdate({
        user: userData,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      formik.setValues({
        displayName: userData?.displayName || "",
        userEmail: userData?.userEmail || "",
        userPhone: userData?.userPhone || "",
        userAddress: userData?.userAddress || "",
      });
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="space-y-4">
      <UserCard />
      <Card className="flex-grow">
        <CardBody>
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
                <p>Chỉnh sửa thông tin tài khoản của bạn</p>
              </div>
              <button
                onClick={formik.handleSubmit as any}
                type="submit"
                className="rounded-full bg-primary px-6 py-2 text-white"
              >
                Lưu thay đổi
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <Input
                label="Họ và tên"
                name="displayName"
                value={formik.values.displayName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.displayName && formik.errors.displayName
                    ? formik.errors.displayName
                    : undefined
                }
                isInvalid={
                  formik.touched.displayName && !!formik.errors.displayName
                }
              />

              <Input
                isDisabled
                label="Email"
                name="userEmail"
                value={formik.values.userEmail}
              />
              <Input
                isDisabled
                label="Địa chỉ hiện tại"
                name="userAddress"
                value={userData?.userAddress}
              />
              <Input
                label="Số điện thoại"
                name="userPhone"
                value={formik.values.userPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.userPhone && formik.errors.userPhone
                    ? formik.errors.userPhone
                    : undefined
                }
                isInvalid={
                  formik.touched.userPhone && !!formik.errors.userPhone
                }
              />
              <AddressInput formik={formik} />
              <button onClick={formik.handleSubmit as any} />
            </form>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
