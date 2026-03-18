import styled, { keyframes } from 'styled-components';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import UserCard from '../components/common/UserCard';
import LikeButton from '../components/common/LikeButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAllSubjects from '../apis/subjects/getAllSubjects';
import getQuestion from '../apis/subjects/getQuestion';

function Ranking() {
  const [bestUser, setBestUser] = useState([]);
  const [bestList, setBestList] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    //답변자 순위
    const getUser = async () => {
      const response = await getAllSubjects({ limit: 1000, offset: 0 });
      setBestUser(response.results);
    };
    getUser();

    //질문 순위
    const getList = async () => {
      setLoading(true);
      const response = await getAllSubjects({ limit: 200 });
      const topSubjects = response.results
        .sort((a, b) => b.questionCount - a.questionCount)
        .slice(0, 10);
      const requests = topSubjects.map((item) => getQuestion(item.id));
      const responses = await Promise.all(requests);
      const allQuestions = responses.flatMap((res) => res.results);
      setBestList(allQuestions);
      setLoading(false);
    };

    getList();
  }, []);

  const userSort = [...bestUser]
    .sort((a, b) => b.questionCount - a.questionCount)
    .slice(0, 3);

  const listSort = [...bestList]
    .sort((a, b) => b.like - b.dislike - (a.like - a.dislike))
    .slice(0, 3);

  return (
    <Container>
      <Header>
        <Link to="/list">
          <Logo size="small" />
        </Link>
        <Link to="/list">
          <Button $variant="outline" children="질문하러 가기" />
        </Link>
      </Header>
      <RankingWrap>
        <div>
          <Title>인기 답변자 순위</Title>
          <BestUser>
            {userSort.map((item, index) => (
              <RankWrapper key={item.id} $rank={index}>
                <UserCard
                  id={item.id}
                  name={item.name}
                  profileSrc={item.imageSource}
                  count={item.questionCount}
                />
              </RankWrapper>
            ))}
          </BestUser>
        </div>

        <div>
          <Title>인기 질문 순위</Title>
          <BestCard>
            {loading ? (
              <Spinner />
            ) : (
              listSort.map((item, ranking) => (
                <QuestionList key={item.id}>
                  <Link to={`/post/${item.subjectId}`}>
                    <div>
                      <ItemNum>
                        <span>👍 BEST {ranking + 1}</span>
                      </ItemNum>
                      <ItemContent>{item.content}</ItemContent>
                    </div>
                    <Count>
                      <LikeButton
                        initialLike={item.like}
                        initialDislike={item.dislike}
                      />
                    </Count>
                  </Link>
                </QuestionList>
              ))
            )}
          </BestCard>
        </div>
      </RankingWrap>
    </Container>
  );
}

export default Ranking;

const Container = styled.div`
  max-width: 934px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    max-width: initial;
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

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const RankWrapper = styled.div`
  width: 100%;

  ${({ $rank }) =>
    $rank === 0 &&
    `
      > div > a > div > img {
    border: 3px solid #ffbb00;
  }
    div:first-child > a > div > span:before {
    content: '🥇';
  }
    `}
  ${({ $rank }) =>
    $rank === 1 &&
    `
      > div > a > div > img {
    border: 3px solid #cccccc;}
      > div > a > div > span:before {
      content: '🥈';
    }
    `}
  ${({ $rank }) =>
    $rank === 2 &&
    `
      > div > a > div > img {
        border: 3px solid #d3a69a;
      }
     > div > a > div > span:before {
        content: '🥉';
      }
    `}
`;

const BestCard = styled.div`
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
  &:hover {
    box-shadow: var(--shadow-2pt);
  }
`;

const ItemNum = styled.div`
  color: #e6a900;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  }
  
`;

const ItemContent = styled.div`
  margin-top: 8px;
  font-size: 18px;
  line-height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const Count = styled.div`
  border-top: 1px solid var(--grayScale-30);
  margin-top: 16px;
  padding: 24px 0 0 0;
  font-size: 14px;
  pointer-events: none;
`;

const Spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  align-self: center;
  margin: 50px 0;
  width: 40px;
  height: 40px;
  border: 4px solid var(--brown-30);
  border-top: 4px solid var(--brown-50);
  border-radius: 50%;
  animation: ${Spin} 1s linear infinite;
`;
