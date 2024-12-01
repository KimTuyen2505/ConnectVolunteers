import { Search } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-500">
              Volunteerwork
            </span>
          </Link>
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Trang Chủ
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-gray-900">
              Dự Án
            </Link>
            <Link to="/activities" className="text-gray-700 hover:text-gray-900">
              Hoạt động
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              Về Chúng Tôi
            </Link>
            <Link to="/ranking" className="text-gray-700 hover:text-gray-900">
              Bảng Xếp Hạng
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              className=" bg-blue-500  hover:bg-blue-600"
              onClick={() => navigate("/projects")}
            >
              Ủng hộ ngay
            </Button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Đăng ký
                </Link>
                <span>/</span>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
