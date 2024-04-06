'use client';
import Container from '@/app/_components/container';
import { Intro } from '@/app/_components/intro';
import CardList from "@/app/_components/card-list";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Flex, Space } from 'antd';

export default function Index() {
  const { Meta } = Card;

  return (
    <main>
      <Container>
        <Intro />
        <CardList />
      </Container>
    </main>
  );
}
