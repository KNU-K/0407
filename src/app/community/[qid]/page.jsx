'use client';
import { Divider, Typography } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Alert from '@/app/_components/alert';
import Container from '@/app/_components/container';
import { Intro } from '../../_components/intro';

import Header from '@/app/_components/header';
import { PostBody } from '@/app/_components/post-body';
import { PostHeader } from '@/app/_components/post-header';
const { Title, Paragraph, Text, Link } = Typography;
import { Card, List, Avatar, Input, Button, Switch } from 'antd';

const Content = ({ params }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState('');
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.g-start-up.com/api/question/${params.qid}`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setIsContentLoading(false);
      setIsCommentLoading(false);
    } catch {}
  };

  const addComment = async () => {
    setIsCommentLoading(true);
    try {
      const response = await axios.post(
        `https://api.g-start-up.com/api/question/${params.qid}/answer`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.id}`,
          },
        }
      );

      alert('댓글이 작성되었습니다.');
      fetchData();
    } catch {}
  };

  if (!data || isContentLoading) {
    return <Alert type='info' message='Loading...' />;
  }

  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
            <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>경험공유</h1>
          </Space>
        <article className='mb-32'>
          <Card
            title={<Title level={3}>제목 : {data.title}</Title>}
            extra={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text>작성자 : {data.author}</Text>
                <Divider type='vertical' style={{ margin: '0 5px' }} />
                <Text>작성일자 : {new Date(data.created_date).toLocaleString()}</Text>
                <Divider type='vertical' style={{ margin: '0 5px' }} />
                <Text>조회수 : {data.hit_count}</Text>
              </div>
            }
            style={{ width: '100%' }}
          >
          <Typography style={{ Height: '1000px', overflowY: 'auto' }}> 
            <Paragraph>{data.content}</Paragraph>
          </Typography>
          </Card>
        </article>
        <div className='CommentList'>
          <h1>댓글</h1>
          <List
            itemLayout='horizontal'
            dataSource={data.child}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`작성자: ${item.uid}`}
                  description={`작성일: ${new Date(item.created_date).toLocaleString()}`}
                />
                <div>{item.content}</div>
              </List.Item>
            )}
            style={{
              width: '100%',
            }}
          />
          <form className='CommentList__form' autoComplete='off'>
            <div className='CommentList__input'>
              <label htmlFor='name'>댓글 작성</label>
              <Input
                value={comment}
                style={{ margin: 10 }}
                placeholder='댓글을 작성해주세요'
                id='name'
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className='CommentList__add'>
              <Button
                onClick={addComment}
                style={{ margin: 10 }}
                disabled={!comment}
                loading={isCommentLoading}
              >
                댓글 작성
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
};
export default Content;
