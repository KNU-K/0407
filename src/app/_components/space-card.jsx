"use client";
import { LeftOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import axios from "axios";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import sanitize from "sanitize-html";

const regionList = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

export default function Home() {
  const [region, setRegion] = useState(null);
  const [lat, setLat] = useState(37.5665);
  const [lng, setLng] = useState(126.978);
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(null);
  useEffect(() => {
    const getData = async (region) => {
      const { data } = await axios.get(
        `https://apis.data.go.kr/B552735/kisedSlpService/getCenterList?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&cond[regin_clss::LIKE]=${region}&page=1&perPage=1000&returnType=json`
      );
      setList(data.data);
      setLat(data.data[0].latde);
      setLng(data.data[0].lgtde);
    };
    if (region) getData(region);
  }, [region]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      {modal ? (
        <Modal
          open
          onOk={() => setModal(null)}
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
          mask={false}
          centered
        >
          <h1>{modal.cntr_nm}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(modal.cntr_intrd_type_nm),
            }}
          />
        </Modal>
      ) : null}
      <div
        style={{
          width: "350px",
        }}
      >
        {region === null ? (
          <div
            style={{
              width: "350px",
              height: "100vh",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(auto-fill, 1fr)",
            }}
          >
            {regionList.map((region) => (
              <button
                key={region}
                onClick={() => setRegion(region)}
                style={{
                  padding: "4px",
                  border: "1px solid #e0e0e0",
                  marginRight: "-1px",
                  marginTop: "-1px",
                }}
                className="region"
              >
                {region}
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "12px",
                gap: "6px",
              }}
            >
              <button onClick={() => setRegion(null)}>
                <LeftOutlined />
              </button>
              <p>{region}</p>
            </div>
            <div
              style={{
                height: "calc(100vh - 44.5px)",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <div>
                {list.map((item, index) => (
                  <button
                    key={index}
                    style={{
                      padding: "10px",
                      width: "100%",
                      textAlign: "left",
                      border: "1px solid #e0e0e0",
                      marginBottom: "-1px",
                    }}
                    className="card"
                    onClick={() => {
                      setLat(item.latde);
                      setLng(item.lgtde);
                    }}
                  >
                    <p>{index + 1 + ". " + item.cntr_nm}</p>
                    <p>{item.cntr_type_name}</p>
                    <p>{item.addr}</p>
                    <p>{item.hmpg}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={{
            lat: lat,
            lng: lng,
          }}
          style={{ width: "1100px", height: "100%" }}
          level={4}
        >
          {list.map((item, index) => (
            <MapMarker
              key={index}
              position={{
                lat: item.latde,
                lng: item.lgtde,
              }}
              title={item.cntr_nm}
              onClick={() => {
                setLat(item.latde);
                setLng(item.lgtde);
                setModal(item);
              }}
            />
          ))}
        </Map>
      </>
    </div>
  );
}
