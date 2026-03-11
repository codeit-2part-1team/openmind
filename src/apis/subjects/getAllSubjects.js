import axiosInstance from '../axiosInstance';

const getAllSubjects = async ({ limit, offset } = {}) => {
  try {
    const response = await axiosInstance.get('/subjects/', {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error('데이터를 불러오는데 실패했습니다.', error);
    throw error;
  }
};

export default getAllSubjects;
