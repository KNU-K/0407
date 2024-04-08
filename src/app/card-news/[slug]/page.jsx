import Container from "@/app/_components/container";
import { Intro } from "../../_components/intro";
import { Space } from "antd";
import CardContent from "@/app/_components/card-content";

import { TopNav } from "../_components/top-nav";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function cardNews() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("로그인 후 이용해주세요.");
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
            카드뉴스 게시판
          </h1>
        </Space>
        <CardContent />
      </Container>
    </main>
  );
}
