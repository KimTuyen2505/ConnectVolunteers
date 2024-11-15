import axios from "axios";

const getVerifies = async () => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + "/verifies", {})
    .then((response) => {
      return response.data.dataVerifies;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getVerify = async (email) => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + `/verify/${email}`, {})
    .then((response) => {
      return response.data.dataVerifies;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const addVerify = async (verify) => {
  return await axios
    .post(import.meta.env.VITE_API_SERVER + "/verify", verify)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteVerify = async (email) => {
  axios
    .delete(import.meta.env.VITE_API_SERVER + `/verify/${email}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { getVerify, getVerifies, addVerify, deleteVerify };
