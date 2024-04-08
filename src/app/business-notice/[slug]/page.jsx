"use client";
import Container from "@/app/_components/container";
import { Intro } from "../../_components/intro";
import { Space } from "antd";
import NoticeContent from "@/app/_components/notice-content";

import { TopNav } from "../../_components/top-nav";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function businessNotice() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("접근 불가");
      window.history.back();
    }
  }, [status]);
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
        <NoticeContent />
      </Container>
    </main>
  );
}
