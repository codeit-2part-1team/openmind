import axiosInstance from '../axiosInstance';

const postQuestion = async (subjectId, content) => {
  try {
    const res = await axiosInstance.post(`/subjects/${subjectId}/questions/`, {
      content,
    });

    return res.data;
  } catch (error) {
    console.error('질문 등록 실패', error);
    throw error;
  }
};

export default postQuestion;
