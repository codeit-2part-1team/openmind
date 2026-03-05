import styled, { css } from 'styled-components';

const BUTTON_STYLE = {
  primary: css`
    background: var(--brown-40);
    color: white;

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
    &::after {
      filter: invert(1);
    }
  `,
  outline: css`
    background: var(--brown-10);
    color: var(--brown-40);
    box-shadow: 0 0 0 1px var(--brown-40) inset;
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
      cursor: default;
      pointer-events: none;
    }
  `,
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  font-family: 'pretendard';
  height: ${({ $small }) => ($small ? '34px' : '46px')};
  padding: ${({ $small }) => ($small ? '0px 12px' : '0px 24px')};
  font-size: ${({ $small }) => ($small ? '14px' : '16px')};
  border-radius: ${({ $round }) => ($round ? '200px' : '8px')};
  ${({ $arrow }) =>
    $arrow &&
    css`
      &::after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        margin-left: 8px;
        background-image: url('src/assets/icons/icon-arrow-right.svg');
        background-size: cover;
      }
    `}

  ${({ type }) => BUTTON_STYLE[type]}
`;

export default Button;
