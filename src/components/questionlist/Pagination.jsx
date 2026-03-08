import styled, { css } from 'styled-components';

const SIZE = {
  large: css`
    --box: 40px;
    --font: 20px;
  `,
  small: css`
    --box: 30px;
    --font: 16px;
  `,
};

const PAGES = [1, 2, 3, 4, 5];
const ACTIVE_PAGE = 4;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $size }) => SIZE[$size] ?? SIZE.large}
`;

const PageNavArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: var(--box);
  height: var(--box);
`;

const PageNavArrow = styled.button`
  width: 100%;
  height: 100%;

  font-size: var(--font);
  font-family: Actor, sans-serif;
  color: var(--grayScale-40);
`;

const PageNavList = styled.ol`
  display: flex;
`;

const PageNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: var(--box);
  height: var(--box);
`;

const PageNavLink = styled.button`
  width: 100%;
  height: 100%;

  font-size: var(--font);
  font-family: Actor, sans-serif;

  color: ${({ $active }) =>
    $active ? 'var(--brown-40)' : 'var(--grayScale-40)'};

  font-weight: ${({ $active }) => ($active ? 500 : 400)};
`;

function Pagination({ size = 'large' }) {
  return (
    <PaginationWrap $size={size} aria-label="페이지네이션">
      <PageNavArrowBox>
        <PageNavArrow type="button" aria-label="이전 페이지">
          {'<'}
        </PageNavArrow>
      </PageNavArrowBox>

      <PageNavList>
        {PAGES.map((page) => {
          const isActive = page === ACTIVE_PAGE;

          return (
            <PageNavItem key={page}>
              <PageNavLink
                type="button"
                $active={isActive}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </PageNavLink>
            </PageNavItem>
          );
        })}
      </PageNavList>

      <PageNavArrowBox>
        <PageNavArrow type="button" aria-label="다음 페이지">
          {'>'}
        </PageNavArrow>
      </PageNavArrowBox>
    </PaginationWrap>
  );
}

export default Pagination;
