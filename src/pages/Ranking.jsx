import styled from 'styled-components';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import UserCard from '../components/common/UserCard';
import LikeButton from '../components/common/LikeButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAllSubjects from '../apis/subjects/getAllSubjects';
import getAllSubjectsQuestion from '../apis/subjects/getAllSubjectsQuestion';

function Ranking() {
  const [bestUser, setBestUser] = useState([]);
  const [bestList, setBestList] = useState([]);

  useEffect(() => {
    //답변자 순위
    const getUser = async () => {
      const response = await getAllSubjects({});
      setBestUser(response.results);
    };
    getUser();

    //질문 순위
    const getList = async () => {
      const response = await getAllSubjects({});
      const idList = response.results.map((item) => item.id);
      const requests = idList.map((id) => getAllSubjectsQuestion(id));
      const responses = await Promise.all(requests);
      const allQuestions = responses.flatMap((res) => res.results);
      setBestList(allQuestions);
    };

    getList();
  }, []);

  const userSort = [...bestUser]
    .sort((a, b) => b.questionCount - a.questionCount)
    .slice(0, 3);

  const listSort = [...bestList]
    .sort((a, b) => b.like - b.dislike - (a.like - a.dislike))
    .slice(0, 3);

  console.log(userSort);

  return (
    <Container>
      <Inner>
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
              {userSort.map((item) => (
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
              {listSort.map((item, ranking) => (
                <QuestionList key={item.id}>
                  <Link to={`/post/${item.id}/answer`}>
                    <div>
                      <ItemNum>BEST {ranking + 1}</ItemNum>
                      <ItemContent>{item.content}</ItemContent>
                    </div>
                    <Count>
                      <LikeButton
                        likeCounts={item.like}
                        dislikeCounts={item.dislike}
                      />
                    </Count>
                  </Link>
                </QuestionList>
              ))}
            </BestCard>
          </div>
        </RankingWrap>
      </Inner>
    </Container>
  );
}

export default Ranking;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Inner = styled.div`
  max-width: 934px;
  width: 100%;
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

  &:first-child > a > div:first-child > div:first-child:before {
    content: '👍';
    margin-right: 5px;
  }
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
