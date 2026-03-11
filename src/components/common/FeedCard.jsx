import styled from 'styled-components';
import ProfileImg from '../../assets/images/image-profile.svg';
import LikeButton from './LikeButton';
import Badge from "./Badge";
import { useState } from "react";
import AnswerForm from '../answer/AnswerForm';
import KebabMenu from '../answer/KebabMenu';

export default function FeedCard({
  data,
  showMenu = true,
  showAnswerForm = true,
  onDelete
}) {

  const [answers, setAnswers] = useState(data.answers);
  const [editMode, setEditMode] = useState(false);
  const [rejected, setRejected] = useState(false);

  const isAnswered = answers?.length > 0 || rejected;
  const badgeActive = isAnswered || rejected;
  const answerContent = answers[0]?.content || "";

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    onDelete?.(data.id);
  };

  const handleReject = () => {
    setRejected(true);
    setAnswers([]);
    setEditMode(false);
  };

  const handleSubmitAnswer = (text) => {
    setAnswers([{ content: text }]);
    setEditMode(false);
    setRejected(false);
  }

  return (
    <Container>
      
      <Header>
        <Badge $answered={badgeActive} />
        {showMenu && (
          <KebabMenu
            onEdit={isAnswered ? handleEdit : undefined}
            onDelete={handleDelete}
            onReject={handleReject}
          />
        )}
      </Header>

      <Question>
        <QuestionDate>질문 • {data.date || "2주전"}</QuestionDate>
        {data.question}
      </Question>

      <Form>
        <Profile src={ProfileImg} />
        <Content>
          <UserInfo>
            <Nickname>{data.author || "아초는 고양이"}</Nickname>
            <Date>{data.date || "2주전"}</Date>
          </UserInfo>
          {showAnswerForm && (editMode || !isAnswered) ? (
            <AnswerForm
              defaultValue={answerContent}
              onSubmit={handleSubmitAnswer}
            />
          ) : rejected ? (
            <RejectedText>답변 거절</RejectedText>
          ) : (
            isAnswered && <AnswerText>{answerContent}</AnswerText>
          )}
        </Content>
      </Form>

      <Footer>
        <LikeButton />
      </Footer>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  background: var(--grayScale-10, #fff);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-1pt);
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

const Nickname = styled.span`
  color: var(--grayScale-60, #000);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const Date = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

const Question = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-weight: 400;
  font-size: 18px;
`;

const QuestionDate = styled.span`
  color: var(--grayScale-40, #818181);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const RejectedText = styled.div`
  color: var(--red-50, #B93333);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 16px;
  color: var(--garyScale-60, #000);
  font-weight: 400;
  line-height: 22px;
  gap: 4px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid var(--grayScale-30);
  padding-top: 24px;
`;

const AnswerText = styled.div`
  font-size: 16px;
  color: var(--grayScale-60, #000);
  font-weight: 400;
  line-height: 22px;
`;