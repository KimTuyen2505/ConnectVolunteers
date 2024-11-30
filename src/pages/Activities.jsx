import { useEffect, useState } from "react";
import { getProjects } from "../services/project";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Card, Col, Row, Tag } from "antd";

const { Meta } = Card;

export default function Activities() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);

  const [menuTab, setMenuTab] = useState([
    {
      key: "inProgress",
      value: "Dự án đang gây quỹ",
    },
    {
      key: "finished",
      value: "Dự án đã kết thúc",
    },
  ]);
  const [currentTab, setCurrentTab] = useState("inProgress");

  const fetchProjects = async (status) => {
    getProjects().then((response) => {
      setActivities(
        response.filter(
          (a) => a.status === status && a.tagId === "6736cda456f33d273ba32f7c"
        )
      );
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
          <Row gutter={[16, 16]}>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <Col xs={24} sm={12} md={8} key={activity._id}>
                  <Link to={`/activities/${activity._id}`}>
                    <Card
                      hoverable
                      cover={
                        <img alt={activity.title} src={activity.images[0]} />
                      }
                    >
                      <Tag color="blue" style={{ marginBottom: "8px" }}>
                        {activity.category}
                      </Tag>
                      <Meta
                        title={activity.title}
                        description={
                          <>
                            <p>{activity.description}</p>
                            <p>
                              <strong>Ngày:</strong>{" "}
                              {moment(activity.startAt).format("DD/MM/YYYY")}
                            </p>
                            <p>
                              <strong>Số lượng tình nguyện viên:</strong>{" "}
                              {activity.supportersCount}
                            </p>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <div className="text-center w-full">Không có hoạt động nào</div>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}
