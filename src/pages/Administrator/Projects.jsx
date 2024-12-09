import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../services/project";
import { getTags } from "../../services/tag";
import { moneyString } from "../../utils/moneyString";
import axios from "axios";
import { getProvinces } from "../../services/province";
import { Modal, Button, Table } from "antd";
import { Link } from "react-router-dom";

export default function ProjectManagement() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  const [projects, setProjects] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [tags, setTags] = useState([]);
  const [disable, setDisable] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    author: currentUser?.username || "",
    images: [],
    supporters: [],
    supportersCount: 0,
    target: 0,
    description: "",
    location: "",
    tagId: "",
    startAt: "",
    endAt: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchTags();
    fetchProvinces();
  }, []);

  const fetchProjects = async () => {
    try {
      getProjects().then((response) => {
        setProjects(response.reverse());
        if (selectedActivity) {
          setVolunteers(selectedActivity.registers);
        }
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

  const fetchProvinces = async () => {
    try {
      getProvinces().then((response) => {
        setProvinces(response);
      });
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchDistricts = async (code) => {
    setDistricts(
      provinces.filter((province) => province.code === Number(code))[0]
        .districts
    );
  };

  const getProvinceName = async (code) => {
    const province = await Promise.all(
      provinces.map((province) => {
        if (province.code === Number(code)) {
          return province.name;
        }
      })
    );
    return province.filter((a) => a !== undefined)[0];
  };
  const getDistrictName = async (code) => {
    const district = await Promise.all(
      provinces.map((province) => {
        if (province.code === Number(selectedProvince)) {
          return province.districts.find(
            (district) => district.code === Number(code)
          ).name;
        }
      })
    );
    return district.filter((a) => a !== undefined)[0];
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      setDisable(true);
      console.log(selectedFile);
      if (selectedFile && selectedFile.length > 0) {
        const images = [];
        await Promise.all(
          selectedFile.map(async (file) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                const formData = new FormData();
                formData.append("file", file);
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
                console.log("current: ", images);
                if (images.length === selectedFile.length) {
                  addProject({ ...newProject, images: images }).then(
                    (response) => {
                      if (response.success) {
                        setNewProject({
                          title: "",
                          author: currentUser?.username || "",
                          images: [],
                          supporters: [],
                          supportersCount: 0,
                          target: 0,
                          description: "",
                          location: "",
                          tagId: "",
                          startAt: "",
                          endAt: "",
                        });
                        setDisable(false);
                        fetchProjects();
                      }
                    }
                  );
                }
              } catch (error) {
                console.error(error);
              }
            };
            reader.readAsDataURL(file);
          })
        );
      } else {
        addProject({ ...newProject, images: [] }).then((response) => {
          if (response.success) {
            setNewProject({
              title: "",
              author: currentUser?.username || "",
              images: [],
              supporters: [],
              supportersCount: 0,
              target: 0,
              description: "",
              location: "",
              tagId: "",
              startAt: "",
              endAt: "",
            });
            setDisable(false);
            fetchProjects();
          }
        });
      }
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

  const handleUpdateProject = async (project) => {
    try {
      updateProject(project).then((response) => {
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
    setSelectedFile([...e.target.files]);
    console.log(files);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const showModal = (activity) => {
    setSelectedActivity(activity);
    setVolunteers(activity.registers);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      render: (text) => {
        return <Link to={`/profile/${text}`}>{text}</Link>;
      },
    },
    {
      title: "Lý do tham gia",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        return (
          <div>
            <Button type="primary" danger onClick={() => deleteRegister(index)}>
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const [volunteers, setVolunteers] = useState([]);
  const deleteRegister = async (index) => {
    updateProject({
      ...selectedActivity,
      registers: selectedActivity.registers.filter((_, id) => id !== index),
    }).then((response) => {
      if (response.success) {
        console.log(volunteers, index);
        selectedActivity.registers.splice(index, 1);
        console.log("Delete success");
        fetchProjects();
      }
    });
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề:
            </label>
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mục tiêu:
            </label>
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
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả:
            </label>
            <textarea
              placeholder="Mô tả dự án"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn thẻ:
            </label>
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn các hình ảnh:
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              accept="image/*"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn ngày bắt đầu:
            </label>
            <input
              type="date"
              data-date-format="dd/MM/yyyy"
              value={newProject.startAt}
              onChange={(e) =>
                setNewProject({ ...newProject, startAt: e.target.value })
              }
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn ngày kết thúc:
            </label>
            <input
              type="date"
              placeholder="Ngày kết thúc"
              value={newProject.endAt}
              onChange={(e) =>
                setNewProject({ ...newProject, endAt: e.target.value })
              }
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn tỉnh/thành phố:
            </label>
            <select
              value={selectedProvince}
              onChange={async (e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict("");
                console.log(e.target.value);
                setNewProject({
                  ...newProject,
                  location: await getProvinceName(e.target.value),
                });
                fetchDistricts(e.target.value);
              }}
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">---Chọn tỉnh/thành phố---</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chọn quận/huyện:
            </label>
            <select
              value={selectedDistrict}
              onChange={async (e) => {
                setSelectedDistrict(e.target.value);
                setNewProject({
                  ...newProject,
                  location: `${await getDistrictName(e.target.value)}, ${
                    newProject.location
                  }`,
                });
              }}
              className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              disabled={!selectedProvince}
            >
              <option value="">---Chọn quận/huyện---</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          {newProject.tagId === "6736cda456f33d273ba32f7c" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số lượng tình nguyện viên:
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    supportersCount: Math.floor(Number(e.target.value)),
                  })
                }
                className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          )}
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
                Ngày bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                Ngày kết thúc
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
                <td className="px-6 py-4">{project.startAt}</td>
                <td className="px-6 py-4">{project.endAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleUpdateProject({
                        ...project,
                        status:
                          project.status === "finished"
                            ? "inProgress"
                            : "finished",
                      })
                    }
                    className={`${
                      project.status === "finished"
                        ? "text-green-600 hover:text-green-900"
                        : "text-blue-600 hover:text-blue-900"
                    } transition-colors flex items-center`}
                  >
                    <AiFillThunderbolt className="mr-1" />{" "}
                    {project.status === "finished" ? "Tiếp tục" : "Kết thúc"}
                  </motion.button>
                  {project.tagId === "6736cda456f33d273ba32f7c" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => showModal(project)}
                      className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
                    >
                      <MdGroups className="mr-1" /> Xem tình nguyện viên
                    </motion.button>
                  )}
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
      <Modal
        title="Danh sách tình nguyện viên"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        <Table
          dataSource={volunteers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </motion.div>
  );
}
