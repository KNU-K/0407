import Container from "@/app/_components/container";
import { Intro } from "../../_components/intro";
import { Space } from 'antd';
import CardContent from "@/app/_components/card-content";

export default function cardNews() {
  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>카드뉴스</h1>
        </Space>
        <CardContent />
      </Container>
    </main>
  );
}
