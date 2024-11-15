import axios from "axios";

const getProjects = async () => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + "/projects", {})
    .then((response) => {
      return response.data.dataProjects;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getProject = async (projectId) => {
  return await axios
    .get(import.meta.env.VITE_API_SERVER + `/project/${projectId}`, {})
    .then((response) => {
      return response.data.dataProjects;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const addProject = async (project) => {
  return await axios
    .post(import.meta.env.VITE_API_SERVER + "/project", project)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: "Tạo dự án không thành công",
      };
    });
};

const updateProject = async (project) => {
  return await axios
    .put(import.meta.env.VITE_API_SERVER + `/project/${project._id}`, project)
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

const deleteProject = async (projectId) => {
  return await axios
    .delete(import.meta.env.VITE_API_SERVER + `/project/${projectId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: "Xóa dự án không thành công",
      };
    });
};

export { getProjects, getProject, addProject, updateProject, deleteProject };
