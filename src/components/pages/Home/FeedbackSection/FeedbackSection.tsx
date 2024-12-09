import MarketSectionImage from "@@/public/images/adopted-section.png";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import FeedbackSlide from "./FeedbackSlide";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
export default function MarketSection() {
  return (
    <section className="my-24">
      <div>
        <div className="container">
          <div className="md w-fit text-[24px] font-bold uppercase md:text-h1">
            <h1>
              <span className="text-primary">Khách hàng</span> nói gì
            </h1>
            <div className="flex items-center gap-2">
              về PETZ
              <div className="flex-grow">
                <ResponsiveImage
                  imageSrc={MarketSectionImage}
                  imageHeight={600}
                  imageWidth={600}
                  altImage="A cat hiding in red background"
                  additionClass="rounded-full"
                />
              </div>
            </div>
          </div>
          <NormalTransitionLink
            href="/booking"
            className="mt-4 rounded-full bg-primary px-4 py-2 text-right text-white md:ml-auto"
          >
            Đặt lịch ngay
          </NormalTransitionLink>
        </div>
        <FeedbackSlide />
      </div>
    </section>
  );
}
