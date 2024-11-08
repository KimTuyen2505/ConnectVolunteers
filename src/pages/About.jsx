import React from 'react'

const volunteerItems = [
  {
    letter: 'Về Volunteerwork',
    title: 'Sứ Mệnh của Chúng Tôi',
    description: 'Chúng tôi tin rằng mỗi cá nhân đều có khả năng tạo ra sự thay đổi tích cực trong cộng đồng. Dự án Volunteerwork được thành lập với mục tiêu kết nối những tình nguyện viên đam mê với các tổ chức và dự án cần sự hỗ trợ. Chúng tôi cam kết mang đến cơ hội cho mọi người tham gia và góp phần xây dựng một xã hội tốt đẹp hơn.',
    image: '/test.jpg',
  },
  {
    letter: 'Giá Trị Cốt Lõi',
    title: 'Tình Nguyện - Đoàn Kết - Phát Triển Bền Vững',
    description: 'Phát Triển Bền Vững: Chúng tôi hướng tới việc phát triển các giải pháp bền vững cho các vấn đề xã hội và môi trường.',
    image: '/test.jpg',
  },
  {
    letter: 'Tham Gia Cùng Chúng Tôi',
    title: 'Bạn muốn tham gia cùng chúng tôi? ',
    description: 'Chúng tôi luôn chào đón những tình nguyện viên mới! Nếu bạn muốn tham gia, hãy liên hệ với chúng tôi qua trang web hoặc các kênh truyền thông xã hội. Hãy cùng nhau tạo nên sự khác biệt!',
    image: '/test.jpg',
  },
  
]

export default function About() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px', 
      backgroundColor: '#f0f8ff', 
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#0067cc', 
        fontSize: '68px', 
        marginBottom: '40px',
      }}>
        Our Volunteer Work
      </h1>
      {volunteerItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '80px',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '0 40px',
              textAlign: index % 2 === 0 ? 'left' : 'right',
            }}
          >
            <h2 style={{ 
              fontSize: '52px', 
              margin: '0', 
              color: '#0066cc',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {item.letter}
            </h2>
            <h3 style={{ 
              fontSize: '36px', 
              margin: '10px 0', 
              color: '#004080',
              transition: 'color 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.color = '#0066cc'}
            onMouseLeave={(e) => e.target.style.color = '#004080'}
            >
              {item.title}
            </h3>
            <p style={{ 
              fontSize: '18px', 
              color: '#333', 
              lineHeight: '1.6',
              marginBottom: '20px',
              transition: 'color 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.color = '#0066cc'}
            onMouseLeave={(e) => e.target.style.color = '#333'}
            >
              {item.description}
            </p>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              fontStyle: 'italic',
              transition: 'color 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.color = '#0066cc'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
            >
              {item.details}
            </p>
          </div>
          <div
            style={{
              width: '300px',
              height: '300px',
              flexShrink: 0,
              position: 'relative',
              transition: 'transform 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) rotate(-2deg)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(-5deg)'}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transform: 'rotate(-5deg)',
              transition: 'box-shadow 0.3s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-out',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
              width: '80px',
              height: '40px',
              backgroundColor: '#0066cc',
              borderRadius: '40px 40px 0 0',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}