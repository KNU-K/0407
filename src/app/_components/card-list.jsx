"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.g-start-up.com/service1/api/card-news/`,
          {
            params: {
              pageSize: 16,
              pageNumber: currentPage,
            },
          }
        );
        setNewsData(response.data.data);
        setTotalPages(response.data.page_count);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, pageNumber) => {
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.0)")
                }
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://www.k-startup.go.kr${news.content[0]}`}
                  alt="News Image"
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" component="h2">
                    {news.title}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "8px",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {new Date(news.release_date).toLocaleDateString()}
                  </Typography>
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      조회수 {news.hit_count}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="textSecondary">
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
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={1} // 현재 페이지 기준으로 양옆에 보여줄 페이지 수
          boundaryCount={1} // 처음과 끝에 보여줄 페이지 수
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
};

export default NewsComponent;
