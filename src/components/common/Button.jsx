// Button.jsx (Styled Components 사용 예시)
import styled from 'styled-components';
import ArrowIcon from '../../assets/icons/icon-arrow-right.svg';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-family: 'pretendard';
  background: var(--brown-40) url(ArrowIcon);
  color: white;
  height: 46px;
  font-size: 16px;
  padding: 0px 24px;
  border: none;
  border-radius: 8px;
  &:hover {
    background: var(--brown-40);
    box-shadow: 0 0 0 2px var(--brown-50) inset;
  }

  &:active {
    background: var(--brown-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
  img {
    filter: invert(1);
    width: 18px;
    margin-left: 8px;
  }
  // 크기 (Size) 설정
  ${({ size }) =>
    size === 'small' &&
    `
      padding: 0px 12px;
      font-size: 14px;
      height: 34px;
    `}

  // 종류 (Variant) 설정
  ${({ variant }) =>
    variant === 'outline' &&
    `
      border:1px solid var(--brown-40);
      background-color: var(--brown-10);
      color: var(--brown-40);
      &:hover {
        background: var(--brown-10);
        box-shadow: 0 0 0 2px var(--brown-40) inset;
      }
      &:active {
        background: var(--brown-20);
      }
      &:disabled {
        opacity: 0.5;
        background: var(--brown-10);
      }
      img {
        filter: invert(0);
      }
    `}
`;

export default function Button({ variant, size, children, ...props }) {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
      <img src={ArrowIcon} />
    </StyledButton>
  );
}

/* 사용 예시
  <Button variant="primary">기본 버튼</Button>
  <Button variant="outline">작은 버튼</Button>
  <Button variant="primary" size="small">
    기본 버튼
  </Button>
  <Button variant="outline" size="small">
    작은 버튼
  </Button>

  // Inactivate 상태
  <Button variant="primary" disabled>
    기본 버튼
  </Button>
  <Button variant="outline" disabled>
    작은 버튼
  </Button>
  <Button variant="primary" size="small" disabled>
    기본 버튼
  </Button>
  <Button variant="outline" size="small" disabled>
    작은 버튼
  </Button>
*/
