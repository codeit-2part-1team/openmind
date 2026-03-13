import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import postSubjects from '../../apis/subjects/postSubjects';
import getAllSubjects from '../../apis/subjects/getAllSubjects';

const Login = ({ placeholder }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubjectsData = async () => {
    try {
      const cardData = await getAllSubjects({ limit: 100 });
      return cardData.results;
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다.', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!name) {
      alert('이름을 입력해주세요!');
      return;
    }

    setIsLoading(true);

    try {
      const results = await fetchSubjectsData();
      const checkName = results.find((subject) => subject.name === name);

      if (checkName) {
        const storageData = { id: checkName.id };
        localStorage.setItem('subjectId', JSON.stringify(storageData));
        navigate(`/post/${checkName.id}/answer`);
        return;
      }

      const response = await postSubjects({ name, team: '1' });
      const { id } = response;

      localStorage.setItem('subjectId', JSON.stringify({ id }));
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
