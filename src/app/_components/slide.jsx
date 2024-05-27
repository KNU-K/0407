"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Carousel } from "antd";
import Link from "next/link";
import "./slide.css";

const SlideShow = () => {
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.g-start-up.com/service1/api/card-news"
        );
        console.log("Fetched Data:", response.data.data); // 데이터 형태 확인을 위해 콘솔 로그 추가
        const imageUrls = response.data.data.slice(0, 8).map((news) => ({
          url: `https://www.k-startup.go.kr${news.content[0]}`,
          id: news.idcardnews, // 각 이미지에 id 추가
        }));
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching the images:", error);
      }
    };

    fetchImages();
  }, []);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="slide-container">
      <Carousel autoplay ref={carouselRef}>
        {images.map((image, index) => (
          <Link href={`/card-news/${image.id}`} key={index} passHref>
            <div className="slide">
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="slide-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/path/to/placeholder.jpg";
                }} // 오류 처리: 이미지가 로드되지 않을 경우 대체 이미지 사용
              />
            </div>
          </Link>
        ))}
      </Carousel>
      <button className="prev" onClick={prev}>
        &#10094;
      </button>
      <button className="next" onClick={next}>
        &#10095;
      </button>
    </div>
  );
};

export default SlideShow;
