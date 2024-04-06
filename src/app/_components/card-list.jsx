'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import Link from 'next/link';

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.g-start-up.com/api/card-news/`, {
          params : {
            pageSize : 16,
            pageNumber : currentPage
          }
        });
        setNewsData(response.data.data);
        setTotalPages(response.data.page_count);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {newsData.map((news, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link href={`/card-news/${news.idcardnews}`} passHref>
              <Card
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.03)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.0)')
                }
              >
                <CardMedia
                  component='img'
                  height='140'
                  image={`https://www.k-startup.go.kr${news.content[0]}`}
                  alt='News Image'
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant='subtitle1' component='h2'>
                    {news.title}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: '8px',
                  }}
                >
                  <Typography variant='body2' color='textSecondary'>
                    {new Date(news.release_date).toLocaleDateString()}
                  </Typography>
                  <div>
                    <Typography variant='body2' color='textSecondary'>
                      조회수 {news.hit_count}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='body2' color='textSecondary'>
                      ❤️ {news.like_count}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        {[...Array(totalPages)].map((_, index) => (
          <Button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
