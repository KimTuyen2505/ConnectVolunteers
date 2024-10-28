import React from "react";
import { Search, Users, Calendar, Heart } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-600">
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Kết nối Tình nguyện viên với Tổ chức Từ thiện
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl">
                Tạo sự thay đổi tích cực trong cộng đồng. Tìm cơ hội tình nguyện
                phù hợp với bạn ngay hôm nay!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1 bg-white"
                  placeholder="Tìm kiếm cơ hội"
                  type="text"
                />
                <Button className="flex justify-center items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Tại sao chọn volunteerwork?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
              <Users className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-bold">Kết nối Dễ dàng</h3>
              <p className="text-sm text-gray-500 text-center">
                Tìm kiếm và kết nối với các tổ chức từ thiện phù hợp với sở
                thích và kỹ năng của bạn.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
              <Calendar className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-bold">Quản lý Thời gian</h3>
              <p className="text-sm text-gray-500 text-center">
                Dễ dàng lên lịch và theo dõi các hoạt động tình nguyện của bạn.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
              <Heart className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-bold">Tạo Tác động</h3>
              <p className="text-sm text-gray-500 text-center">
                Đóng góp vào các dự án có ý nghĩa và tạo ra sự thay đổi tích cực
                trong cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Bắt đầu Hành trình Tình nguyện của Bạn
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Đăng ký ngay để khám phá các cơ hội tình nguyện và bắt đầu tạo
                ra sự thay đổi tích cực.
              </p>
            </div>
            <div className="flex flex-col space-y-2 w-full max-w-sm">
              <Button className="w-full" onClick={() => navigate("/register")}>
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
