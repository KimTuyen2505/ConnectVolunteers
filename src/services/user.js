import axios from "axios";

const getUsers = async () => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + "/users", {})
    .then((response) => {
      return response.data.dataUsers;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getUser = async (userId) => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + `/user/${userId}`, {})
    .then((response) => {
      return response.data.dataUser;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const addUser = async (user) => {
  return await axios
    .post(import.meta.env.VITE_API_SERVER + "/user", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkExistUser = async (userId) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_SERVER + `/user/${userId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Tài khoản không tồn tại",
    };
  }
};

const updateUser = async (user) => {
  return await axios
    .put(import.meta.env.VITE_API_SERVER + `/user/${user.username}`, user)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: "Cập nhật thông tin không thành công",
      };
    });
};

const deleteUser = async (username) => {
  return await axios
    .delete(import.meta.env.VITE_API_SERVER + `/user/${username}`, {})
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: "Xóa người dùng không thành công",
      };
    });
};

export { getUsers, getUser, addUser, checkExistUser, updateUser, deleteUser };
