import Container from "@/app/_components/container";
import Board from "@/app/_components/list-board";
import { Intro } from "../_components/intro";
import { Space } from 'antd';

export default function Community() {
  return (
    <main>
      <Container>
        <Intro />
        {/* <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>커뮤니티</h1> */}
        <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>커뮤니티</h1>
        </Space>
        <Board />
      </Container>
    </main>
  );
}
