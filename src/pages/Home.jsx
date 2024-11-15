import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { getTags } from "../services/tag";
import { getProjects } from "../services/project";
import { moneyString } from "../utils/moneyString";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/user";

export default function Home() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);

  useEffect(() => {
    getTags().then((response) => {
      setTags(response);
      setCurrentTag(response[0]);
    });
    getProjects().then(async (response) => {
      getUsers().then(async (responseUsers) => {
        const users = {};
        await Promise.all(
          responseUsers.map(async (user) => {
            users[user.username] = user.fullName;
          })
        );

        setProjects(
          response
            .filter((a) => a.status === "inProgress")
            .map((project) => {
              let raised = project.supporters.reduce(
                (acc, supporter) => acc + supporter.amount,
                0
              );
              let progress = Math.round((raised / project.target) * 100);
              return {
                ...project,
                author: users[project.author],
                raised,
                progress,
              };
            })
        );
      });
    });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Slider></Slider>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
        <h1
          style={{
            textAlign: "center",
            color: "#0067cc",
            fontSize: "68px",
            marginBottom: "40px",
          }}
        >
          Dự Án Gây Quỹ
        </h1>
        <p className="text-yellow-600 text-center mb-8 text-2xl font-bold relative group">
          <span className="inline-flex items-center transition duration-300 transform group-hover:scale-105">
            🏆 Bảng Vàng: Nguyễn Thị Thu
          </span>
        </p>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tags.map((tag) => (
            <button
              key={tag._id}
              className={`px-6 py-2 rounded-full ${
                tag === currentTag ? "bg-blue-500 text-white" : "bg-gray-100"
              } hover:bg-blue-500 hover:text-white transition-colors`}
              onClick={() => setCurrentTag(tag)}
            >
              {tag.tagName}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter((project) => project.tagId === currentTag._id)
            .length > 0 ? (
            projects
              .filter((project) => project.tagId === currentTag._id)
              .map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 transform transition-transform"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  <div className="relative">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      {currentTag.tagName}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-2">
                      {project.author}
                    </p>
                    <h3 className="font-bold text-lg mb-4 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(Number(project.progress), 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-blue-500">
                        {moneyString(project.raised)}đ
                      </span>
                      <span className="text-gray-600">{project.progress}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      với mục tiêu {moneyString(project.target)}đ
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center">Không có dự án nào</div>
          )}
        </div>
      </div>
    </div>
  );
}
