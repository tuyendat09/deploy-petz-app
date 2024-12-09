"use client";

import { useGetUserQuery } from "@/libs/features/services/user";
import DynamicLink from "./DynamicLinks";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const userPoint = session?.user.userPoint;
  const { data: userData, isLoading } = useGetUserQuery(userId || "");

  return (
    <div className="sticky top-10 h-full w-1/4 bg-white p-6">
      <div className="mb-6 flex items-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white"
          style={{ background: "#777777" }}
        >
          P
        </div>
        <div className="ml-4">
          <div className="text-lg font-semibold">
            {userData?.displayName || "Đang tải"}
          </div>
          <div className="text-sm text-gray-500">Điểm: {userPoint}</div>
        </div>
      </div>
      <DynamicLink />
    </div>
  );
}
