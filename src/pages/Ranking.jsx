import styled from 'styled-components';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import UserCard from '../components/common/UserCard';
import LikeButton from '../components/common/LikeButton';
import { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
// import axios from 'axios';
import { Link } from 'react-router-dom';

function Ranking() {
  const [bestUser, setBestUser] = useState([]);
  const [bestList, setBestList] = useState([]);

  const listSort = [...bestUser].sort(
    (a, b) => b.questionCount - a.questionCount
  );

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get('/subjects/', {
        params: {
          limit: 3,
        },
      });
      const { results } = response.data;
      setBestUser(results);
    };

    getUser();

    const hanldeLoadList = async () => {
      const response = await axiosInstance.get('/subjects/13391/questions/', {
        params: {
          limit: 5,
        },
      });
      const { results } = response.data;
      setBestList(results);
    };

    hanldeLoadList();
  }, []);

  console.log(bestUser);
  return (
    <Container>
      <Header>
        <Logo size="small" />
        <Button $variant="outline">
          <Link to="/list">질문하러 가기</Link>
        </Button>
      </Header>
      <RankingWrap>
        <div>
          <Title>인기 답변자 순위</Title>
          <BestUser>
            {listSort.map((item) => (
              <UserCard
                key={item.id}
                id={item.id}
                name={item.name}
                profileSrc={item.imageSource}
                count={item.questionCount}
              />
            ))}
          </BestUser>
        </div>

        <div>
          <Title>인기 질문 순위</Title>
          <BestCard>
            {bestList.map((item, ranking) => (
              <QuestionList key={item.id}>
                <div>
                  <ItemNum>👍 BEST {ranking + 1}</ItemNum>
                  <ItemContent>{item.name}</ItemContent>
                </div>
                <Count>
                  <LikeButton />
                </Count>
              </QuestionList>
            ))}
          </BestCard>
        </div>
      </RankingWrap>
    </Container>
  );
}

export default Ranking;

const Container = styled.div`
  max-width: 934px;
  margin: 0 auto;
  padding-bottom: 40px;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 32px 40px;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    padding: 0 24px 40px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0 46px;
  @media only screen and (max-width: 375px) {
    flex-direction: column;
  }
`;

const RankingWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const BestUser = styled.div`
  display: flex;
  gap: 20px;

  > div {
    max-width: initial;
  }
  > div:first-child > a > div > img {
    border:3px solid #FFBB00;
  }
    > div:nth-child(2n) > a > div > img {
    border:3px solid #cccccc;
  }
    > div:nth-child(3n) > a > div > img {
    border:3px solid #d3a69a;
  }

  > div:first-child > a > div > span:before {
    content:'🥇';
  }

  @media only screen and (max-width: 375px) {
    
      flex-direction: column;

`;

const BestCard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--brown-10);
  border: 1px solid var(--brown-30);
  border-radius: 16px;
  padding: 16px;
`;

const QuestionList = styled.div`
  background: var(--grayScale-10);
  box-shadow: var(--shadow-1pt);
  padding: 20px;
  border-radius: 16px;
`;

const ItemNum = styled.div`
  color: #e6a900;
  font-weight: 500;
  font-size: 16px;
`;

const ItemContent = styled.div`
  margin-top: 8px;
  font-size: 18px;
  line-height: 24px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 3;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Count = styled.div`
  border-top: 1px solid var(--grayScale-30);
  margin-top: 16px;
  padding: 14px 0 0 0;
`;
