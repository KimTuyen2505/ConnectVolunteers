import React, { useState, useRef, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/user";
import Notification from "../components/Notification";
import axios from "axios";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const defaultUser = {
    fullName: "Nguyễn Đặng Kim Tuyến",
    email: "kimtuyen.nd2505@gmail.com",
    phone: "0123456789",
    address: "Long An, Việt Nam",
    birthDate: "1990-01-01",
    job: "Kỹ sư phần mềm",
    description:
      "Tôi là một tình nguyện viên nhiệt tình, luôn mong muốn đóng góp cho cộng đồng.",
    avatar: "/default_avatar.png",
  };
  const [userData, setUserData] = useState(defaultUser);
  const [userDataEditing, setUserDataEditing] = useState(defaultUser);

  const [notification, setNotification] = useState(null);
  // variant is 'success', 'error', 'info'
  const showNotification = (message, variant) => {
    setNotification({ message, variant });
  };

  useEffect(() => {
    getUser(userId).then((user) => {
      setUserData(user);
      setUserDataEditing(user);
    });
  }, [userId]);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataEditing((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(userDataEditing).then((response) => {
      if (response.success) {
        showNotification("Cập nhật thông tin thành công", "success");
        setUserData(userDataEditing);
        setIsEditing(false);
      } else {
        showNotification("Có lỗi xảy ra.", "error");
      }
    });
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
          formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            formData
          );

          const imageUrl = response.data.secure_url;

          setUserDataEditing((prevState) => ({
            ...prevState,
            avatar: imageUrl,
          }));
        } catch (error) {
          console.error(error);
          showNotification("Có lỗi xảy ra khi tải ảnh lên", "error");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification(null)}
        />
      )}
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
              {currentUser && currentUser.username === userId && (
                <Button
                  onClick={() => {
                    if (isEditing) {
                      setUserDataEditing(userData);
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="flex justify-center items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              )}
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
                          src={
                            isEditing ? userDataEditing.avatar : userData.avatar
                          }
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
                          value={userDataEditing.fullName}
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
                          value={userDataEditing.email}
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
                          value={userDataEditing.phone}
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
                          value={userDataEditing.address}
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
                          name="birthDate"
                          type="date"
                          value={userDataEditing.birthDate}
                          onChange={handleChange}
                          icon={<Calendar className="h-5 w-5" />}
                        />
                      ) : (
                        userData.birthDate
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
                          name="job"
                          value={userDataEditing.job}
                          onChange={handleChange}
                          icon={<Briefcase className="h-5 w-5" />}
                        />
                      ) : (
                        userData.job
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
                          name="description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userDataEditing.description}
                          onChange={handleChange}
                        />
                      ) : (
                        userData.description
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
    </>
  );
};

export default Profile;
