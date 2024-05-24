"use client";
import { useState, useEffect } from "react";
import { Button } from "antd";
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
          onClick={() => setShowChatbot(!showChatbot)} // Toggle chatbot visibility
          icon={<MessageOutlined />}
          className="bg-blue-500 hover:bg-blue-600 text-xs py-1 px-2 custom-button"
        >
          챗봇
        </Button>

        {showChatbot && (
          <div className="absolute z-50 top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-md p-3">
            <div className="overflow-y-auto max-h-48">
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
              className="w-full mt-2 border rounded-lg p-1 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
