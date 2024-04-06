'use client'
import Container from "@/app/_components/container";
import Join from "@/app/_components/join";
import { Intro } from "../_components/intro";
import { Space } from 'antd';
import axios from 'axios';


const JoinForm = () => {
  const handleFormSubmit = async (formData) => {
    try {
      await axios.post('https://api.g-start-up.com/api/user', formData);
      console.log('회원가입이 성공적으로 완료되었습니다.');
      window.location.href = '/';
      alert('회원가입 되었습니다. 가입하신 계정으로 로그인해주세요.');
      console.log(formData);
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>회원가입</h1>
        </Space>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Join onFinish={handleFormSubmit} />
        </div>

      </Container>
    </main>
  );
}

export default JoinForm;
