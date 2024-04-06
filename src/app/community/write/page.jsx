import Container from "@/app/_components/container";
import WriteBoard from "@/app/_components/write-board";
import { Intro } from "@/app/_components/intro";
import { Space } from 'antd';

export default function Write() {
  return (
    <main>
      <Container>
      <Intro/>
      <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>커뮤니티</h1>
      </Space>
        <WriteBoard />
      </Container>
    </main>
  );
}
