"use client";
import { Space, Typography, Card, Input, Button, Alert, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TopNav } from "@/app/_components/top-nav";
import Container from "@/app/_components/container";
import { Intro } from "../../_components/intro";
import Footer from "@/app/_components/footer";

const { Title, Text, Paragraph } = Typography;

const Content = ({ params }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("로그인 후 이용해주세요.");
      window.history.back();
    }
    fetchData();
  }, [session, status]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.g-start-up.com/api/question/${params.qid}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );
      setData(response.data);
      setEditTitle(response.data.title);
      setEditContent(response.data.content);
      setIsContentLoading(false);
      setIsCommentLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addComment = async () => {
    setIsCommentLoading(true);
    try {
      await axios.post(
        `https://api.g-start-up.com/api/question/${params.qid}/answer`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );
      alert("댓글이 작성되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const updateContent = async () => {
    setIsContentLoading(true);
    try {
      await axios.put(
        `https://api.g-start-up.com/api/question?qid=${params.qid}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );
      alert("글이 수정되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setIsEditing(false);
      setIsContentLoading(false);
    }
  };

  const deleteContent = async () => {
    try {
      await axios.delete(
        `https://api.g-start-up.com/api/question?qid=${params.qid}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );
      alert("글이 삭제되었습니다.");
      window.history.back();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  if (!data || isContentLoading) {
    return <Alert type="info" message="로딩 중..." />;
  }

  return (
    <main>
      <TopNav />
      <Container>
        <Intro />
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <article>
            <Card
              title={<Title level={3}>{data.title}</Title>}
              extra={
                <Space>
                  {isEditing ? (
                    <>
                      <Button onClick={updateContent} type="primary">
                        저장
                      </Button>
                      <Button onClick={() => setIsEditing(false)}>취소</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setIsEditing(true)}>수정</Button>
                      <Button onClick={deleteContent} danger type="primary">
                        삭제
                      </Button>
                    </>
                  )}
                </Space>
              }
            >
              {isEditing ? (
                <>
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ marginBottom: 8 }}
                  />
                  <Input.TextArea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                  />
                </>
              ) : (
                <Typography>
                  <Paragraph>{data.content}</Paragraph>
                </Typography>
              )}
            </Card>
          </article>
          <div className="CommentList">
            <Title level={4}>댓글</Title>
            <div className="divide-y divide-gray-200">
              {data &&
                data.child &&
                data.child.map((item) => (
                  <div key={item.id} className="py-4 flex items-start">
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        width: "100%",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <Text>작성자: </Text>
                        <Text className="text-sm">{item.author}</Text>
                        <Text className="text-sm">
                          {" "}
                          [{new Date(item.created_date).toLocaleString()}]
                        </Text>
                      </div>
                      <hr style={{ marginBottom: "10px" }} />
                      <Paragraph className="text-sm">{item.content}</Paragraph>
                    </div>
                  </div>
                ))}
            </div>
            <form className="CommentList__form" autoComplete="off">
              <div className="CommentList__input">
                <label htmlFor="comment">댓글 작성</label>
                <Input
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해주세요"
                />
              </div>
              <div className="py-5 CommentList__add">
                <Button
                  type="primary"
                  onClick={addComment}
                  disabled={!comment}
                  loading={isCommentLoading}
                >
                  댓글 작성
                </Button>
              </div>
            </form>
          </div>
        </Space>
      </Container>
      <Footer />
    </main>
  );
};

export default Content;
