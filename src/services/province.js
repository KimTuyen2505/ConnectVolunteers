import axios from "axios";

const getProvinces = async () => {
  return await axios
    .get("https://provinces.open-api.vn/api/?depth=2", {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export { getProvinces };
