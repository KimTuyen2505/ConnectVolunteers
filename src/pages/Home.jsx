import { Search } from "lucide-react"
import { useState } from "react";
import Slider from "../components/Slider";


export default function Home() {
  const [projects, setProjects] = useState(
    [
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
    {
      title: "Trái Tim Bé Nhỏ Của Như Ý Đang Cần Cứu",
      org: "Quỹ Từ thiện Nắng bước tuổi thơ",
      raised: "7.033.300đ",
      target: "15.000.000đ",
      progress: 46.9,
      category: "Trẻ em",
    },
  ]); 
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Slider>
        
      </Slider>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
      <h1 style={{ 
        textAlign: 'center', 
        color: '#0067cc', 
        fontSize: '68px', 
        marginBottom: '40px',
      }}>
        Dự Án Gây Quỹ
      </h1>
  <p className="text-yellow-600 text-center mb-8 text-2xl font-bold relative group">
    <span className="inline-flex items-center transition duration-300 transform group-hover:scale-105">
    🏆 Bảng Vàng:  Nguyễn Thị Thu
    </span>
  </p>


        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Trẻ em", "Giáo dục",  "Môi trường","Thiên tai"].map(
            (category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors"
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src="/Volunteer1.jpg"
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-2">{project.org}</p>
                <h3 className="font-bold text-lg mb-4 line-clamp-2">{project.title}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-blue-500">{project.raised}</span>
                  <span className="text-gray-600">{project.progress}%</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">với mục tiêu {project.target}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}