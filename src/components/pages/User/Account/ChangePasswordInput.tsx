import { useEditUserMutation } from "@/libs/features/services/user";
import { CardBody, Input, Checkbox } from "@nextui-org/react";
import useChangePassword from "./_hooks/useChangePassword";
import { useState } from "react";

export default function ChangePasswordInput() {
  const { formik } = useChangePassword();

  const [isHidden, setIsHidden] = useState(false);

  return (
    <CardBody className="px-3 text-small">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Đổi mật khẩu</h1>
          </div>
          <button
            onClick={formik.handleSubmit as any}
            type="button"
            className="rounded-full bg-primary px-6 py-2 text-white"
          >
            Lưu thay đổi
          </button>
        </div>
        <form onSubmit={formik.handleSubmit as any} className="space-y-4">
          <Input
            type={!isHidden ? "password" : "text"}
            label="Đổi mật khẩu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
            autoComplete="false"
            errorMessage={
              formik.touched.newPassword && formik.errors.newPassword
                ? formik.errors.newPassword
                : undefined
            }
            isInvalid={
              formik.touched.newPassword && !!formik.errors.newPassword
            }
          />
          <Input
            autoComplete="false"
            type={!isHidden ? "password" : "text"}
            label="Nhập lại mật khẩu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="confirmPassword"
            errorMessage={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
            isInvalid={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
          />

          <Checkbox onValueChange={setIsHidden} isSelected={isHidden}>
            Hiện mật khẩu
          </Checkbox>
          <button onClick={formik.handleSubmit as any} />
        </form>
      </div>
    </CardBody>
  );
}
