import LogoImage from "@@/assets/images/logo.png";
import ResponsiveImage from "../ResponsiveImage";
import Link from "next/link";
import NormalTransitionLink from "../NormalTransitionLink";

interface LogoProps {
  textColor?: "text-black" | "text-white";
  additionalClasses?: string;
}

export default function Logo({
  textColor = "text-black",
  additionalClasses = "",
}: LogoProps) {
  return (
    <NormalTransitionLink
      href="/"
      className={`flex items-center ${textColor} ${additionalClasses}`}
    >
      <div className="w-8">
        <ResponsiveImage
          imageSrc={LogoImage}
          altImage="Logo"
          imageWidth={500}
          imageHeight={500}
        />
      </div>
      <p className="font-bold tracking-wider">PETZ</p>
    </NormalTransitionLink>
  );
}
