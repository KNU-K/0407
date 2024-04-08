import Container from "@/app/_components/container";
import WriteBoard from "@/app/_components/write-board";
import { Intro } from "@/app/_components/intro";
import { Space } from "antd";

import { TopNav } from "@/app/_components/top-nav";
import { useSession } from "next-auth/react";
export default function Write() {
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
            경험공유 게시판
          </h1>
        </Space>
        <WriteBoard />
      </Container>
    </main>
  );
}
