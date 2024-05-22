"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.g-start-up.com/service1/api/card-news"
        );
        console.log("Fetched Data:", response.data.data); // 데이터 형태 확인을 위해 콘솔 로그 추가
        setNewsData(response.data.data.slice(0, 8)); // 최신 데이터 8개만 사용
      } catch (error) {
        console.error("Error fetching the news data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <Title className="news-title">※ 최신 창업 정보 ※</Title>
      <div className="news-grid">
        {newsData.map((news) => (
          <Link
            href={`/card-news/${news.idcardnews}`}
            key={news.idcardnews}
            passHref
          >
            <div className="news-card">
              <div className="news-card-images">
                {news.content[0] && (
                  <img
                    src={`https://www.k-startup.go.kr${news.content[0]}`}
                    alt={`news content`}
                    className="news-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/placeholder.jpg";
                    }} // 오류 처리: 이미지가 로드되지 않을 경우 대체 이미지 사용
                  />
                )}
              </div>
              <p className="news-card-title">{news.title}</p>
              <p className="news-card-date">
                {new Date(news.release_date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
