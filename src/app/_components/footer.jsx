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
  const [newsletterModalVisible, setNewsletterModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);

  const toggleFeedbackModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleThankYouModal = () => {
    setThankYouModalVisible(!thankYouModalVisible);
  };

  const handleSendFeedback = async () => {
    try {
      await axios.post("https://api.g-start-up.com/service1/api/feedback/", {
        content: feedback,
      });

      console.log(feedback);
      toggleFeedbackModal();
      toggleThankYouModal();
    } catch (error) {
      console.error("피드백 전송 중 오류 발생:", error);
    }
  };

  const toggleNewsletterModal = () => {
    setNewsletterModalVisible(!newsletterModalVisible);
  };

  const handleSubscribeNewsletter = async () => {
    try {
      // 여기에 뉴스레터 구독 API 호출 코드를 추가할 수 있습니다.
      // 예를 들어, await axios.post("https://api.g-start-up.com/service1/api/newsletter/subscribe");

      toggleNewsletterModal();
      toggleThankYouModal();
    } catch (error) {
      console.error("뉴스레터 구독 중 오류 발생:", error);
    }
  };

  return (
    <footer className="footer bg-gray-100 border-t border-gray-200 py-6">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-4xl lg:text-2xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-4 lg:mb-0 lg:pr-4 lg:w-1/2">
            G-Start Up
          </h3>

          <Button
            onClick={toggleNewsletterModal}
            type="primary"
            icon={<SmileOutlined />}
            className="text-lg font-bold px-6 py-3 border border-transparent rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            뉴스레터 구독하기
          </Button>

          {/* 피드백 모달 */}
          <Modal
            title="피드백 보내기"
            open={isModalVisible}
            onCancel={toggleFeedbackModal}
            footer={[
              <Button key="cancel" onClick={toggleFeedbackModal}>
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

          {/* 뉴스레터 구독 모달 */}
          <Modal
            title="뉴스레터를 구독하시겠습니까?"
            open={newsletterModalVisible}
            onCancel={toggleNewsletterModal}
            footer={[
              <Button
                key="yes"
                type="primary"
                onClick={handleSubscribeNewsletter}
              >
                예
              </Button>,
              <Button key="no" onClick={toggleNewsletterModal}>
                아니오
              </Button>,
            ]}
          >
            <p>뉴스레터를 구독하시겠습니까?</p>
          </Modal>

          {/* 감사 모달 */}
          <Modal
            // title="고맙습니다!"
            open={thankYouModalVisible}
            onCancel={toggleThankYouModal}
            footer={[
              <Button key="ok" type="primary" onClick={toggleThankYouModal}>
                확인
              </Button>,
            ]}
          >
            <p>뉴스레터가 구독되었습니다.</p>
          </Modal>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
