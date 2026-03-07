import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

/*
QuestionCard 컴포넌트
현 목데이터 기반
*/

function QuestionCardItem({ data }) {

  // 메뉴 토글 상태 관리
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 토글 - 메뉴 밖 클릭
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // 모바일 대응

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };

  }, []);

  // 프로필 이미지 (현 저작권 없는 랜덤으로 뒀습니다)
  const [profileImg] = useState(
    `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  );

  // 날짜 표시 (00월00일 3일전 1주전 2주전 ..etc)
  const getDateText = (createdAt) => {

    const now = new Date();
    const created = new Date(createdAt);

    const diffTime = now - created;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 3) {
      const month = created.getMonth() + 1;
      const date = created.getDate();
      return `${month}월 ${date}일`;
    }

    if (diffDays < 7) {
      return `${diffDays}일전`;
    }

    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주전`;
  };

  // 좋아요 싫어요 상태
  const [likeCount, setLikeCount] = useState(data.like);
  const [dislikeCount, setDislikeCount] = useState(data.dislike);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // 좋아요 클릭
  const handleLike = () => {

    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
      return;
    }

    setLikeCount(likeCount + 1);

    if (disliked) {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    }

    setLiked(true);
  };

  // 싫어요 클릭
  const handleDislike = () => {

    if (disliked) {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
      return;
    }

    setDislikeCount(dislikeCount + 1);

    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }

    setDisliked(true);
  };

  return (
    <Card>

      {/* 상단바: 답변 상태, 메뉴버튼 */}
      <TopBar>

        {/* 답변완료 */}
        <AnswerStatus>
          답변완료
        </AnswerStatus>

        {/* 메뉴 버튼 */}
        <MenuWrapper ref={menuRef}>

          <MenuBtn
            onClick={toggleMenu}
          >
            ⋯
          </MenuBtn>

          {/* 메뉴 누르면 */}
          {menuOpen && (
            <MenuDropdown>
              <MenuItem>수정</MenuItem>
              <MenuItem>삭제</MenuItem>
            </MenuDropdown>
          )}

        </MenuWrapper>
      </TopBar>

      {/* 질문 */}
      <QuestionHeader>
        <QuestionLabel>
          질문 · {getDateText(data.createdAt)}
        </QuestionLabel>
      </QuestionHeader>

      <QuestionText>
        {data.question}
      </QuestionText>

      {/* 답변 */}
      <AnswerBox>

        {/* 프로필 이미지 */}
        <ProfileImg src={profileImg} alt="profile" />

        <AnswerContent>

          {/* 닉네임, 날짜 */}
          <Header>
            <Nickname>{data.nickname}</Nickname>
            <DateText>{getDateText(data.createdAt)}</DateText>
          </Header>

          {/* 답변 내용 */}
          <Content>
            {data.content}
          </Content>

        </AnswerContent>

        {/* 좋아요, 싫어요 */}
        <Reaction>

          {/* TODO : 좋아요 컴포넌트 들어올 자리
          API 연동 시 data.like / data.dislike 사용 예정 */}
          <MockReaction>

            {/* 좋아요 버튼 */}
            <ReactionBtn
              className={liked ? "like-active" : ""}
              onClick={handleLike}
            >
              좋아요 {likeCount}개
            </ReactionBtn>

            {/* 싫어요 버튼 */}
            <ReactionBtn
              className={disliked ? "dislike-active" : ""}
              onClick={handleDislike}
            >
              싫어요 {dislikeCount}개
            </ReactionBtn>

          </MockReaction>

        </Reaction>

      </AnswerBox>

    </Card>
  );
}

//하단 주석 확인 요망

