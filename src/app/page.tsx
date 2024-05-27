import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { SessionProvider } from "next-auth/react";
import { TopNav } from "./_components/top-nav";
import Footer from "@/app/_components/footer";
import LatestNews from "@/app/_components/latestnews";
import Slide from "@/app/_components/slide";
import Noticeinfo from "@/app/_components/notice-info";
import Sponsorinfo from "@/app/_components/sponsor-info";
import { Divider } from "antd";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        <Slide />
        <Divider style={{ borderColor: "black" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            marginTop: "10px",
          }}
        >
          <div style={{ flex: 1, marginRight: "10px", maxWidth: "45%" }}>
            <Sponsorinfo />
          </div>
          <div style={{ flex: 2, marginLeft: "10px" }}>
            <Noticeinfo />
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
