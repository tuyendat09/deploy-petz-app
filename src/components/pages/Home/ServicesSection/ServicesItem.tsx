import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface ServicesItemProps {
  additionalClass?: string;
  servicesTitle: string;
  servicesText: string;
  imageSrc: StaticImageData;
}

export default function ServicesItem({
  additionalClass,
  imageSrc,
  servicesText,
  servicesTitle,
}: ServicesItemProps) {
  return (
    <div>
      <div
        className={`group relative mx-auto rounded-[20px] bg-green-500 font-serif text-white lg:text-h1`}
      >
        <ResponsiveImage
          additionClass="rounded-[20px]"
          imageSrc={imageSrc}
          altImage="Services Images"
          imageHeight={650}
          imageWidth={650}
        />
        <div className="absolute top-0 h-full min-h-full w-full min-w-full rounded-[20px] bg-black opacity-20" />
        <div className="absolute bottom-4 flex w-full translate-y-2 flex-col items-center justify-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h4 className="text-h4">{servicesTitle}</h4>
          <button className="w-fit rounded-full bg-black px-8 py-2 text-base text-white transition duration-300 hover:bg-gray-800">
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </div>
  );
}
