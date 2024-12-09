import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function BookingSection() {
  return (
    <section className="my-24">
      <div className="flex flex-col items-center justify-center gap-4 rounded-button p-4 text-center">
        <h1 className="font-serif text-display text-black">
          Lên kế hoạch thư giãn cho <p>người bạn lông xù</p>
        </h1>

        <p className="max-w-[613px] text-h4 font-[400] leading-[140%]">
          Để đảm bảo trải nghiệm suôn sẻ nhất, bạn có thể đặt lịch spa trước.
          Việc đặt lịch cần được thực hiện ít nhất 12 giờ trước thời điểm chăm
          sóc tại PETZ, nhưng chúng tôi luôn chào đón khách đến trực tiếp tại
          spa của chúng tôi bất kỳ lúc nào
        </p>
        <NormalTransitionLink
          href="/booking"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all delay-75 duration-300"
        >
          Đặt lịch
          <Icon icon="bi:arrow-right" />
        </NormalTransitionLink>
      </div>
    </section>
  );
}
