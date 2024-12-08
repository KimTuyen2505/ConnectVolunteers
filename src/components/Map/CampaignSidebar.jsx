import React from 'react';
import Image from 'next/image';
import { ChevronUp } from 'lucide-react';

const CampaignSidebar = ({ campaigns, stats }) => {
  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="bg-orange-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Chiến dịch thiện nguyện</h2>
          <ChevronUp className="w-5 h-5 text-gray-500" />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-500">{stats.ongoing}</div>
            <div className="text-sm text-gray-600">Đang thực hiện</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">{stats.targeted}</div>
            <div className="text-sm text-gray-600">Đạt mục tiêu</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">{stats.completed}</div>
            <div className="text-sm text-gray-600">Đã kết thúc</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Gợi ý chiến dịch cần hỗ trợ</h3>
      
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <Image
                src={campaign.image || '/placeholder.svg?height=200&width=400'}
                alt={campaign.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold mb-2">{campaign.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                  {campaign.category}
                </span>
                {campaign.isEmergency && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">SOS</span>
                )}
              </div>
              <div className="bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Đạt {campaign.raised.toLocaleString()} VND</span>
                <span>{campaign.progress}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
                  Chi đường
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                  Ủng hộ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignSidebar;

