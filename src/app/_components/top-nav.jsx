"use client";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import GoogleTranslate from "./translate";
import Chatbot from "./chatbot";

export function TopNav() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.isExpired) {
      signOut({ redirect: false }).then(() => {
        //
      });
    }
  }, [session]);

  const [showChatbot, setShowChatbot] = useState(false); // State to manage chatbot visibility

  const handleLogout = async () => {
    await signOut();
  };

  if (status === "loading") return null;
  console.log("상태확인해보기", status);
  return (
    <nav className="top-nav bg-gray-100 py-2 px-4 flex justify-between items-center relative text-sm">
      <GoogleTranslate />
      <div></div>
      <div className="flex items-center space-x-1 relative">
        {status === "authenticated" ? (
          <>
            <Link href="/mypage" passHref>
              <Button
                type="primary"
                icon={<SettingOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
              >
                마이페이지
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={handleLogout}
              icon={<LogoutOutlined />}
              className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
              >
                로그인
              </Button>
            </Link>
            <Link href="/join" passHref>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
              >
                회원가입
              </Button>
            </Link>
          </>
        )}
        <Button
          type="primary"
          onClick={() => setShowChatbot(true)} // Toggle chatbot visibility
          icon={<MessageOutlined />}
          className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
        >
          챗봇
        </Button>
      </div>
      <Modal
        open={showChatbot}
        onCancel={() => setShowChatbot(false)}
        aria-labelledby="chatbot-modal-title"
        aria-describedby="chatbot-modal-description"
        footer={null}
        width={850}
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: "30px" }} />
        <div
          className="chatbot-modal-content "
          style={{
            width: "800px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Chatbot />
        </div>
      </Modal>
    </nav>
  );
}
