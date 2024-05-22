"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Divider,
  Button,
  message,
} from "antd";

const { Title, Text } = Typography;

const convertToKST = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

const MyPage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://api.g-start-up.com/service1/api/user",
            {
              headers: {
                Authorization: `Bearer ${session.user.id}`,
              },
            }
          );
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  const handleSponsorStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `https://api.g-start-up.com/service1/api/recruit-board/invest?id=${id}&status=${newStatus}`
      );
      message.success(`Status updated to ${newStatus}`);
      alert(`제안을 ${newStatus === "accept" ? "수락" : "거절"}하였습니다.`);
      // Optionally, refresh data after update
    } catch (error) {
      message.error("Error updating status");
      console.error("Error updating status:", error);
    }
  };

  const handleRecruitStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `https://api.g-start-up.com/service1/api/recruit-board/recruit?id=${id}&status=${newStatus}`
      );
      message.success(`Status updated to ${newStatus}`);
      alert(`제안을 ${newStatus === "accept" ? "수락" : "거절"}하였습니다.`);
      // Optionally, refresh data after update
    } catch (error) {
      message.error("Error updating status");
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  const { info, sponse_info, recruit_info } = data;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={
              <>
                <Title
                  level={3}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  내 정보
                </Title>
                <Divider style={{ border: "2px solid black" }} />
              </>
            }
            style={{ border: "1px solid black" }}
          >
            <Text style={{ fontSize: "20px" }}>
              <strong>이름:</strong> {info.username}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>아이디(이메일):</strong> {info.email}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>가입일자:</strong> {convertToKST(info.joindate)}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>생년월일:</strong> {convertToKST(info.birthdate)}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>국적:</strong> {info.nationality}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>지역:</strong> {info.region}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>전화번호:</strong> {info.tel}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>관심사:</strong> {info.interests}
            </Text>
            <Divider />
            <Text style={{ fontSize: "20px" }}>
              <strong>사용자유형:</strong> {info.role}
            </Text>
          </Card>
        </Col>
        <Col span={12}>
          <Title
            level={3}
            style={{
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            스폰서 현황
          </Title>
          <Divider style={{ border: "2px solid black" }} />
          <Card
            style={{
              border: "1px solid black",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            {sponse_info.map((sponsor) => (
              <div key={sponsor.sid} style={{ marginBottom: "20px" }}>
                <Card
                  style={{ marginBottom: "10px", border: "1px solid #d9d9d9" }}
                >
                  <Text style={{ fontSize: "20px" }}>
                    <strong>제목:</strong> {sponsor.title}
                  </Text>
                  <Divider />
                  <Text style={{ fontSize: "20px" }}>
                    <strong>내용:</strong> {sponsor.content}
                  </Text>
                  <Divider />
                  <Text style={{ fontSize: "20px" }}>
                    <strong>상태:</strong> {sponsor.status}
                  </Text>
                  <Divider />
                  <Button
                    type="primary"
                    onClick={() =>
                      handleSponsorStatusChange(sponsor.sid, "accept")
                    }
                    style={{ marginRight: "10px" }}
                  >
                    수락
                  </Button>
                  <Button
                    type="danger"
                    onClick={() =>
                      handleSponsorStatusChange(sponsor.sid, "reject")
                    }
                  >
                    거절
                  </Button>
                </Card>
                <Divider style={{ border: "2px solid #f0f0f0" }} />
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Title
            level={3}
            style={{
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            채용 현황
          </Title>
          <Divider style={{ border: "2px solid black" }} />
          <Card
            style={{
              border: "1px solid black",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            {recruit_info.map((recruit) => (
              <div key={recruit.rid} style={{ marginBottom: "20px" }}>
                <Card
                  style={{ marginBottom: "10px", border: "1px solid #d9d9d9" }}
                >
                  <Text style={{ fontSize: "20px" }}>
                    <strong>제목:</strong> {recruit.title}
                  </Text>
                  <Divider />
                  <Text style={{ fontSize: "20px" }}>
                    <strong>내용:</strong> {recruit.content}
                  </Text>
                  <Divider />
                  <Text style={{ fontSize: "20px" }}>
                    <strong>상태:</strong> {recruit.status}
                  </Text>
                  <Divider />
                  <Button
                    type="primary"
                    onClick={() =>
                      handleRecruitStatusChange(recruit.rid, "accept")
                    }
                    style={{ marginRight: "10px" }}
                  >
                    수락
                  </Button>
                  <Button
                    type="danger"
                    onClick={() =>
                      handleRecruitStatusChange(recruit.rid, "reject")
                    }
                  >
                    거절
                  </Button>
                </Card>
                <Divider style={{ border: "2px solid #f0f0f0" }} />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyPage;
