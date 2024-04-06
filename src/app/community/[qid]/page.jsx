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

const comment_data = [
  {
    avatar: 'https://api.adorable.io/avatars/96/apple@adorable.png',
    title: 'Apple Seed',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, inventore laboriosam!',
  },
  {
    avatar: 'https://api.adorable.io/avatars/96/banana@adorable.png',
    title: 'Banana Long',
    description:
      'Iusto ex ad placeat dolor tempora dolores provident hic, modi voluptatem deserunt possimus, architecto dignissimos quod fugiat enim iste, corporis neque numquam.',
  },
  {
    avatar: 'https://api.adorable.io/avatars/96/clementine@adorable.png',
    title: 'Clementine Sour',
    description:
      'Ullam unde accusamus laboriosam enim, quam, sit ipsum amet ex repudiandae velit ipsa voluptatibus quasi impedit cupiditate, obcaecati delectus exercitationem iure quas.',
  },
  {
    avatar: 'https://api.adorable.io/avatars/96/dates@adorable.png',
    title: 'Dates Dune',
    description:
      'Modi porro officia nesciunt cumque, debitis eum accusamus expedita, adipisci autem quos consectetur repudiandae inventore voluptas voluptate minus! Natus ducimus quisquam ipsa.',
  },
];
export const Content = ({ params }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState(null);
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
            // 헤더에 Authorization 추가
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
          content: 'Hello, this is my answer.', // 여기에 content 값을 추가
        },
        {
          headers: {
            // 헤더 설정
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
        <article className='mb-32'>
          <Card title={`제목 : ${data.title}`} style={{ width: '100%' }}>
            <Typography>
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
                  title={item.author}
                  description={item.content}
                />
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
