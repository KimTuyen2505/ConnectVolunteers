import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <a className="flex items-center justify-center" href="#">
        <Heart className="h-6 w-6 text-blue-600" />
        <span className="ml-2 text-lg font-bold">volunteerwork.vn</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Trang chủ
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Tìm kiếm
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Về chúng tôi
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Liên hệ
        </a>
      </nav>
    </header>
  );
};

export default Header;
