import React, { useEffect, useState } from "react";
import { getProject } from "../services/project";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTag } from "../services/tag";
import { getUsers } from "../services/user";
import { moneyString } from "../utils/moneyString";
import { User } from "lucide-react";
import axios from "axios";

const DetailProject = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const navigate = useNavigate();

  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [donationAmount, setDonationAmount] = useState(0);

  useEffect(() => {
    getProject(projectId).then(async (responseProject) => {
      getTag(responseProject.tagId).then(async (responseTag) => {
        getUsers().then(async (responseUser) => {
          const userData = {};
          await Promise.all(
            responseUser.map((user) => {
              userData[user.username] = user;
            })
          );
          const data = { ...responseProject };
          data["raised"] = await responseProject.supporters.reduce(
            (acc, supporter) => acc + supporter.amount,
            0
          );
          data["progress"] = Math.round((data.raised / data.target) * 100);
          data["tag"] = responseTag.tagName;
          data["author"] = userData[responseProject.author];
          data["supporters"] = await Promise.all(
            responseProject.supporters.map(async (supporter) => {
              return {
                user: userData[supporter.userId],
                amount: supporter.amount,
                createdAt: supporter.createdAt,
              };
            })
          );
          setProject(data);
        });
      });
    });
  }, []);

  const handleDonateClick = async () => {
    if (currentUser === null) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/create_payment_url`,
        {
          amount: donationAmount,
          orderInfo: `${currentUser.username}_${project._id}`,
          orderType: "donate",
          locale: "vn",
          bankCode: "",
        }
      );

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="px-40 py-8">
      <div className="grid">
        {/* Left Column - Images */}
        <div className="image-gallery">
          <div className="main-image">
            <div className="tag">{project?.tag}</div>
            <img src={project?.images[currentImage]} alt="Campaign image" />
          </div>
          <div className="thumbnails">
            <button
              className="nav-button prev"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev > 0 ? prev - 1 : project?.images.length - 1
                )
              }
            >
              &#8249;
            </button>
            {project?.images.map((src, idx) => (
              <div
                key={idx}
                className={`thumbnail ${currentImage === idx ? "active" : ""}`}
                onClick={() => setCurrentImage(idx)}
              >
                <img src={src} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
            <button
              className="nav-button next"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev < project?.images.length - 1 ? prev + 1 : 0
                )
              }
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* Right Column - Donation Info */}
        <div className="donation-info">
          <h1>{project?.title}</h1>

          <div className="organization">
            <img
              src={project?.author?.avatar}
              alt="Organization logo"
              className="org-logo"
            />
            <div>
              <Link
                to={`/profile/${project?.author?.username}`}
                className="org-name"
              >
                {project?.author?.fullName}
              </Link>
              <div className="supporters">
                <span className="icon">
                  <User className="w-4 h-4" />
                </span>
                <span>{project?.supporters.length} lượt ủng hộ</span>
              </div>
            </div>
          </div>

          <div className="donation-progress">
            <div className="progress-info">
              <span>Mục tiêu dự án</span>
              <span className="amount">
                {moneyString(project?.target ?? 0)} VNĐ
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${Math.min(Number(project?.progress ?? 0), 100)}%`,
                }}
              ></div>
            </div>
            <div className="progress-info">
              <span>Đã đạt được</span>
              <span className="amount current">
                {moneyString(project?.raised ?? 0)} VNĐ
              </span>
            </div>
          </div>

          <div className="donation-input">
            <span>VNĐ</span>
            <input
              type="number"
              placeholder="20,000"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            <button className="primary" onClick={handleDonateClick}>
              Ủng hộ ngay
            </button>
            <button className="secondary">Trở thành sứ giả</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-buttons">
          <button
            className={activeTab === "content" ? "active" : ""}
            onClick={() => setActiveTab("content")}
          >
            Nội dung
          </button>
          <button
            className={activeTab === "supporters" ? "active" : ""}
            onClick={() => setActiveTab("supporters")}
          >
            Danh sách ủng hộ
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "content" && (
            <div className="content">
              {project?.description.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
          {activeTab === "supporters" &&
            (project?.supporters.length === 0 ? (
              <div className="supporters-list">Chưa có lượt ủng hộ nào</div>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">
                      Người ủng hộ
                    </th>
                    <th className="py-2 px-4 border-b text-left">Số tiền</th>
                    <th className="py-2 px-4 border-b text-left">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {project?.supporters.map((supporter) => (
                    <tr key={supporter.createdAt} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {supporter.user.fullName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {moneyString(supporter.amount)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {supporter.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
        </div>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .image-gallery {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .main-image {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 8px;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: #e53e3e;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }

        .thumbnails {
          display: flex;
          gap: 8px;
          position: relative;
        }

        .thumbnail {
          width: 96px;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
        }

        .thumbnail.active {
          border: 2px solid #3182ce;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .nav-button.prev {
          left: -16px;
        }

        .nav-button.next {
          right: -16px;
        }

        .donation-info {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .organization {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .org-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .org-name {
          font-weight: 500;
        }

        .supporters {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #718096;
          font-size: 14px;
        }

        .donation-progress {
          margin-bottom: 24px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .amount {
          font-weight: 500;
        }

        .amount.current {
          color: #3182ce;
        }

        .progress-bar {
          height: 8px;
          background-color: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background-color: #3182ce;
          transition: width 0.3s ease;
        }

        .donation-input {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .donation-input input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          text-align: right;
        }

        .action-buttons {
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr 1fr;
        }

        button {
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button.primary {
          background-color: #3182ce;
          color: white;
        }

        button.primary:hover {
          background-color: #2c5282;
        }

        button.secondary {
          background-color: #e2e8f0;
          color: #4a5568;
        }

        button.secondary:hover {
          background-color: #cbd5e0;
        }

        .tabs {
          margin-top: 32px;
        }

        .tab-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .tab-buttons button {
          background: none;
          border: none;
          padding: 8px 16px;
          font-size: 16px;
          color: #4a5568;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }

        .tab-buttons button.active {
          color: #3182ce;
          border-bottom-color: #3182ce;
        }

        .tab-content {
          line-height: 1.6;
        }

        .content p {
          margin-bottom: 16px;
        }

        .supporters-list {
          color: #718096;
        }
      `}</style>
    </div>
  );
};

export default DetailProject;
