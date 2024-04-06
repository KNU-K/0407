'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { usePathname } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getSession } from 'next-auth/react';
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const LargeIconButton = styled(IconButton)(({ theme }) => ({
  width: '60px', 
  height: '60px', // 좋아요 버튼의 크기조정
}));

const CardContent = () => {
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf('/');
  const cardId = pathname.substring(lastSlashIndex + 1);

  const [cardData, setCardData] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 상태 변수


  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = `Bearer ${(await getSession()).user.id}`
        const response = await axios.get(`https://api.g-start-up.com/api/card-news/${cardId}`, {
          headers: {
            Authorization: token
          }
        });
        setCardData(response.data);
        // setLikeCount(response.data.like_count);
        // user_likes 값이 "1"이면 liked를 true로 설정하여 꽉 찬 하트로
        // 아니면 false로 설정하여 빈 하트로 표시
        setLiked(response.data.user_likes === "1");
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
  
    if (cardId) {
      fetchCardData();
    }
  }, [cardId]);


  // 좋아요 클릭 시 처리하는 함수
  const handleLikeClick = async () => {
    try {
      
        const token = `Bearer ${(await getSession()).user.id}`
      if (!liked) {
        // 좋아요 추가
        await axios.post(`https://api.g-start-up.com/api/card-news/${cardId}/like`, null, {
          headers: {
            Authorization: token
          }
        });
      } else {
        // 좋아요 취소
        await axios.delete(`https://api.g-start-up.com/api/card-news/${cardId}/like`, {
          headers: {
            Authorization: token
          }
        });
      }
      // 좋아요 상태 업데이트
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Slider 설정 객체
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosIcon sx={{ color: 'black', marginRight: '80px', cursor: 'pointer', '&:hover': { color: 'gray' } }} />,
    nextArrow: <ArrowForwardIosIcon sx={{ color: 'black', marginLeft: '80px', cursor: 'pointer', '&:hover': { color: 'gray' } }} />
  };

  return (
    <div>
      {cardData && (
        <div>
          <Typography variant="h4">{cardData.title}</Typography>
          <Divider sx={{ marginY: 2 }} />
          <Slider {...settings} className="slick-slider"  style={{ width: '80%', margin: '0 auto' }}>
            {cardData.content.images.map((image, index) => (
              <div key={index} className="slick-slide" style={{ textAlign: 'center' }}>
                <img src={`https://www.k-startup.go.kr${image}`} alt={`Image ${index + 1}`} style={{ maxWidth: '800px', maxHeight: '800px', margin: '0 auto' }} />
              </div>
            ))}
          </Slider>
          <StyledPaper>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: cardData.content.notice }} />
            {/* 좋아요 표시 */}
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
            <IconButton onClick={handleLikeClick}>
              {liked ? <FavoriteIcon color="error" style={{ fontSize: "5rem" }} /> 
              : <FavoriteBorderIcon style={{ fontSize: "5rem" }} />}
            </IconButton>
            </div>
            <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
              좋아요</Typography>
          </StyledPaper>
        </div>
      )}
    </div>
  );
};

export default CardContent;