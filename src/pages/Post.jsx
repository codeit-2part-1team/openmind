import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import { getSubject } from "../apis/subjects/getSubject";
import Modal from '../components/common/Modal';
import AnswerForm from '../components/answer/AnswerForm';
import postQuestion from '../apis/questions/postQuestion'
import QuestionButton from '../components/questionbutton/QuestionButton';

export default function Post () {
    const { id } = useParams();
    const [profile, setProfile] = useState(null); // 프로필 데이터
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questionTrigger, setQuestionTrigger] = useState(0);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

 // 질문 등록 함수 
  const handleQuestionSubmit = async (text) => {
    console.log("질문 전송 시도", { id, text }); // 디버깅용
    if (!id) {
      console.error("subjectId가 없습니다. 질문 등록 불가");
      return;
    }

    try {
      const res = await postQuestion(id, text); // 질문 생성 API 호출
      console.log("질문 등록 성공:", res);
      setQuestionTrigger(prev => prev + 1); // CardFrame 갱신
      closeModal();
    } catch (err) {
      console.error("질문 등록 실패", err.response?.data || err);
    }
  };

    // id 기준으로 프로필 호출
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const data = await getSubject(id);
        setProfile(data);
      } catch (error) {
        console.error("프로필 불러오기 실패", error);
      }
    };

    fetchProfile();
  }, [id]);

    return (
    <Layout profile={profile}>
      {/* 질문 작성 버튼 */}
      {!profile?.isOwnProfile && (
        <QuestionButton handleOpenModal={openModal} />
      )}

      {/* 모달 */}
      {isModalOpen && (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            profile={profile}
            onSubmit={handleQuestionSubmit}
            />
      )}

      {/* 피드 */}
      <CardFrame
        profile={profile}
        subjectID={id}
        showMenu={false}
        showAnswerForm={false}
        questionTrigger={questionTrigger} // 질문 등록 시 CardFrame 갱신
      />
    </Layout>
    )
};
