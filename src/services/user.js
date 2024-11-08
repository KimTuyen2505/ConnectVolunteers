import axios from "axios";

const getUsers = async () => {
  axios
    .get(import.meta.env.VITE_API_SERVER + "/users", {})
    .then((response) => {
      console.log(response.data.dataUsers);
    })
    .catch((error) => {
      console.error(error);
    });
};

const addUser = async (user) => {
  axios
    .post(import.meta.env.VITE_API_SERVER + "/user", user)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkExistUser = async (username) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_SERVER + `/user/${username}`,
      {}
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Tài khoản không tồn tại",
    };
  }
};
export { getUsers, addUser, checkExistUser };
