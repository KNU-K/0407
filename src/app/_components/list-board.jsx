'use client';
import * as React from 'react';

import Link from 'next/link';

import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { Spin, Button, Table } from 'antd';
function convertToKST(dateString) {
  // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 한국 시간대로 변환하기 위한 옵션
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul', // KST
    hour12: false, // 24시간 형식
  };

  // Intl.DateTimeFormat을 사용하여 한국 시간대로 날짜와 시간 포맷
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
}
export default function CommunityBoard() {
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      'https://api.g-start-up.com/api/question/'
    );
    console.log(response.data);
    setRows(response.data.data);
  };
  const [rows, setRows] = React.useState(null);
  if (!rows) {
    return <Spin />;
  }
  const columns = [
    {
      title: '번호',
      dataIndex: 'qid',
    },
    {
      title: '제목',
      dataIndex: 'title',
      render: (text, record) => (
        <Link href={`/community/${record.qid}`}>{text}</Link>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'author',
    },

    {
      title: '조회수',
      dataIndex: 'hit_count',
    },
    {
      title: '좋아요 수',
      dataIndex: 'like_count',
    },
    {
      title: '작성일',
      dataIndex: 'created_date',
      render: (text) => convertToKST(text),
    },
  ];
  return (
    <div>
      <div
        style={{
          textAlign: 'right',
          marginRight: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Link href='/community/write'>
          <Button icon={<EditOutlined />}>글쓰기</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={rows} rowKey={'qid'} />
    </div>
  );
}
