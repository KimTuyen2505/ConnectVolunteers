import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Modal, Form, Input, message } from "antd";
import { getProject, updateProject } from "../services/project";
import moment from "moment";

const DetailActivity = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  const [activity, setActivity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { activityId } = useParams();

  const [reason, setReason] = useState("");

  const fetchActivity = async () => {
    getProject(activityId).then((response) => {
      setActivity(response);
    });
  };

  useEffect(() => {
    fetchActivity();
  }, [activityId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (!currentUser) {
      message.error("Vui lòng đăng nhập để tham gia hoạt động!");
      return;
    }
    try {
      updateProject({
        _id: activityId,
        registers: [
          ...activity.registers,
          { username: currentUser.username, reason: reason },
        ],
      }).then((response) => {
        message.success(
          "Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm."
        );
        fetchActivity();
        handleCancel();
      });
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        cover={<img alt={activity.title} src={activity.images[0]} />}
        actions={[
          <Button type="primary" onClick={showModal} style={{ width: "200px" }}>
            Đăng ký tham gia
          </Button>,
        ]}
      >
        <Card.Meta
          title={
            <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
              {activity.title}
            </h1>
          }
          description={
            <>
              <p>
                <strong>Thể loại:</strong> Tình nguyện
              </p>
              <p>
                <strong>Địa điểm:</strong> {activity.location}
              </p>
              <p>
                <strong>Từ ngày:</strong> {moment(activity.startAt, "YYYY-MM-DD").format("DD/MM/YYYY")} - {moment(activity.endAt, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Số lượng tình nguyện viên cần:</strong>{" "}
                {activity.supportersCount}
              </p>
              <h2
                style={{
                  fontSize: "18px",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              >
                Mô tả
              </h2>
              <p>{activity.description}</p>
            </>
          }
        />
      </Card>

      <Modal
        title="Đăng ký tham gia hoạt động tình nguyện"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="reason"
            label="Lý do tham gia"
            rules={[
              { required: true, message: "Vui lòng nhập lý do tham gia!" },
            ]}
          >
            <Input.TextArea
              placeholder="Chia sẻ lý do bạn muốn tham gia hoạt động này"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Đăng ký
            </Button>
            <Button onClick={handleCancel}>Hủy</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailActivity;
