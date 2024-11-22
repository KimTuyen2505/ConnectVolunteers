import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { addUser, deleteUser, getUsers } from "../../services/user";
import { useEffect, useState } from "react";
import Notification from "../../components/Notification";

export default function UserManagement() {
  const [notification, setNotification] = useState(null);
  // variant is 'success', 'error', 'info'
  const showNotification = (message, variant) => {
    setNotification({ message, variant });
  };

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      getUsers().then((response) => {
        console.log(response);
        setUsers(response);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      addUser(newUser).then((response) => {
        if (response.success) {
          setNewUser({
            username: "",
            fullName: "",
            email: "",
            password: "",
            birthDate: "",
          });
          showNotification("Thêm người dùng thành công", "success");
          fetchUsers();
        }
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      deleteUser(userId).then((response) => {
        if (response.success) {
          showNotification("Xóa người dùng thành công", "success");
          fetchUsers();
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <form
          onSubmit={handleAddUser}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4">Thêm người dùng mới</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên tài khoản:
              </label>
              <input
                type="text"
                placeholder="Tên tài khoản"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu:
              </label>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên đầy đủ:
              </label>
              <input
                type="text"
                placeholder="Tên đầy đủ"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser({ ...newUser, fullName: e.target.value })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ngày sinh:
              </label>
              <input
                type="date"
                placeholder="Ngày sinh"
                value={newUser.birthDate}
                onChange={(e) =>
                  setNewUser({ ...newUser, birthDate: e.target.value })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 transition-colors flex items-center"
          >
            <FiPlus className="mr-2" /> Thêm người dùng
          </motion.button>
        </form>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-sky-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                  Tên tài khoản
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                  Tên đầy đủ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sky-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteUser(user.username)}
                      className="text-red-600 hover:text-red-900 transition-colors flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Xóa
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
