import { StaticImageData } from "next/image";
import ResponsiveImage from "../ResponsiveImage";
import Link from "next/link";

interface CatCardProps {
  CatImage: StaticImageData;
}

export default function CatCard({ CatImage }: CatCardProps) {
  return (
    <div>
      <div className="relative h-full min-h-[400px]">
        <div className="h-full">
          <ResponsiveImage
            imageHeight={600}
            imageWidth={600}
            altImage="Cat Image"
            additionClass="rounded-button object-cover"
            imageSrc={CatImage}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="glass rounded-button px-4 py-4 text-white">
            <p className="font-bold">Con mèo mặt ngâu</p>
            <p className="text-[14px] text-gray-300">Mèo anh lông ngắn</p>
            <p className="text-[14px] text-gray-300">Giới tính: Cái</p>
            <p className="max-w-[300px] text-[12px]">
              Vị trí: 192 Hàm tử, Phường 1, Quận 5,Hồ Chí Minh
            </p>
            <p className="text-[12px]">
              Người đăng: {""}
              <Link href={"/user"} className="underline">
                User1
              </Link>
            </p>
          </div>
          <button className="mt-2 rounded-full bg-primary px-4 py-2 text-[12px] text-white">
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
}
