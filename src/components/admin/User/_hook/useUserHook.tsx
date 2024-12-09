/* eslint-disable react-hooks/exhaustive-deps */
import {
  useGetUserPaginateQuery,
  QueryUserParams,
  useEditUserRoleMutation,
} from "@/libs/features/services/user";
import { successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { useEffect, useMemo, useState } from "react";

interface useUserActionProps {
  initialPage: number;
}

export default function useUserAction({ initialPage }: useUserActionProps) {
  const [roleFilter, setRoleFilter] = useState(new Set(["Theo Role"]));
  const [queryParams, setQueryParams] = useState<QueryUserParams>({});
  const [viewDetail, setViewDetail] = useState(false);
  const [UserId, setUserId] = useState("");
  const [editUserId, setEditUserId] = useState("");
  const [changeShift, setChangeShift] = useState(false);

  const [page, setPage] = useState(initialPage);
  const { data: userList } = useGetUserPaginateQuery({
    ...queryParams,
    limit: 25,
    page: page,
  });

  const [editUserRole, { data }] = useEditUserRoleMutation();

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (userList) {
      setTotalPages(userList.totalPages);
    }
  }, [userList]);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const handleClearQueryParams = async () => {
    setQueryParams({});
  };

  useEffect(() => {
    if (formatSelectedKeys(roleFilter) !== "Theo Role") {
      setQueryParams((prev) => ({
        ...prev,
        userRole: formatSelectedKeys(roleFilter),
      }));
    }
  }, [roleFilter]);

  const handleUsernameSearch = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    } else {
      setQueryParams((prev) => ({
        ...prev,
        username: value,
        userEmail: value,
      }));
    }
  };

  const handleEmailUserSearch = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    } else {
      setQueryParams((prev) => ({
        ...prev,
        userEmail: value,
      }));
    }
  };

  const handleChangeUserRole = (userId: string, newRole: any) => {
    editUserRole({ userId: userId, newRole: formatSelectedKeys(newRole) });
  };

  useEffect(() => {
    if (data) {
      successModal({ content: data.message, duration: 3 });
    }
  }, [data]);

  function handleChangeShift(changeShiftUserId: string) {
    setChangeShift(true);
    setEditUserId(changeShiftUserId);
  }

  function handleCancelChangeShift() {
    setChangeShift(false);
    setUserId("");
  }

  return {
    userList,
    roleFilter,
    setRoleFilter,
    handleClearQueryParams,
    handleUsernameSearch,
    handleSetPage,
    page,
    totalPages,
    viewDetail,
    UserId,
    handleEmailUserSearch,
    handleChangeUserRole,
    changeShift,
    editUserId,
    handleCancelChangeShift,
    handleChangeShift,
  };
}
