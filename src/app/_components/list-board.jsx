"use client";
import * as React from "react";

import Link from "next/link";

import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import { Spin, Table, Button } from "antd";
// import { Button } from "@mui/material";
import { useState } from "react";
function convertToKST(dateString) {
  // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 한국 시간대로 변환하기 위한 옵션
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul", // KST
    hour12: false, // 24시간 형식
  };

  // Intl.DateTimeFormat을 사용하여 한국 시간대로 날짜와 시간 포맷
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
}
export default function CommunityBoard() {
  const [pageCount, setPageCount] = useState(1);
  const [curPageCount, setCurPageCount] = useState(1);
  const handlePageChange = async (page) => {
    await setCurPageCount(page);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.g-start-up.com/api/service1/question?pageNumber=${curPageCount}`
      );
      console.log(response.data);
      setPageCount(response.data.page_count);
      const dataWithNumber = response.data.data.map((item, index) => {
        return {
          ...item,
          number: (curPageCount - 1) * 10 + index + 1,
        };
      });
      setRows(dataWithNumber);
    };
    fetchData();
  }, [curPageCount]);

  const [rows, setRows] = React.useState(null);
  if (!rows) {
    return <Spin />;
  }
  const columns = [
    {
      title: "번호",
      dataIndex: "number",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (text, record) => (
        <Link href={`/community/${record.qid}`}>{text}</Link>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
    },
    {
      title: "작성일",
      dataIndex: "created_date",
      render: (text) => convertToKST(text),
    },
    {
      title: "조회수",
      dataIndex: "hit_count",
    },

    {
      title: "좋아요 수",
      dataIndex: "like_count",
    },
  ];
  return (
    <div>
      <div
        style={{
          textAlign: "right",
          marginRight: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Link href="/community/write">
          <Button
            type="primary"
            style={{
              fontSize: 15,
              fontWeight: "bolder",
            }}
            icon={<EditOutlined />}
            className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
          >
            글쓰기
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey={"qid"}
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {[...Array(pageCount)].map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
