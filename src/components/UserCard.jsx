import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MessagesIcon from '../assets/icons/icon-messages.svg?react';
import profileImage from '../assets/images/image-profile.svg';

const MOBILE = '375px';

const ProfileCard = styled.div`
  width: 100%;
  max-width: 220px;
  overflow: hidden;
  border: 1px solid var(--grayScale-40);
  border-radius: 16px;
`;

const CardLink = styled(Link)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: ${MOBILE}) {
    gap: 32px;

    &:hover {
      transform: none;
    }
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  background-color: var(--grayScale-30);

  @media (max-width: ${MOBILE}) {
    width: 48px;
    height: 48px;
  }
`;

const ProfileName = styled.span`
  font-size: 20px;
  line-height: 1.25;
  color: var(--grayScale-60);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: ${MOBILE}) {
    font-size: 18px;
  }
`;

const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: var(--grayScale-40);

  svg {
    width: 18px;
    height: 18px;

    path {
      fill: var(--grayScale-40);
    }
  }

  @media (max-width: ${MOBILE}) {
    font-size: 14px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const CountBox = styled.div`
  font-size: 16px;
  color: var(--grayScale-40);

  @media (max-width: ${MOBILE}) {
    font-size: 14px;
  }
`;

const Count = styled.span``;

function UserCard() {
  return (
    <ProfileCard>
      <CardLink to={`/post/1/answer`}>
        <ProfileBox>
          <ProfileImage src={profileImage} alt="프로필 이미지" />
          <ProfileName>아초는고양이</ProfileName>
        </ProfileBox>

        <QuestionInfo>
          <QuestionLabel>
            <MessagesIcon />
            받은 질문
          </QuestionLabel>

          <CountBox>
            <Count>9</Count>개
          </CountBox>
        </QuestionInfo>
      </CardLink>
    </ProfileCard>
  );
}

export default UserCard;
