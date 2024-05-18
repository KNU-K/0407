"use client";
import Container from "@/app/_components/container";
import SpaceCard from "@/app/_components/space-card";
import { Intro } from "../_components/intro";
import { Avatar, Card, Flex, Space } from "antd";
import { useState } from "react";
import { TopNav } from "../_components/top-nav";
import Footer from "@/app/_components/footer";
import SponsorBoard from "@/app/_components/sponsor-board";

export default function Sponsor() {
  const [cnt, setCnt] = useState(0);
  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        <Space className="justify-between mb-3">
          <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>스폰서쉽</h1>
        </Space>
        <SponsorBoard />
      </Container>
      <Footer />
    </main>
  );
}
