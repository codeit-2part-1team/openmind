import axiosInstance from '../axiosInstance';

const deleteSubjects = async (subjectId) => {
  try {
    const response = await axiosInstance.delete(`/subjects/${subjectId}/`);
    return response.status;
  } catch (error) {
    console.error('데이서 삭제를 실패했습니다.', error);
    throw error; //에러를 다시 던져줘야 호출하는 곳에서 catch문 실행 가능
  }
};

export default deleteSubjects;
