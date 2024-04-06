import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



const cardData = [
  {
    id: 1,
    title: '첫 번째 장소',
    content: '첫 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 2,
    title: '두 번째 장소',
    content: '두 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 3,
    title: '세 번째 장소',
    content: '세 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 4,
    title: '네 번째 장소',
    content: '네 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 5,
    title: '다섯 번째 장소',
    content: '다섯 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 6,
    title: '여섯 번째 장소',
    content: '여섯 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 7,
    title: '일곱 번째 장소',
    content: '일곱 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 8,
    title: '여덟 번째 장소',
    content: '여덟 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
  {
    id: 9,
    title: '아홉 번째 장소',
    content: '아홉 번째 장소의 내용입니다.',
    image: '/images/space-example.jpg' // 상대 경로로 이미지 지정
  },
];

export default function ActionAreaCard() {
  return (
    <Grid container spacing={2}>
      {cardData.map(card => (
        <Grid item key={card.id} xs={12} sm={6} md={4} lg={2} xl={2}>
          <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
            <CardActionArea>
              <img
                src={card.image}
                alt={card.title}
                style={{ height: 200 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
