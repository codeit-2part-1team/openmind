import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import { useState } from 'react';
import styled from 'styled-components';

export default function Answer() {

  // MockData
  const [questions, setQuestions] = useState([
    {
    id: 1,
    question: "좋아하는 음식은?",
    author: "아초는 고양이",
    date: "2주전",
    answers: []
  },
  {
    id: 2,
    question: "좋아하는 음식은?",
    author: "아초는 고양이",
    date: "1주전",
    answers: [
      {
        content: "아무래도 치킨이죠"
      }
    ]
  },
  {
    id: 3,
    question: "좋아하는 음식은?",
    author: "아초는 고양이",
    date: "3일전",
    answers: []
  }
  ]);

  const handleDeleteAll = () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      setQuestions([]);
    }
  };

  return (
    <Layout>

      <AnswerContainer>
        {questions.length > 0 && (
          <DeleteButton onClick={handleDeleteAll}>
          삭제하기
        </DeleteButton>
        )}
      </AnswerContainer>

      <CardFrame
        questions={questions}
        showMenu={true}
        showAnswerForm={true}
      />
    </Layout>
  )
};

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
  background: var(--brown-40, #542F1A);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--grayScale-10, #fff);
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
`;