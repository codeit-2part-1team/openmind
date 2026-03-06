// /src/components/UserCard.jsx
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import MessagesIcon from '../assets/icons/icon-messages.svg?react';
import profileImage from '../assets/images/image-profile.svg';

const SIZE = {
  large: css`
    --card-height: 187px;
    --padding: 20px;
    --image: 60px;
    --name-font: 20px;
    --label-font: 16px;
    --icon: 18px;
    --count-font: 16px;
    --hover-scale: 1.03;
  `,
  small: css`
    --card-height: 168px;
    --padding: 16px;
    --image: 48px;
    --name-font: 18px;
    --label-font: 14px;
    --icon: 16px;
    --count-font: 14px;
    --hover-scale: 1;
  `,
};

const ProfileCard = styled.div`
  ${({ $size }) => SIZE[$size] ?? SIZE.large};

  width: 100%;
  max-width: 220px;
  height: var(--card-height);
  overflow: hidden;

  border: 1px solid var(--grayScale-40);
  border-radius: 16px;
`;

const CardLink = styled(Link)`
  padding: var(--padding);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(var(--hover-scale));
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: var(--image);
  height: var(--image);

  object-fit: cover;
  border-radius: 50%;

  background-color: var(--grayScale-30);
`;

const ProfileName = styled.span`
  font-size: var(--name-font);
  line-height: 1.25;

  color: var(--grayScale-60);

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  font-size: var(--label-font);
  color: var(--grayScale-40);

  svg {
    width: var(--icon);
    height: var(--icon);

    path {
      fill: var(--grayScale-40);
    }
  }
`;

const CountBox = styled.div`
  font-size: var(--count-font);
  color: var(--grayScale-40);
`;

const Count = styled.span``;

function UserCard({
  size = 'large',
  id = 1,
  name = '아초는고양이',
  count = 9,
  profileSrc = profileImage,
}) {
  return (
    <ProfileCard $size={size}>
      <CardLink
        to={`/post/${id}/answer`}
        aria-label={`${name}님의 질문 답변 페이지로 이동`}
      >
        <ProfileBox>
          <ProfileImage src={profileSrc} alt={`${name} 프로필 이미지`} />
          <ProfileName>{name}</ProfileName>
        </ProfileBox>

        <QuestionInfo>
          <QuestionLabel>
            <MessagesIcon />
            받은 질문
          </QuestionLabel>

          <CountBox>
            <Count>{count}</Count>개
          </CountBox>
        </QuestionInfo>
      </CardLink>
    </ProfileCard>
  );
}

export default UserCard;
