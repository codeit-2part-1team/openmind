import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import CardFrame from '../components/common/CardFrame';
import axiosInstance from '../apis/axiosInstance';

export default function Post () {
    const { id } = useParams();
    const [profile, setProfile] = useState(null); // 프로필 데이터

      // id 기준으로 프로필 호출
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const res = await axiosInstance.get(`/subjects/${id}/`);
        setProfile(res.data);
      } catch (error) {
        console.error("프로필 불러오기 실패", error);
      }
    };

    fetchProfile();
  }, [id]);

    return (
    <Layout profile={profile}>
      <CardFrame
        profile={profile} //테스트
        subjectID={id}
        showMenu={false}
        showAnswerForm={false}
      />
    </Layout>
    )
};