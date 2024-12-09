import React from "react";
import { Card, CardHeader, Avatar } from "@nextui-org/react";
import usePreviewUploadImage from "./_hooks/usePreviewImage";
import { useSession } from "next-auth/react";
import ChangePasswordInput from "./ChangePasswordInput";
import { useGetUserQuery } from "@/libs/features/services/user";

export default function App() {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const { data: userData, isLoading } = useGetUserQuery(userId || "");

  const { imagePreview } = usePreviewUploadImage({});
  return (
    <Card className="">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="space-y-2">
            <Avatar
              isBordered
              className="mx-auto"
              radius="full"
              size="lg"
              src={imagePreview}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userData?.displayName || "Chưa có tên hiển thị"}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {userData?.userEmail}
            </h5>
            <h5 className="text-[12px] tracking-tight text-default-400">
              Điểm: {userData?.userPoint}
            </h5>
          </div>
        </div>
      </CardHeader>
      <ChangePasswordInput />
    </Card>
  );
}
