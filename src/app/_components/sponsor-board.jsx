"use client";
import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { EditOutlined } from "@ant-design/icons";

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
const convertToKST = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

const SponsorBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { data: session, status } = useSession();
  const [form] = Form.useForm();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://api.g-start-up.com/api/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${session.user.id}`,
          },
        }
      );
      setUserRole(response.data.info.role);
      console.log(response.data.info.role);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.g-start-up.com/api/recruit-board"
      );
      const fetchedData = response.data.map((item, index) => ({
        key: item.id,
        number: index + 1,
        title: item.title,
        author: item.author,
        created_date: item.created_at,
      }));
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const fetchSponsorData = async (id) => {
    try {
      if (status === "unauthenticated") {
        alert("로그인 후 이용해주세요.");
        return;
      }

      const response = await axios.get(
        `https://api.g-start-up.com/api/recruit-board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.id}`,
          },
        }
      );
      setModalData(response.data[0]);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching sponsor data: ", error);
    }
  };

  const handleInvest = async (id) => {
    console.log("Invest ID:", id); // POST 요청에 사용된 id 값 출력
    try {
      if (status === "unauthenticated") {
        alert("로그인 후 이용해주세요.");
        return;
      }

      await axios.post(
        `https://api.g-start-up.com/api/recruit-board/${id}/invest`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.user.id}`,
          },
        }
      );
      alert("투자하기 요청이 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error("Error sending invest request: ", error);
    }
  };

  const handleRecruit = async (id) => {
    console.log("Recruit ID:", id); // POST 요청에 사용된 id 값 출력
    try {
      if (status === "unauthenticated") {
        alert("로그인 후 이용해주세요.");
        return;
      }

      await axios.post(
        `https://api.g-start-up.com/api/recruit-board/${id}/recruit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.user.id}`,
          },
        }
      );
      alert("채용지원하기 요청이 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error("Error sending recruit request: ", error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (status === "unauthenticated") {
        alert("로그인 후 이용해주세요.");
        return;
      }

      await axios.post("https://api.g-start-up.com/api/recruit-board", values, {
        headers: {
          Authorization: `Bearer ${session.user.id}`,
        },
      });
      alert("게시글이 성공적으로 작성되었습니다.");
      setIsFormModalVisible(false);
      fetchData(); // 새로운 데이터를 불러오기 위해 테이블을 갱신합니다.
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  useEffect(() => {
    // fetchUserData();
    fetchData();
    fetchUserData();
  }, []);

  const columns = [
    {
      title: "번호",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a onClick={() => fetchSponsorData(record.key)}>{text}</a>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "작성일",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => convertToKST(text),
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div
        style={{
          textAlign: "right",
          marginRight: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Button
          type="primary"
          style={{ marginBottom: 16, fontSize: 15, fontWeight: "bolder" }}
          onClick={() => setIsFormModalVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
          icon={<EditOutlined />}
        >
          글쓰기
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 10, // 페이지 당 항목 수
          position: ["bottomCenter"],
        }}
        className="custom-pagination"
      />

      <Modal
        // title={modalData?.title}
        title={
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>
            {modalData?.title}
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // 모달의 너비를 800px로 설정
        className="custom-modal"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        {modalData && (
          <div>
            <p style={{ fontSize: "18px" }}>
              <strong>작성자:</strong> {modalData.author}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>내용:</strong> {modalData.content}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>모집 인원:</strong> {modalData.number_of_recruits}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>작성일:</strong> {convertToKST(modalData.created_at)}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                onClick={() => handleInvest(modalData.id)}
                disabled={userRole !== "Sponsor"}
              >
                투자하기
              </Button>
              <Button
                type="default"
                onClick={() => handleRecruit(modalData.id)}
                disabled={userRole !== "Entrepreneur"}
              >
                채용지원하기
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="게시글 작성"
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="title"
            label="제목"
            rules={[{ required: true, message: "제목을 입력해주세요." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="내용"
            rules={[{ required: true, message: "내용을 입력해주세요." }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="numberOfRecruits"
            label="모집 인원"
            rules={[{ required: true, message: "모집 인원을 입력해주세요." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              작성
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SponsorBoard;
