import { Calendar, Heart, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../services/user";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    confirmPassword: "",
    birthDay: "",
  });

  const [emailExists, setEmailExists] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = async (email) => {
    const users = await getUsers();
    return users.some(user => user.email === email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const birthDate = new Date(formData.birthDay);
    if (birthDate > today) {
      alert("Ngày sinh không hợp lệ! Vui lòng kiểm tra lại ");
      return;
    }

    // Check if the email already exists
    const emailInUse = await validateEmail(formData.email);
    if (emailInUse) {
      setEmailExists(true);
      alert("Email đã tồn tại! Vui lòng sử dụng email khác.");
      return;
    } else {
      setEmailExists(false);
    }

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    } else if (formData.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    } else {
      addUser(formData).then(() => {
        alert("Đăng ký thành công");
        navigate("/login");
      });
    }
  };

  return (
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
                Tên tài khoản
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
                Họ và tên
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
                Địa chỉ email
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
                {emailExists && (
                  <p className="mt-2 text-sm text-red-600">
                    Email đã tồn tại.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
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
                Nhập lại mật khẩu
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
                htmlFor="birthDay"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày sinh
              </label>
              <div className="mt-1">
                <Input
                  id="birthDay"
                  name="birthDay"
                  type="date"
                  required
                  value={formData.birthDay}
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
  );
};

export default Register;
