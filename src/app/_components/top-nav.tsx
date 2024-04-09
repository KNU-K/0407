"use client";
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  MessageOutlined,
} from "@ant-design/icons";

export function TopNav() {
  const { data: session, status } = useSession();
  const [showChatbot, setShowChatbot] = useState(false); // State to manage chatbot visibility

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gray-100 py-4 px-8 flex justify-between items-center relative">
      <div></div> {/* This div will push the buttons to the right */}
      <div className="flex items-center space-x-2 relative">
        {status === "loading" && (
          <>
            <Link href="/login" passHref>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
              >
                로그인
              </Button>
            </Link>
            <Link href="/join" passHref>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
              >
                회원가입
              </Button>
            </Link>
          </>
        )}
        {status === "authenticated" ? (
          <Button
            type="primary"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            로그아웃
          </Button>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
              >
                로그인
              </Button>
            </Link>
            <Link href="/join" passHref>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
              >
                회원가입
              </Button>
            </Link>
          </>
        )}
        <Button
          type="primary"
          onClick={() => setShowChatbot(!showChatbot)} // Toggle chatbot visibility
          icon={<MessageOutlined />}
          className="bg-blue-500 hover:bg-blue-600"
        >
          챗봇
        </Button>
        {showChatbot && (
          <div className="absolute z-50 top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-md p-4">
            <div className="overflow-y-auto max-h-60">
              {/* Chat messages go here */}
              <div className="text-left">
                <div className="flex justify-start mb-2">
                  <div className="p-3 bg-gray-200 text-gray-700 rounded-lg max-w-sm relative">
                    안녕하세요! 어떻게 도와드릴까요?
                    <div className="absolute w-0 h-0 top-0 left-0 border-6 border-gray-200 border-solid border-t-transparent border-l-transparent"></div>
                  </div>
                </div>
                <div className="flex justify-end mb-2">
                  <div className="p-3 bg-blue-500 text-white rounded-lg max-w-sm relative">
                    예약하고 싶은데 가능할까요?
                    <div className="absolute w-0 h-0 top-0 right-0 border-6 border-blue-500 border-solid border-t-transparent border-r-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="개발중"
              className="w-full mt-4 border rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
