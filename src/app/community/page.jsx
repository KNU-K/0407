import Container from "@/app/_components/container";
import Board from "@/app/_components/list-board";
import { Intro } from "../_components/intro";
import { Space } from "antd";

import { TopNav } from "@/app/_components/top-nav";

export default function Community() {
  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        {/* <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>커�?�니?��</h1> */}
        <Space className="justify-between mb-3">
          <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>
            경험공유 게시판
          </h1>
        </Space>
        <Board />
      </Container>
    </main>
  );
}
