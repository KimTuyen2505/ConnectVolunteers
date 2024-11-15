import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { addProject, deleteProject, getProjects } from "../../services/project";
import { getTags } from "../../services/tag";
import { moneyString } from "../../utils/moneyString";
import axios from "axios";

export default function ProjectManagement() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [disable, setDisable] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    author: currentUser?.username || "",
    images: [],
    supporters: [],
    target: 0,
    description: "",
    tagId: "",
  });

  useEffect(() => {
    fetchProjects();
    fetchTags();
  }, []);

  const fetchProjects = async () => {
    try {
      getProjects().then((response) => {
        setProjects(response.reverse());
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTags = async () => {
    try {
      getTags().then((response) => {
        setTags(response);
      });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      addProject(newProject).then((response) => {
        if (response.success) {
          setNewProject({
            title: "",
            author: currentUser?.username || "",
            images: [],
            supporters: [],
            target: 0,
            description: "",
            tagId: "",
          });
          fetchProjects();
        }
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      deleteProject(projectId).then((response) => {
        if (response.success) {
          fetchProjects();
        }
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    console.log(files);
    setDisable(true);
    if (files.length > 0) {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const formData = new FormData();
            formData.append("file", files[i]);
            formData.append(
              "upload_preset",
              import.meta.env.VITE_UPLOAD_PRESET
            );
            formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUD_NAME
              }/image/upload`,
              formData
            );

            const imageUrl = response.data.secure_url;

            images.push(imageUrl);
          } catch (error) {
            console.error(error);
          }
        };
        reader.readAsDataURL(files[i]);
        if (i === files.length - 1) {
          setTimeout(() => {
            console.log(images);
            setDisable(false);
            setNewProject({ ...newProject, images: images });
          }, files.length * 5000);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <form
        onSubmit={handleAddProject}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Thêm dự án mới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tiêu đề dự án"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="number"
            placeholder="Mục tiêu dự án"
            value={newProject.target}
            onChange={(e) =>
              setNewProject({ ...newProject, target: Number(e.target.value) })
            }
            className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <textarea
            placeholder="Mô tả dự án"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 col-span-2"
            required
            rows="4"
          />
          <select
            value={newProject.tagId}
            onChange={(e) =>
              setNewProject({ ...newProject, tagId: e.target.value })
            }
            className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          >
            <option value="">---Chọn thẻ---</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tagName}
              </option>
            ))}
          </select>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            accept="image/*"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={disable}
          className={`mt-4 ${
            disable ? "bg-sky-200" : "bg-sky-500 hover:bg-sky-600"
          } text-white py-2 px-4 rounded transition-colors flex items-center`}
        >
          <FiPlus className="mr-2" /> Thêm dự án
        </motion.button>
      </form>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-sky-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                Tên dự án
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                Mục tiêu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sky-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                <td className="px-6 py-4">{moneyString(project.target)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteProject(project._id)}
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
  );
}
