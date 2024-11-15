import axios from "axios";

const getTags = async () => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + "/tags", {})
    .then((response) => {
      return response.data.dataTags;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getTag = async (tagId) => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + `/tag/${tagId}`, {})
    .then((response) => {
      return response.data.dataTags;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const addTag = async (tag) => {
  axios
    .post(import.meta.env.VITE_API_SERVER + "/tag", tag)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateTag = async (tag) => {
  return await axios
    .put(import.meta.env.VITE_API_SERVER + `/tag/${tag._id}`, tag)
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

export { getTags, getTag, addTag, updateTag };
