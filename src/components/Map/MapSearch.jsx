import React from 'react';
import { Search } from 'lucide-react';

const MapSearch = () => {
  return (
    <div className="absolute top-4 left-4 right-4 z-[1000]">
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên chiến dịch, địa điểm"
          className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default MapSearch;

