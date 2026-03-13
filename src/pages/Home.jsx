import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainImg from '../assets/images/image-main.svg';
import Login from '../components/home/Login';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storageData = localStorage.getItem('subjectId');

    if (!storageData) return;

    const idExpireCheck = async () => {
      try {
        const { id } = JSON.parse(storageData);
        navigate(`/post/${id}/answer`);
      } catch (error) {
        console.error('Storage data error:', error);
      }
    };

    idExpireCheck();
  }, [navigate]);

  return (
    <Container>
      <ContentBox>
        <Wrapper>
          <ButtonContainer>
            <DesktopButton>
              <Link to="/list">
                <Button variant="outline">질문하러 가기</Button>
              </Link>
            </DesktopButton>
            <MobileButton>
              <Link to="/list">
                <Button variant="outline">질문하러 가기</Button>
              </Link>
            </MobileButton>
          </ButtonContainer>
          <DesktopLogo>
            <Logo size="large" />
          </DesktopLogo>
          <MobileLogo>
            <Logo size="medium" />
          </MobileLogo>
        </Wrapper>
        <Login placeholder="이름을 입력하세요" />
      </ContentBox>
      <MainImage src={MainImg} alt="" />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--grayScale-20);
  overflow: hidden;
  position: relative;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  z-index: 1;
  padding-bottom: 30vh;

  @media (max-width: 375px) {
    padding-bottom: 10vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  width: 100%;
  max-width: 1200px;
  padding: 0 50px;

  margin-top: 45px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    padding: 0 32px;
  }

  @media (max-width: 375px) {
    flex-direction: column-reverse;
    gap: 24px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-right: 0;

  @media (max-width: 375px) {
    justify-content: center;
  }
`;

const MainImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 1200px;
  flex-shrink: 0;
  display: block;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    width: 100%;
    bottom: 0;
  }
`;

const DesktopLogo = styled.div`
  display: block;
  @media (max-width: 375px) {
    display: none;
  }
`;

const MobileLogo = styled.div`
  display: none;
  @media (max-width: 375px) {
    display: block;
  }
`;

const DesktopButton = styled.div`
  display: block;
  @media (max-width: 375px) {
    display: none;
  }
`;
const MobileButton = styled.div`
  display: none;
  @media (max-width: 375px) {
    display: block;
  }
`;
