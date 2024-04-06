'use client';
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WritePostPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const writePost = async () => {
    console.log(title, content, session.user.id);
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.g-start-up.com/api/question/${params.qid}`,
        {
          headers: {
            // 헤더에 Authorization 추가
            authorization: `Bearer ${session.user.id}`,
          },
        }
      );
      console.log(response.data);
      alert('글이 성공적으로 작성되었습니다.');
    } catch (error) {
      alert('글쓰기에 실패했습니다.');
    } finally {
      setLoading(false);
      router.push('/community');
    }
  };
  return (
    <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant='h5' gutterBottom>
            글쓰기
          </Typography>
          <TextField
            label='제목'
            fullWidth
            margin='normal'
            variant='outlined'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='내용'
            fullWidth
            margin='normal'
            variant='outlined'
            multiline
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* 글쓰기 버튼 */}
          <Button
            type='submit'
            onClick={() => {
              writePost();
            }}
            color='primary'
          >
            글쓰기
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
