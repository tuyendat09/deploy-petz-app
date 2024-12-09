import { Button, ButtonProps } from "@nextui-org/react";

export default function ButtonAdmin({ ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className="block w-fit bg-[#f3f3f3] text-black hover:bg-[#e0e0e0] dark:bg-white dark:hover:bg-[#f2f2f2]"
    ></Button>
  );
}
