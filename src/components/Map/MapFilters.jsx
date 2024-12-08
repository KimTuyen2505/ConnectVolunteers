import React from 'react';

const filters = [
  { id: 'emergency', label: 'Cứu trợ', count: '20' },
  { id: 'hunger', label: 'Xóa đói' },
  { id: 'children', label: 'Trẻ em' },
  { id: 'elderly', label: 'Người già' },
  { id: 'poor', label: 'Người nghèo' },
  { id: 'disabled', label: 'Người khuyết tật' },
  { id: 'disease', label: 'Bệnh hiểm nghèo' },
];

const MapFilters = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="absolute top-20 left-4 right-4 z-[1000]">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedFilter === filter.id
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filter.label}
            {filter.count && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapFilters;

