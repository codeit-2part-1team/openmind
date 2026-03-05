import styled from "styled-components";

export const Badge = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: var(--Grayscale-10, #FFF);
  border: 1px solid
    ${({ $answerd }) => ($answerd ? "var(--brown-40)" : "var(--grayScale-40)")};
  color: ${({ $answerd }) => ($answerd ? "var(--brown-40)" : "var(--grayScale-40)")};
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */

  &::before {
    content: "${({ $answerd }) =>
      $answerd ? "답변 완료" : "미답변"}";
  }
`;

export default Badge;