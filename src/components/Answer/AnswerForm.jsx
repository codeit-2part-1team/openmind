import { useState } from "react"
import styled from "styled-components";
import InputTextArea from "../common/InputTextArea";

const AnswerForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);

    console.log(e.target.value);
  };

  const handleSubmit = () => {
    const text = value.trim();

    if (!text) return;

    console.log("답변 완료:", text);
    onSubmit?.(text);
  };

  return (
    <FormContainer>
      <InputTextArea
        value={value}
        onChange={handleChange}
        placeholder="답변을 입력해주세요"
      />

      <SubmitButton
        disabled={!value.trim()}
        onClick={handleSubmit}
      >
        답변 완료
      </SubmitButton>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 532px;
  gap: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const SubmitButton = styled.button`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: ${({ disabled }) =>
    disabled ? "var(--brown-30)" : "var(--brown-40)"};
  color: var(--grayScale-10);
  cursor: ${({ disabled }) =>
    disabled ? "default" : "pointer"};
`;

export default AnswerForm;