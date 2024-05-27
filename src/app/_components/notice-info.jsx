"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Badge, Modal, List, Card, Typography, Divider } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

const MainBoard = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.g-start-up.com/service1/api/article"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const listData = data.filter((item) =>
      moment(item.date_end).isSame(dateString, "day")
    );

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.a_id}>
            <Badge status="success" text={item.a_title} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const listData = data.filter((item) =>
      moment(item.date_end).isSame(dateString, "day")
    );
    setSelectedDate(dateString);
    setModalData(listData);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ border: "3px solid black", borderRadius: "8px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          사업공고 일정
        </Title>
        <Divider style={{ borderColor: "black" }} />
        <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      </Card>
      <Modal
        title={`Events on ${selectedDate}`}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={modalData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href={`/business-notice/${item.a_id}`}>{item.a_title}</a>
                }
                description={`${item.organization} - ${moment(
                  item.date_end
                ).format("YYYY-MM-DD")}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default MainBoard;
