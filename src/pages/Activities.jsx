import { useEffect, useState } from "react";
import { getProjects } from "../services/project";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Card, Col, Row, Tag } from "antd";
import { getUsers } from "../services/user";

const { Meta } = Card;

export default function Activities() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  const [menuTab, setMenuTab] = useState([
    {
      key: "inProgress",
      value: "Dự án đang diễn ra",
    },
    {
      key: "finished",
      value: "Dự án đã kết thúc",
    },
  ]);
  const [currentTab, setCurrentTab] = useState("inProgress");

  const fetchProjects = async (status) => {
    getProjects().then((response) => {
      getUsers().then(async (responseUsers) => {
        const users = {};
        await Promise.all(
          responseUsers.map(async (user) => {
            users[user.username] = user.fullName;
          })
        );

        setActivities(
          response
            .filter(
              (a) =>
                a.status === status && a.tagId === "6736cda456f33d273ba32f7c"
            )
            .map((activity) => {
              return {
                ...activity,
                author: users[activity.author],
              };
            })
        );
      });
    });
  };

  useEffect(() => {
    fetchProjects("inProgress");
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="border-b border-gray-200">
        <nav className="flex justify-center items-center gap-16">
          {menuTab.map((tab) => (
            <button
              key={tab.key}
              className={
                tab.key === currentTab
                  ? "px-1 py-4 text-blue-400 font-medium border-b-2 border-blue-400 -mb-px"
                  : "px-1 py-4 text-gray-500 font-medium hover:text-gray-700"
              }
              onClick={() => {
                setCurrentTab(tab.key);
                fetchProjects(tab.key);
              }}
            >
              {tab.value}
            </button>
          ))}
        </nav>
      </div>
      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
        <div style={{ padding: "24px" }}>
          <h1
            style={{
              textAlign: "center",
              color: "#0067cc",
              fontSize: "68px",
              marginBottom: "40px",
            }}
          >
            Hoạt động tình nguyện
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Hãy lựa chọn một hoạt động và tham gia ngay hôm nay
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 transform transition-transform"
                  onClick={() => navigate(`/activities/${activity._id}`)}
                >
                  <div className="relative">
                    <img
                      src={activity.images[0]}
                      alt={activity.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Tình nguyện
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-2">
                      {activity.author}
                    </p>
                    <h3 className="font-bold text-lg mb-4 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {activity.description}
                    </p>
                    <div>
                      <strong>Ngày: </strong>{" "}
                      <span className="text-gray-600 text-sm mb-2">
                        {moment(activity.startAt, "YYYY-MM-DD").format(
                          "DD/MM/YYYY"
                        )}{" "}
                        -{" "}
                        {moment(activity.endAt, "YYYY-MM-DD").format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </div>
                    <div>
                      <strong>Số lượng tình nguyện viên: </strong>{" "}
                      <span className="text-gray-600 text-sm mb-2">
                        {
                          activity.registers.filter(
                            (register, index) =>
                              activity.registers.findIndex(
                                (reg) => reg.username === register.username
                              ) === index
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full">Không có hoạt động nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
