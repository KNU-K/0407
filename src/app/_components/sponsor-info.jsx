"use client";
import React, { useEffect, useState } from "react";
import { List, Card, Typography, Divider } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

const SponsorInfo = () => {
  const [recentSponsors, setRecentSponsors] = useState([]);

  useEffect(() => {
    const fetchRecentSponsors = async () => {
      try {
        const response = await axios.get(
          "https://api.g-start-up.com/service1/api/recruit-board"
        );
        const recentData = response.data.slice(0, 8).map((item) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          created_date: item.created_at,
        }));
        setRecentSponsors(recentData);
      } catch (error) {
        console.error("Error fetching recent sponsors:", error);
      }
    };

    fetchRecentSponsors();
  }, []);

  return (
    <Card
      style={{
        marginTop: 20,
        border: "3px solid black",
        borderRadius: "8px",
        height: "920px",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        실시간 채용/투자 모집
      </Title>
      <Divider style={{ borderColor: "black" }} />
      <List
        itemLayout="horizontal"
        dataSource={recentSponsors}
        renderItem={(item) => (
          <List.Item
            style={{ borderBottom: "2px solid #d9d9d9", padding: "10px 0" }}
          >
            <List.Item.Meta
              title={<a href={`/sponsor`}>{item.title}</a>}
              description={
                <>
                  <div>
                    <strong>작성자:</strong> {item.author}
                  </div>
                  <div>
                    <strong>작성일:</strong>{" "}
                    {moment(item.created_date).format("YYYY-MM-DD")}
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SponsorInfo;
