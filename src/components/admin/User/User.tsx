"use client";

import { UserProvider } from "./_store/UserContext";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";

export default function User() {
  return (
    <UserProvider>
      <UserFilter />
      <UserTable />
    </UserProvider>
  );
}
