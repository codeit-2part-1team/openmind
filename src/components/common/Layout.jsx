import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; //useLocation 추가
import styled from 'styled-components';
import heroImg from '../../assets/images/image-hero.svg';
import Logo from '../common/Logo';
import profileImg from '../../assets/images/image-profile.svg';
import ShareButton from '../profile/ShareButton'; //공유버튼 활성화
import QuestionButton from '../questionbutton/QuestionButton';
//질문 작성 버튼

const Layout = ({ children, profile, isOwnProfile: propIsOwnProfile }) => {
  const navigate = useNavigate();
  const loggedInId = localStorage.getItem('subjectId');

  // props가 있으면 그대로 사용, 없으면 URL 기반으로 판단
  const isOwnProfile = propIsOwnProfile ?? (loggedInId === String(profile?.id));

  return (
    <Final>
      <BannerSection>
        <HeroImg src={heroImg} alt="배너 배경" />
        <ProfileOverlay>
          <button onClick={() => {
            const subjectId = localStorage.getItem("subjectId"); //로컬에 저장된 값

            if (subjectId) {
              navigate("/list");
            } else {
              navigate("/");
            }
          }} //로컬값 있으면 로고 클릭 시 -> list로, 없으면 메인페이지로
          >
            <Logo size="small" />
          </button>
          <ProfileImage
          //src={profileImg} -> 하단 테스트로 인한 임시 주석처리
          src={profile?.imageSource || profileImg} //테스트
          alt="프로필 이미지"/>
            {/* 상단의 onClick 부분 테스트로 임시 추가 */}
          { /* <Username>아초는고양이</Username> 하단 테스트로 인한 임시 주석처리 */}
          <Username>{profile?.name || '사용자'}</Username>
          <SNSContainer>
            {/* <Img src={profileImg} />
            <Img src={profileImg} />
            <Img src={profileImg} /> */}
            <ShareButton /> {/* 공유버튼 활성화 */}
          </SNSContainer>
        </ProfileOverlay>
      </BannerSection>
      <MainContent>
        <QuestionContainer>
          {children}
        </QuestionContainer>
        </MainContent>

      {/* 질문 버튼 -> 내 페이지에서는 숨김 */}
      {/* {!isOwnProfile && onOpenModal && <QuestionButton handleOpenModal={onOpenModal} />} */}
    </Final>
  );
};

export default Layout;

const Final = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 234px;
  display: flex;
  justify-content: center;
`;

const HeroImg = styled.img`
  width: 1400px;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileOverlay = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%;
`;

const Username = styled.h1`
  color: var(--grayScale-60);
  font-size: 32px;
  font-weight: 400;
`;

const SNSContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 700px;
  margin-top: 189px;
  padding: 0 32px;

  @media (max-width: 375px) {
    padding: 0 24px;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;
