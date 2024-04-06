'use client'
import Container from "@/app/_components/container";
import SpaceCard from "@/app/_components/space-card";
import { Intro } from "../_components/intro";
import { Avatar, Card, Flex, Space  } from 'antd';
import { useState } from "react";

export default function BSpace() {
  const [cnt,setCnt] = useState(0);
  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
          <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>창업공간</h1>
        </Space>
        <SpaceCard/>
      </Container>
    </main>
  );
}
