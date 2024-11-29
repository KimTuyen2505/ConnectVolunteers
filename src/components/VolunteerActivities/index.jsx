import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';

const VolunteerActivities = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form] = Form.useForm();

  // Mock data - replace with actual API call
  const activities = [
    {
      id: 1,
      title: "Dạy học cho trẻ em vùng cao",
      image: "/placeholder.svg?height=200&width=400",
      category: "Giáo dục",
      location: "Sapa, Lào Cai",
      date: "20/12/2023",
      volunteers_needed: 10,
      description: "Chương trình dạy học tình nguyện cho các em nhỏ vùng cao"
    },
    {
      id: 2,
      title: "Trồng cây xanh tại Hà Nội",
      image: "/placeholder.svg?height=200&width=400",
      category: "Môi trường",
      location: "Hà Nội",
      date: "25/12/2023",
      volunteers_needed: 20,
      description: "Hoạt động trồng cây xanh và bảo vệ môi trường"
    }
  ];

  const showModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      // Replace with actual API call
      console.log('Form values:', {
        ...values,
        activityId: selectedActivity.id
      });
      
      message.success('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      handleCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Hoạt động tình nguyện</h1>
        <p className="text-center text-gray-600">
          Hãy tham gia các hoạt động ý nghĩa và mang lại giá trị cho cộng đồng
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mb-3">
                {activity.category}
              </span>
              <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <div className="mb-4">
                <p className="text-gray-600"><strong>Địa điểm:</strong> {activity.location}</p>
                <p className="text-gray-600"><strong>Ngày:</strong> {activity.date}</p>
                <p className="text-gray-600">
                  <strong>Số lượng tình nguyện viên:</strong> {activity.volunteers_needed}
                </p>
              </div>
              <button
                onClick={() => showModal(activity)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Đăng ký tham gia
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Đăng ký tham gia hoạt động tình nguyện"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input.TextArea placeholder="Nhập địa chỉ của bạn" />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Lý do tham gia"
            rules={[{ required: true, message: 'Vui lòng nhập lý do tham gia!' }]}
          >
            <Input.TextArea placeholder="Chia sẻ lý do bạn muốn tham gia hoạt động này" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Đăng ký
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default VolunteerActivities;

