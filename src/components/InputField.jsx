import styled from 'styled-components';
import personIcon from '../assets/icons/icon-person.svg?react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background-color: var(--grayScale-10);
  border: 1px solid var(--grayScale-40);
  border-radius: 8px;
  width: 336px;

  &:focus-within {
    border-color: var(--brown-40);
  }
`;

const Image = styled(personIcon)`
  width: 20px;
  height: 20px;

  path {
    fill: var(--grayScale-40);
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  line-height: 22px;
  outline: none;
  background: transparent;
  color: var(--grayScale-60);

  &::placeholder {
    color: var(--grayScale-40);
  }
`;

const InputField = ({ placeholder, value, onChange }) => {
  return (
    <Container>
      <Image />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></Input>
    </Container>
  );
};

export default InputField;
