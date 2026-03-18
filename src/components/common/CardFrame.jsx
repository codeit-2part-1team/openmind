import styled from "styled-components";
import MsgIcon from "../../assets/icons/icon-messages.svg?react";
import EmptyIcon from "../../assets/images/image-empty.svg?react";
import FeedCard from "./FeedCard";
import { useEffect, useRef, useState } from "react";
import getQuestions from "../../apis/questions/getQuestions";
import deleteQuestion from "../../apis/questions/deleteQuestion";

export default function CardFrame({
  subjectID, //테스트 추가
  profile, //테스트 추가
  showMenu = true,
  showAnswerForm = false,
  deleteSignal,
  setQuestionCount,
  questionTrigger, //테스트 추가
}) {
  const [cardList, setCardList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerRef = useRef(null);
  const requestedOffsetsRef = useRef(new Set());

  const isEmpty = cardList.length === 0;

  const fetchQuestions = async (reset = false) => {
  if (loading && !reset) return; // reset 시 loading 무시
  const fetchOffset = reset ? 0 : offset;
  if (!reset && requestedOffsetsRef.current.has(offset)) return;

  try {
    requestedOffsetsRef.current.add(offset);
    setLoading(true);

    // const subjectData = JSON.parse(localStorage.getItem("subjectId"));
    // const subjectId = subjectData?.id;

    // reset이면 offset 0부터, 요청 기록 초기화
    const fetchOffset = reset ? 0 : offset;
    if (reset) requestedOffsetsRef.current.clear();

    if (!subjectID) {
      console.error("subjectID가 없습니다.");
      return;
    }

    const res = await getQuestions(subjectID, 3, fetchOffset);
    const results = res?.results ?? [];

    setTotalCount(res?.count ?? 0);

    setCardList((prev) => {
      const map = new Map();
      
      if (reset) {
        results.forEach(item => map.set(item.id, item));
      } else {
      [...prev, ...results].forEach(item => map.set(item.id, item));
        }

      return Array.from(map.values());
    });

    setOffset(fetchOffset + 3);
    requestedOffsetsRef.current.add(fetchOffset);

    if (res?.next === null) {
      setHasMore(false);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchQuestions();
  }, []);

  // questionTrigger 변경 시 새로고침 없이 갱신
  useEffect(() => {
    if (questionTrigger !== undefined) {
      fetchQuestions(true); // reset 옵션으로 새로 fetch
      }
  }, [questionTrigger]);

  useEffect(() => {
    if (setQuestionCount) {
      setQuestionCount(totalCount);
    }
  }, [totalCount, setQuestionCount]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && hasMore && !loading) {
        fetchQuestions();
      }
    });

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, offset]);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);

      setCardList((prev) => prev.filter((q) => q.id !== id));
      setTotalCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!deleteSignal) return;

    const deleteAll = async () => {
      try {
        for (const q of cardList) {
          await deleteQuestion(q.id);
        }

        setCardList([]);
        setTotalCount(0);
        setHasMore(false);
        requestedOffsetsRef.current.clear();
      } catch (error) {
        console.error(error);
      }
    };

    deleteAll();
  }, [deleteSignal]);

  return (
    <Container>
      {!isEmpty && (
        <Header>
          <MsgIcon />
          {totalCount}개의 질문이 있습니다
        </Header>
      )}

      {isEmpty ? (
        <EmptyWrapper>
          <Header>
            <MsgIcon />
            아직 질문이 없습니다
          </Header>
          <EmptyIcon />
        </EmptyWrapper>
      ) : (
        <>
          <CardList>
            {cardList.map((q) => (
              <FeedCard
                key={q.id}
                data={q}
                showMenu={showMenu}
                showAnswerForm={showAnswerForm}
                onDelete={handleDelete}
                profile={profile} //테스트
              />
            ))}
          </CardList>

          {hasMore && (
            <Observer ref={observerRef}>
              {loading ? "불러오는 중..." : ""}
            </Observer>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--brown-30, #c7bbb5);
  background: var(--brown-10, #f5f1ee);
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  gap: 8px;
  color: var(--brown-40, #542f1a);
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;

  svg path {
    fill: currentColor;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
`;

const Observer = styled.div`
  height: 40px;
`;