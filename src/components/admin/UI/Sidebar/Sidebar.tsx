import LogOut from "./LogoutButton";
import DynamicLink from "./DynamicLink";
import Logo from "@/components/ui/Header/Logo";
import DarkModeButton from "./DarkModeButton";
export default function Sidebar() {
  return (
    <div className="sticky top-12 z-50 h-full">
      <div className="rounded-xl flex h-full flex-col px-6 text-lg">
        <div className="flex justify-center gap-4">
          <Logo additionalClasses="mx-auto dark:text-white " />
          <DarkModeButton />
        </div>
        <DynamicLink />
        <LogOut />
      </div>
    </div>
  );
}
