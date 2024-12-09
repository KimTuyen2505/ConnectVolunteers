import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
  const supporterQuestions = [
    {
      question: "Có nên ủng hộ trên Volunteerwork.vn không?",
      answer: "Volunteerwork.vn là nền tảng gây quỹ cộng đồng uy tín, được vận hành bởi đội ngũ chuyên nghiệp và có giấy phép hoạt động hợp pháp.",
      id: "q1"
    },
    {
      question: "Đóng góp trên Volunteerwork.vn có an toàn không?",
      answer: "Mọi giao dịch trên Volunteerwork.vn đều được bảo mật và xử lý thông qua các cổng thanh toán được cấp phép. Chúng tôi cam kết bảo vệ thông tin của người dùng.",
      id: "q2"
    },
    {
      question: "Những phương thức thanh toán nào có thể được sử dụng để quyên góp?",
      answer: "Bạn có thể sử dụng nhiều phương thức thanh toán như: Internet Banking, Ví điện tử (Momo, ZaloPay), thẻ tín dụng/ghi nợ, và chuyển khoản ngân hàng.",
      id: "q3"
    },
    {
      question: "Những khoản phí nào được áp dụng cho các khoản đóng góp?",
      answer: "Volunteerwork.vn không thu phí từ người ủng hộ. 100% số tiền đóng góp sẽ được chuyển đến dự án bạn chọn ủng hộ.",
      id: "q4"
    },
    {
      question: "Với tư cách là người ủng hộ, tôi có thể thay đổi hoặc sửa tên của mình không?",
      answer: "Có, bạn có thể thay đổi thông tin cá nhân trong phần cài đặt tài khoản sau khi đăng nhập.",
      id: "q5"
    },
    {
      question: "Ngoài ủng hộ bằng tiền, tôi có thể ủng hộ các dự án bằng cách khác không?",
      answer: "Có, bạn có thể hỗ trợ bằng cách chia sẻ dự án trên mạng xã hội, tham gia tình nguyện hoặc đóng góp hiện vật nếu dự án có nhu cầu.",
      id: "q6"
    },
    {
      question: "Tôi có cần đăng ký vào Volunteerwork.vn để ủng hộ không?",
      answer: "Bạn có thể ủng hộ cho các Dự án gây quỹ trên Volunteerwork.vn mà không cần phải đăng ký làm thành viên của Volunteerwork. Tuy nhiên việc đăng ký sẽ giúp bạn tương tác và cập nhật tốt hơn các thông tin về dự án và tổ chức mà bạn quan tâm, ủng hộ.",
      id: "q7"
    }
  ];

  const organizationQuestions = [
    {
      question: "Những loại dự án nào có thể được khởi chạy trên Volunteerwork.vn?",
      answer: "Các dự án từ thiện, nhân đạo, phát triển cộng đồng và các hoạt động vì mục đích xã hội được thực hiện bởi các tổ chức được cấp phép.",
      id: "o1"
    },
    {
      question: "Mất bao lâu để một dự án gây quỹ được chấp thuận?",
      answer: "Thông thường quy trình xét duyệt dự án mất từ 3-5 ngày làm việc sau khi nhận đủ hồ sơ hợp lệ.",
      id: "o2"
    },
    {
      question: "Dự án gây quỹ của tôi có thời hạn không?",
      answer: "Có, mỗi dự án có thời hạn tối đa là 90 ngày. Bạn có thể gia hạn nếu cần thiết sau khi được xét duyệt.",
      id: "o3"
    },
    {
      question: "Làm cách nào để cập nhật và cảm ơn các nhà tài trợ của tôi?",
      answer: "Bạn có thể đăng cập nhật tiến độ dự án và gửi lời cảm ơn thông qua hệ thống quản lý dự án trên Volunteerwork.vn.",
      id: "o4"
    },
    {
      question: "Làm cách nào để nhận các khoản đóng góp trên Volunteerwork.vn?",
      answer: "Các khoản đóng góp sẽ được chuyển trực tiếp vào tài khoản ngân hàng của tổ chức sau khi hoàn tất quy trình xác minh.",
      id: "o5"
    }
  ];

  const AccordionItem = ({ question, answer, id }) => (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-6 text-left hover:bg-gray-50 flex justify-between items-center"
        onClick={() => document.getElementById(id).classList.toggle('hidden')}
      >
        <span className="text-gray-800">{question}</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </button>
      <div id={id} className="hidden px-6 py-4 bg-gray-50">
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Banner */}
      <div className="bg-white-600 text-black py-20 px-7">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">FAQs</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Supporter Section */}
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold p-6 border-b border-gray-200">
              Dành cho Người ủng hộ
            </h2>
            <div className="divide-y divide-gray-200">
              {supporterQuestions.map((item) => (
                <AccordionItem key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Organization Section */}
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold p-6 border-b border-gray-200">
              Dành cho Tổ chức gây quỹ
            </h2>
            <div className="divide-y divide-gray-200">
              {organizationQuestions.map((item) => (
                <AccordionItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Usage Guide Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">HƯỚNG DẪN SỬ DỤNG</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">TÍNH NĂNG SỬ GIÁ GÂY QUỸ</h3>
              <p className="text-gray-600 mb-4">
                Tính năng Sứ giả gây quỹ cho phép người dùng được xác thực trên hệ thống tham gia vào việc truyền thông, vận động gây quỹ cho các Tổ chức...
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
                XEM CHI TIẾT
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">TÍNH NĂNG ỦNG HỘ</h3>
              <p className="text-gray-600 mb-4">
                Bạn có thể ủng hộ các dự án qua 03 bước đơn giản bằng các tài khoản thanh toán điện tử như Internet Banking, Ví điện tử, Thẻ thanh toán quốc tế, ...
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
                XEM CHI TIẾT
              </button>
            </div>
          </div>
        </div>

        {/* Partnership Section */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-6">HỢP TÁC VỚI VOLUNTEERWORK?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Volunteerwork cung cấp nền tảng cho các tổ chức có chức năng vận động và tiếp nhận tài trợ thực hiện việc khởi tạo các dự án gây quỹ trên nền tảng Volunteerwork.vn
          </p>
          <a
            href="mailto:volunteerwork.tdmu@gmail.com"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            LIÊN HỆ VOLUNTEERWORK
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

