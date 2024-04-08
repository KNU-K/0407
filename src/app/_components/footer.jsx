// Footer.jsx
"use client";
import React, { useState } from "react";
import Container from "@/app/_components/container";
import { Button, Input, Modal } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const createModal = async () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleThankYouModal = async () => {
    setThankYouModalVisible(!thankYouModalVisible);
  };
  const handleSendFeedback = async () => {
    try {
      await axios.post("https://api.g-start-up.com/api/feedback/", {
        content: feedback,
      });

      // feedback 상태 값이 업데이트된 후에 실행되도록 await 키워드 사용
      console.log(feedback);
      createModal();
      toggleThankYouModal();
    } catch (error) {
      console.error("피드백 전송 중 오류 발생:", error);
    }
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-4xl lg:text-2xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-4 lg:mb-0 lg:pr-4 lg:w-1/2">
            G-Start Up
          </h3>

          <Button
            onClick={createModal}
            type="primary"
            icon={<SmileOutlined />}
            className="text-lg font-bold px-6 py-3 border border-transparent rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            피드백 보내기
          </Button>
          {/* 모달 */}
          <Modal
            title="피드백 보내기"
            open={isModalVisible}
            onCancel={createModal}
            footer={[
              <Button key="cancel" onClick={createModal}>
                취소
              </Button>,
              <Button key="send" type="primary" onClick={handleSendFeedback}>
                보내기
              </Button>,
            ]}
          >
            <Input.TextArea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="피드백을 입력하세요."
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Modal>
          <Modal
            title="고맙습니다!"
            open={thankYouModalVisible}
            onCancel={toggleThankYouModal}
            footer={[
              <Button key="ok" type="primary" onClick={toggleThankYouModal}>
                확인
              </Button>,
            ]}
          >
            <p>고맙습니다! 귀하의 소중한 피드백을 주셔서 감사합니다.</p>
          </Modal>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
