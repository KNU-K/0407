import Container from "@/app/_components/container";
import { Intro } from "../../_components/intro";
import { Space } from 'antd';
import NoticeContent from "@/app/_components/notice-content";

export default function businessNotice() {
  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>사업공고 게시판</h1>
        </Space>
        <NoticeContent />
      </Container>
    </main>
  );
}
