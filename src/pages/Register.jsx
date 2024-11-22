import { Heart } from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { checkExistUser } from "../services/user";
import Notification from "../components/Notification";
import Verification from "./Verification";
import { addVerify } from "../services/verify";

const Register = () => {
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [notification, setNotification] = useState(null);
  // variant is 'success', 'error', 'info'
  const showNotification = (message, variant) => {
    setNotification({ message, variant });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      showNotification("Tên tài khoản không được chứa ký tự đặc biệt", "error");
      return;
    }

    const today = new Date();
    const birthDate = new Date(formData.birthDate);
    if (birthDate > today) {
      showNotification(
        "Ngày sinh không hợp lệ! Vui lòng kiểm tra lại",
        "error"
      );
      return;
    } else if (today.getFullYear() - birthDate.getFullYear() < 18) {
      showNotification("Bạn chưa đủ 18 tuổi để đăng ký tài khoản", "error");
      return;
    }

    // Check if the email already exists
    const emailInUse = await checkExistUser(formData.email);
    if (emailInUse.success) {
      showNotification(
        "Email đã tồn tại! Vui lòng sử dụng email khác.",
        "error"
      );
      return;
    }

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      showNotification("Mật khẩu không khớp", "error");
      return;
    } else if (formData.password.length < 6) {
      showNotification("Mật khẩu phải có ít nhất 6 ký tự", "error");
      return;
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      showNotification(
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt",
        "error"
      );
      return;
    } else {
      addVerify({ email: formData.email }).then((response) => {
        setIsVerified(true);
      });
    }
  };

  return (
    <>
      {isVerified ? (
        <Verification formData={formData} />
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đăng ký tài khoản
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Hoặc{" "}
              <Link
                to={"/login"}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Đăng nhập nếu bạn đã có tài khoản
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên tài khoản (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ và tên (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ email (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhập lại mật khẩu (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="birthDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ngày sinh (<span className="text-red-500">*</span>)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <Button type="submit">Đăng ký</Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Hoặc đăng ký bằng
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Đăng ký bằng Google</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <Notification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default Register;
