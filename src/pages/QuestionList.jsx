import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import SortDropdown from '../components/questionlist/Dropdown';
import UserCard from '../components/common/UserCard';
import Pagination from '../components/questionlist/Pagination';
import getAllSubjects from '../apis/subjects/getAllSubjects';

const TABLET = 949;
const MOBILE = 767;
const DEFAULT_SORT = 'recent';

function getValidPage(value) {
  const page = Number(value);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}

function QuestionList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(window.innerWidth <= TABLET ? 6 : 8);
  const currentPage = getValidPage(searchParams.get('page'));
  const sort = searchParams.get('sort') || DEFAULT_SORT;
  const totalCount = subjects.length;

  const MOBILE_PAGE_SIZE = 6;
  const DESKTOP_PAGE_SIZE = 8;
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${TABLET}px)`);
    const handleBreakpointChange = (event) => {
      setPageSize(event.matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
    };
    handleBreakpointChange(mediaQuery);
    mediaQuery.addEventListener('change', handleBreakpointChange);
    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  async function fetchAllSubjectsData() {
    const initialResponse = await getAllSubjects({
      limit: 1,
      offset: 0,
    });

    const totalCount = initialResponse.count ?? 0;

    if (totalCount === 0) {
      return [];
    }

    const response = await getAllSubjects({
      limit: totalCount,
      offset: 0,
    });

    return response.results ?? [];
  }

  useEffect(() => {
    let cancelled = false;

    const loadSubjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const subjects = await fetchAllSubjectsData();

        if (cancelled) return;
        setSubjects(subjects);
      } catch (error) {
        if (cancelled) return;

        console.error('질문 목록 데이터를 불러오지 못했습니다.', error);
        setError('질문 목록을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSubjects();

    return () => {
      cancelled = true;
    };
  }, []);

  function compareByName(a, b) {
    const nameA = a.name.trim();
    const nameB = b.name.trim();

    return nameA.localeCompare(nameB, 'ko', {
      sensitivity: 'base',
    });
  }

  function compareByRecent(a, b) {
    const timeA = a.createdAt ? Date.parse(a.createdAt) : 0;
    const timeB = b.createdAt ? Date.parse(b.createdAt) : 0;

    if (timeA !== timeB) {
      return timeB - timeA;
    }

    return b.id - a.id;
  }

  const sortedSubjects = useMemo(() => {
    const copied = [...subjects];

    return copied.sort(sort === 'name' ? compareByName : compareByRecent);
  }, [subjects, sort]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    if (loading) return;
    if (currentPage <= totalPages) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(totalPages));
      return next;
    });
  }, [loading, currentPage, totalPages, setSearchParams]);

  const pagedSubjects = useMemo(() => {
    const offset = (currentPage - 1) * pageSize;
    return sortedSubjects.slice(offset, offset + pageSize);
  }, [sortedSubjects, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  };

  const handleSortChange = (nextSort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('sort', nextSort);
      return next;
    });
  };

  return (
    <Page>
      <Inner>
        <HeaderSection>
          <LogoArea>
            <LogoLink to="/list">
              <Logo size="small" />
            </LogoLink>
          </LogoArea>
          <ButtonArea>
            <Button as={Link} to="/ranking" variant="outline">
              랭킹보러 가기
            </Button>
            <Button as={Link} to="/answer" variant="outline">
              답변하러 가기
            </Button>
          </ButtonArea>
        </HeaderSection>

        <ContentSection>
          <TitleArea>
            <Title>누구에게 질문할까요?</Title>
            <SortDropdown value={sort} onChange={handleSortChange} />
          </TitleArea>

          {!loading && !error && (
            <CardArea>
              {pagedSubjects.map((subject) => (
                <UserCard
                  key={subject.id}
                  id={subject.id}
                  name={subject.name}
                  count={subject.questionCount}
                  profileSrc={subject.imageSource}
                  responsive
                />
              ))}
            </CardArea>
          )}
          {!error && totalCount > 0 && (
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              responsive
            />
          )}
          <LogoutButtonArea>
            <Button as={Link} to="/answer" variant="outline">
              로그아웃
            </Button>
          </LogoutButtonArea>
        </ContentSection>
      </Inner>
    </Page>
  );
}

export default QuestionList;

const Page = styled.div`
  padding: 40px 0 100px;
  display: flex;
  width: 100%;
  min-width: 360px;
  min-height: 100vh;
  background-color: var(--grayScale-20);

  @media (max-width: ${MOBILE}px) {
    padding: 40px 0 50px;
  }
`;
const Inner = styled.div`
  padding: 0 34px;
  margin: 0 auto;
  max-width: 1008px;
  width: 100%;

  @media (max-width: ${MOBILE}px) {
    padding: 0 24px;
  }
`;
const HeaderSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${MOBILE}px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;
const LogoArea = styled.div``;
const LogoLink = styled(Link)`
  display: block;
`;
const ButtonArea = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 10px;

  @media (max-width: ${MOBILE}px) {
    gap: 5px;

    a {
      padding: 0px 12px;
      font-size: 14px;
      height: 34px;
    }
  }
`;
const ContentSection = styled.div`
  position: relative;

  @media (max-width: ${MOBILE}px) {
    max-width: 456px;
    margin: 0 auto;
  }
`;
const TitleArea = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: ${MOBILE}px) {
    margin-bottom: 18px;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;

  @media (max-width: ${MOBILE}px) {
    font-size: 24px;
  }
`;
const CardArea = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${TABLET}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${MOBILE}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
`;
const LogoutButtonArea = styled.div`
  position: absolute;
  right: 0;
  bottom: -3px;

  @media (max-width: ${MOBILE}px) {
    margin-top: 20px;
    position: relative;
    text-align: right;

    a {
      bottom: auto;
      padding: 0px 12px;
      font-size: 14px;
      height: 34px;
    }
  }
`;
