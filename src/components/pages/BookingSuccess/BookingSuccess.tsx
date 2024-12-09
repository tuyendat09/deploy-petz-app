import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

export default function BookingSuccess() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="flex">
        <CardHeader className="flex flex-col">
          <Icon className="size-20 text-green-500" icon="mdi:success-circle" />
          Đặt lịch thành công
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <p>Cảm ơn bạn đã tin tưởng PETZ.</p>
          <p>Chúng tôi sẽ liên hệ đến bạn sớm nhất.</p>
        </CardBody>
        <Divider />
        <CardFooter className="mx-auto justify-center">
          <NormalTransitionLink
            className="flex-grow rounded-full bg-primary px-6 py-2 text-white"
            href="/"
          >
            Quay về trang chủ.
          </NormalTransitionLink>
        </CardFooter>
      </Card>
    </div>
  );
}
