"use client";
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
  const handleLogout = async () => {
    await signOut();
  };
  if (status === "loading") {
    return (
      <nav className="bg-gray-100 py-4 px-8 flex justify-between items-center">
        <div></div> {/* This div will push the buttons to the right */}
        <div>
          <Link href="/login" passHref>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              className="bg-blue-500 hover:bg-blue-600 mr-2"
            >
              로그인
            </Button>
          </Link>
          <Link href="/join" passHref>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              className="bg-blue-500 hover:bg-blue-600 mr-2"
            >
              회원가입
            </Button>
          </Link>
          <Button
            type="primary"
            icon={<MessageOutlined />}
            className="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
          >
            챗봇
          </Button>
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-gray-100 py-4 px-8 flex justify-between items-center">
      <div></div> {/* This div will push the buttons to the right */}
      <div>
        {status === "unauthenticated" ? (
          <>
            <Link href="/login" passHref>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                className="bg-blue-500 hover:bg-blue-600 mr-2"
              >
                로그인
              </Button>
            </Link>
            <Link href="/join" passHref>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600 mr-2"
              >
                회원가입
              </Button>
            </Link>
          </>
        ) : (
          <Button
            type="primary"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            className="bg-blue-500 hover:bg-blue-600 mr-2"
          >
            로그아웃
          </Button>
        )}
        <Button
          type="primary"
          icon={<MessageOutlined />}
          className="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
        >
          챗봇
        </Button>
      </div>
    </nav>
  );
}
