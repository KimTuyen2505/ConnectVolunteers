import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  Edit2,
  Camera,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Nguyễn Đặng Kim Tuyến",
    email: "kimtuyen.nd2505@gmail.com",
    phone: "0123456789",
    address: "Long An, Việt Nam",
    birthdate: "1990-01-01",
    occupation: "Kỹ sư phần mềm",
    bio: "Tôi là một tình nguyện viên nhiệt tình, luôn mong muốn đóng góp cho cộng đồng.",
    avatar: "/avatar.jpg",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    console.log("Updated user data:", userData);
    setIsEditing(false);
    // Add your update profile logic here
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevState) => ({
          ...prevState,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Thông tin cá nhân
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Chi tiết và cài đặt tài khoản.
              </p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} className="flex justify-center items-center">
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Hủy" : "Chỉnh sửa"}
            </Button>
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit}>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    Ảnh đại diện
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div
                      className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
                      onClick={handleAvatarClick}
                    >
                      <img
                        src={userData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <User className="h-5 w-5 mr-2" /> Họ và tên
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        icon={<User className="h-5 w-5" />}
                      />
                    ) : (
                      userData.fullName
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-5 w-5 mr-2" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        icon={<Mail className="h-5 w-5" />}
                      />
                    ) : (
                      userData.email
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone className="h-5 w-5 mr-2" /> Số điện thoại
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="phone"
                        type="tel"
                        value={userData.phone}
                        onChange={handleChange}
                        icon={<Phone className="h-5 w-5" />}
                      />
                    ) : (
                      userData.phone
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" /> Địa chỉ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        icon={<MapPin className="h-5 w-5" />}
                      />
                    ) : (
                      userData.address
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" /> Ngày sinh
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="birthdate"
                        type="date"
                        value={userData.birthdate}
                        onChange={handleChange}
                        icon={<Calendar className="h-5 w-5" />}
                      />
                    ) : (
                      userData.birthdate
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" /> Nghề nghiệp
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <Input
                        name="occupation"
                        value={userData.occupation}
                        onChange={handleChange}
                        icon={<Briefcase className="h-5 w-5" />}
                      />
                    ) : (
                      userData.occupation
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Heart className="h-5 w-5 mr-2" /> Giới thiệu
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <textarea
                        name="bio"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userData.bio}
                        onChange={handleChange}
                      />
                    ) : (
                      userData.bio
                    )}
                  </dd>
                </div>
              </dl>
              {isEditing && (
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button type="submit">Lưu thay đổi</Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
