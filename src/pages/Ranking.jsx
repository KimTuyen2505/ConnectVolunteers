import React from 'react';
import { FaMedal } from 'react-icons/fa';

const volunteers = [
  { name: "Nguyễn Thị Thu", activities: 45, image: "/member1.jpg" },
  { name: "Đặng Thị Bích Thủy", activities: 42, image: "/member1.jpg" },
  { name: "Nguyễn Đặng Kim Tuyến", activities: 40, image: "/member1.jpg" },
  { name: "Trần Phước Yên", activities: 38, image: "/member1.jpg" },
  { name: "Mai Hoàng Phúc", activities: 35, image: "/member1.jpg" },
];

export default function Ranking() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-blue-600 text-5xl font-bold text-center mb-12 animate-fade-in">
          Top 10 Volunteers
        </h1>
        
        <div className="space-y-4">
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-gray-300' :
                    index === 2 ? 'bg-amber-600' : 'bg-blue-600'}
                  text-white font-bold text-xl animate-bounce
                `}>
                  {index < 3 ? (
                    <FaMedal className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                    {volunteer.name}
                  </h2>
                  <p className="text-gray-600 animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                    {volunteer.activities} activities
                  </p>
                </div>
              </div>

              <div className="relative animate-scale-in" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 shadow-inner">
                  <img
                    src={volunteer.image}
                    alt={`${volunteer.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                  {volunteer.activities}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}