import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  background-color: var(--grayScale-20);
  border-radius: 8px;
  border: 1px solid transparent;

  &:focus-within {
    border: 1px solid var(--brown-40);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: var(--grayScale-60);
  font-family: inherit;

  &::placeholder {
    color: var(--grayScale-40);
  }
`;

const InputTextArea = ({ placeholder, value, onChange }) => {
  return (
    <Container>
      <TextArea placeholder={placeholder} value={value} onChange={onChange} />
    </Container>
  );
};

export default InputTextArea;
