"use client";
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import { Intro } from "../_components/intro";
import { Space } from "antd";
import NoticeList from "@/app/_components/notice-list";

import { TopNav } from "../_components/top-nav";
export default function businessNotice() {
  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        <Space className="justify-between mb-3">
          <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>
            사업공고 게시판
          </h1>
        </Space>
        <NoticeList />
      </Container>
      <Footer />
    </main>
  );
}
