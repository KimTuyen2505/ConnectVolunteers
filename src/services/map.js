import axios from 'axios';

export const fetchCharityProjects = async () => {
  try {
    const response = await axios.get('/api/charity-projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching charity projects:', error);
    return [];
  }
};

// Thêm các hàm xử lý logic khác ở đây nếu cần

