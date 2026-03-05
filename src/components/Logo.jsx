import styled, { css } from 'styled-components';
import logo from '../assets/images/image-logo.svg?react';

const SIZE = {
  large: css`
    width: 456px;
    height: 180px;
  `,
  medium: css`
    width: 248px;
    height: 98px;
  `,
  small: css`
    width: 146px;
    height: 57px;
  `,
};

const Image = styled(logo)`
  ${({ $size }) => $size}
`;

const Logo = ({ size = 'medium' }) => {
  return <Image $size={SIZE[size]} />;
};

export default Logo;

//props의 size를 넘겨주면됨
