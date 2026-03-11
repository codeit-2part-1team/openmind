import axiosInstance from '../axiosInstance';

const postSubjects = async (subjectData) => {
  try {
    const response = await axiosInstance.post('/subjects/', subjectData);

    return response.data;
  } catch (error) {
    console.error('로그인 중 에러가 발생했습니다.', error);
    throw error;
  }
};

export default postSubjects;
