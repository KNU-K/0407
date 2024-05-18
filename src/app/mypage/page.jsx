"use client";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import Mypage from "@/app/_components/mypage"; // 기존에 import한 Mypage
import { Avatar, Card, Flex, Space } from "antd";
import { TopNav } from "../_components/top-nav";
import Footer from "@/app/_components/footer";

export default function MypageComponent() {
  // 함수명을 MypageComponent로 변경
  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        <Space className="justify-between mb-3">
          <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>마이페이지</h1>
        </Space>
        <Mypage />
      </Container>
      <Footer />
    </main>
  );
}
