import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubject } from '../apis/subjects/getSubject';


export default function Answer() {
  const [deleteSignal, setDeleteSignal] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

   // url에서 id 가져오기
  const { id } = useParams(); // id 추출

  // 내 프로필인지 여부
  const loggedInId = String(JSON.parse(localStorage.getItem('subjectId'))?.id); 
  const isOwnProfile = loggedInId === id;

  useEffect(() => {
    if (!id && !storedId) {
      navigate('/');
    }
  }, [id, navigate]);


  const handleDeleteAll = () => {
    const confirmed = window.confirm('삭제하시겠습니까?');
    if (confirmed) {
      setDeleteSignal((prev) => prev + 1);
    }
  };

 // post id 기준으로 바로 프로필 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await getSubject(id);
        setProfile(data);
      } catch (err) {
        console.error('프로필 불러오기 실패', err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <Layout profile={profile} isOwnProfile={isOwnProfile}>

      <AnswerContainer>
        {questionCount > 0 && (
          <DeleteButton onClick={handleDeleteAll}>
            삭제하기
          </DeleteButton>
        )}
      </AnswerContainer>

      <CardFrame
        subjectID={loggedInId}
        profile={profile}
        showMenu={true}
        showAnswerForm={true}
        deleteSignal={deleteSignal}
        setQuestionCount={setQuestionCount}
      />
    </Layout>
  );
}

const AnswerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  display: flex;
  margin-bottom: 14px;
  width: 100px;
  height: 35px;
  padding: 12px 22px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 200px;
  background: var(--brown-40, #542f1a);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--grayScale-10, #fff);
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
`;