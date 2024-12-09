import { createContext, useContext, ReactNode } from "react";
import useUserAction from "../_hook/useUserHook";
import { PaginateUser } from "@/types/User";

// Define the shape of your context
interface UserContextProps {
  userList: PaginateUser | undefined;
  roleFilter: any;
  setRoleFilter: (keys: any) => void;
  handleClearQueryParams: () => void;
  handleUsernameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
  UserId: any;
  handleEmailUserSearch: (value: string) => void;
  handleChangeUserRole: (userId: string, newRole: string) => void;
  changeShift: any;
  editUserId: any;
  handleCancelChangeShift: () => void;
  handleChangeShift: (changeShiftUserId: string) => void;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    userList,
    roleFilter,
    setRoleFilter,
    handleClearQueryParams,
    handleUsernameSearch,
    handleSetPage,
    page,
    totalPages,
    UserId,
    handleEmailUserSearch,
    handleChangeUserRole,
    changeShift,
    editUserId,
    handleCancelChangeShift,
    handleChangeShift,
  } = useUserAction({ initialPage: 1 });

  return (
    <UserContext.Provider
      value={{
        userList,
        roleFilter,
        setRoleFilter,
        handleClearQueryParams,
        handleUsernameSearch,
        handleSetPage,
        page,
        totalPages,
        UserId,
        handleEmailUserSearch,
        handleChangeUserRole,
        changeShift,
        editUserId,
        handleCancelChangeShift,
        handleChangeShift,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
