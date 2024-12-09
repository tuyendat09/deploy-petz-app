import { Icon } from "@iconify/react/dist/iconify.js";
import DummyProductImage from "../../../public/assets/dummy-product.jpg";
import Image from "next/image";

export default function CartItems() {
  return (
    <div className="flex gap-4 border-b p-4">
      <div className="w-52">
        <Image src={DummyProductImage} alt="Product Images"></Image>
      </div>
      <div className="flex w-full justify-between">
        <div>
          <h3 className="text-xl">Annia</h3>
          <p className="text-sm text-gray-400">450 ml/ 6oz</p>
        </div>
        <div className="flex flex-col">
          <span>55.00$</span>
          <div className="jutify-center mt-auto flex items-center gap-2 self-end rounded-lg border border-gray-300 px-2 py-1">
            <Icon icon="ic:round-minus" color="#1d1d1d" />
            <span>1</span>
            <Icon icon="ic:round-plus" color="#1d1d1d" />
          </div>
        </div>
      </div>
    </div>
  );
}
