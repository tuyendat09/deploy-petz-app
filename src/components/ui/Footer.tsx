import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 text-black dark:text-white sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col justify-between gap-8 px-4 lg:px-32 xl:flex-row 2xl:px-48">
        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3 xl:w-1/2 xl:text-left">
          <div>
            <h2 className="text-lg text-gray-400">THÔNG TIN LIỆN HỆ</h2>
            <ul className="mt-4 max-w-[200px] space-y-2 text-[12px]">
              <li>
                <p>
                  <span className="font-bold">Địa chỉ:</span> Lô 24, Khu Công
                  viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Email: </span>petz@gmail.com
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-gray-400">KHÁM PHÁ PETZ</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <p>Trang chủ</p>
              </li>
              <li>
                <p>Cửa hàng</p>
              </li>
              <li>
                <p>Đặt lịch</p>
              </li>
              <li>
                <p>Tìm bạn</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-gray-400">ĐIỀU KHOẢN DỊCH VỤ</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <p>Chính sách bảo mật</p>
              </li>
              <li>
                <p>Hoàn trả</p>
              </li>
              <li>
                <p>Giao hàng</p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            Tham gia bản tin <br /> PETZ để nhận <br /> thông tin khuyến mãi
          </h1>
          <div className="mt-8 flex">
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-80 rounded-full bg-black px-4 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-4 rounded-full bg-black bg-gradient-to-r px-4 text-white shadow-sm">
              <Icon icon="mingcute:arrow-right-line" className="size-6" />
            </button>
          </div>
          <div className="mt-8 flex items-center space-x-8">
            <p className="rounded-full border-1 p-2">
              <Icon icon="gg:facebook" className="size-6" />
            </p>
            <p className="rounded-full border-1 p-2">
              <Icon icon="ri:linkedin-fill" className="size-6" />
            </p>
            <p className="rounded-full border-1 p-2">
              <Icon className="size-6" icon="mdi:instagram" />
            </p>
          </div>
        </div>
      </div>
      <p className="text-center text-[64px] lg:text-[100px] 2xl:text-[172px]">
        ++PETZ
      </p>
    </footer>
  );
}