/*
  질문들 리스트 형태로 보여주는 컴포넌트
  아래는 현 목데이터를 사용하여 화면 구성
  -> 추후 api에서 질문 목록으로 대체 예정  
*/
const MOCK_DATA = [
  {
    id: 1,
    nickname: "아초는고양이",
    question: "좋아하는 동물은?",
    content: `그들을 불러 귀는 이상의 오직 피고, 가슴이 이상,
    못할 봄바람이다. 찾아다녀도, 전인 방황하였으며, 대한 바이며,
    이것이야말로 가치를 청춘의 따뜻한 그리하였는가?
    몸이 열락의 청춘의 때문이다. 천고에 피어나는 간에 밝은 이상,
    인생의 만물은 피다. 대중을 이성은 방황하여도, 그리하였는가?
    크고 평화스러운 품에 방황하였으며, 말이다. 이상은 들어 예수는
    크고 긴지라 역사를 피다. 얼음에 있음으로써 꽃 보배를 곧 가는 교향악이다.
    우는 새 예가 우리의 것은 피다. 피가 그것을 어디 앞이 기쁘며,
    이상의 열락의 위하여서 끝까지 것이다. 있는 봄바람을 방황하여도,
    우리의 것은 작고 아니한 영원히 듣기만 운다.`,
    createdAt: "2026-02-20T10:00:00",
    like: 3,
    dislike: 1
  },

  /* 하단은 예시라 주석 처리하겠습니다 */
  /*
  {
    id: 2,
    nickname: "강아지러버",
    question: "강아지 vs 고양이?",
    content: "나는 강아지가 더 좋다.",
    createdAt: "2026-03-03T10:00:00",
    like: 5,
    dislike: 2
  }
*/

];

/*
질문 목록 렌더링
  map()을 사용하여 질문 데이터를 하나씩
  QuestionCard 컴포넌트로 전달
*/
function QuestionCard() {

  return (
    <AppContainer>
      <div>
        {MOCK_DATA.map((item) => (
          <QuestionCardItem key={item.id} data={item} />
        ))}
      </div>
    </AppContainer>
  );
}

export default QuestionCard;

/* 아래는 스타일드 컴포넌트 */

/* 전체 컨테이너 */
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  background: #ffffff;
  min-height: 100vh;
`;

/* 질문 카드 */
const Card = styled.div`
  width: 600px;
  background: #fff;
  border: none;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 4px 0px #8C8C8C40;
`;

/* 상단 바 */
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

/* 답변 완료 박스 */
const AnswerStatus = styled.div`
  font-size: 14px;
  padding: 4px 12px;
  background: #ffffff;
  color: #542f1a;
  border: 1px solid #542F1A;
  border-radius: 8px;
  font-weight: 500;
`;

/* 메뉴 (버튼, 드롭다운) */
const MenuWrapper = styled.div`
  position: relative;
`;

const MenuBtn = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;

  &:hover{
    background: #f2f2f2;
  }
`;

/* 드롭다운 메뉴 */
const MenuDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 28px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  min-width: 80px;
  z-index: 10;
`;

const MenuItem = styled.button`
  border: none;
  background: none;
  padding: 8px 12px;
  text-align: left;
  font-size: 13px;
  cursor: pointer;

  &:hover{
    background: #f5f5f5;
  }
`;

/* 질문 부분 */
const QuestionHeader = styled.div`
  font-size: 14px;
  color: #818181;
  margin-bottom: 4px;
`;

const QuestionLabel = styled.span`
  font-weight: 500;
`;

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 32px;
`;

/* 답변 영역 (프로필, 내용, 따봉)  */
const AnswerBox = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
`;

const Reaction = styled.div`
  grid-column: 1 / -1;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #cfcfcf;
`;

const AnswerContent = styled.div`
  flex: 1;
`;

/* 프로필 이미지 */
const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

/* 닉네임, 날짜 */
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const Nickname = styled.div`
  font-weight: 400;
  font-size: 18px;
`;

const DateText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #818181;
`;

/* 답변 내용 */
const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`;

/* 따봉 부분 (현 목데이터) */
const MockReaction = styled.div`
  display: flex;
  gap: 20px;
`;

const ReactionBtn = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #777;
  cursor: pointer;

  /* 기본 hover */
  &:hover{
    color: #555;
  }

  /* 좋아요 활성 */
  &.like-active{
    color: #56A9F2;
  }

  /* 좋아요 hover (조금 더 진하게) */
  &.like-active:hover{
    color: #2F80ED;
  }

  /* 싫어요 활성 */
  &.dislike-active{
    color: #EB5757;
  }

  /* 싫어요 hover (조금 더 진하게) */
  &.dislike-active:hover{
    color: #C0392B;
  }
`;