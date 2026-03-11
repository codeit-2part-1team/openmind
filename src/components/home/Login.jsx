import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import postSubjects from '../../apis/subjects/postSubjects';
import { useState } from 'react';

const Login = ({ placeholder }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!name) {
      alert('이름을 입력해주세요!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await postSubjects({ name, team: '1' });
      const { id } = response;
      const TEN_MINUTES = 10 * 60 * 1000; //10분
      const expiryTime = new Date().getTime() + TEN_MINUTES;

      const storageData = {
        id: id,
        expiry: expiryTime,
      };

      localStorage.setItem('subjectId', JSON.stringify(storageData));

      navigate(`/post/${id}/answer`);
    } catch {
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputField
        placeholder={placeholder}
        value={name}
        handleChange={handleChange}
      />
      <PrimaryButton type="submit" disabled={isLoading} />
    </Container>
  );
};

export default Login;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px;
  background-color: var(--grayScale-10);
  border-radius: 16px;
  width: 400px;

  @media (max-width: 375px) {
    width: 305px;
    padding: 24px;
  }
`;
