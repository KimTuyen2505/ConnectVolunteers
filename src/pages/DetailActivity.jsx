import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Modal, Form, Input, message } from "antd";

const DetailActivity = () => {
  const [activity, setActivity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    // Mock API call - replace with actual API call
    const fetchActivity = async () => {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockActivity = {
        id: 1,
        title: "Dạy học cho trẻ em vùng cao",
        image: "/Volunteer1.jpg",
        category: "Giáo dục",
        location: "Sapa, Lào Cai",
        date: "20/12/2023",
        volunteers_needed: 10,
        description:
          "Chương trình dạy học tình nguyện cho các em nhỏ vùng cao, nhằm mục đích nâng cao kiến thức và kỹ năng cho trẻ em tại các vùng khó khăn. Tình nguyện viên sẽ có cơ hội chia sẻ kiến thức, tạo động lực học tập và góp phần vào sự phát triển của cộng đồng.",
      };

      setActivity(mockActivity);
    };

    fetchActivity();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      // Replace with actual API call
      console.log("Form values:", {
        ...values,
        activityId: activity.id,
      });

      message.success("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
      handleCancel();
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
        cover={<img alt={activity.title} src={activity.image} />}
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
                <strong>Thể loại:</strong> {activity.category}
              </p>
              <p>
                <strong>Địa điểm:</strong> {activity.location}
              </p>
              <p>
                <strong>Ngày:</strong> {activity.date}
              </p>
              <p>
                <strong>Số lượng tình nguyện viên cần:</strong>{" "}
                {activity.volunteers_needed}
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
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Nhập địa chỉ của bạn" />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Lý do tham gia"
            rules={[
              { required: true, message: "Vui lòng nhập lý do tham gia!" },
            ]}
          >
            <Input.TextArea placeholder="Chia sẻ lý do bạn muốn tham gia hoạt động này" />
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
