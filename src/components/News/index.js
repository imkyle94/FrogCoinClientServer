import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

// preventDefault 무조건
const News = () => {
  const [키워드, 키워드변경] = useState();

  const [coins, setCoins] = useState([]);
  const [coinsDisplay, setCoinsDisplay] = useState([]);

  const keywordHandler = (e) => {
    e.preventDefault();
    키워드변경(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // state에 저장한 값을 가져옵니다.

      let body = {
        keyword: 키워드,
      };
      const news = await axios.post("http://13.125.255.188:5000/news", body);

      setCoins();
      setCoins(news.data);
      setCoinsDisplay(news.data.slice(0, 20));
    } catch {
      console.log("안댄다 기사 씨발");
    }
  };
  let listNum = 0;

  // console.log(listNum);
  const A = async (e) => {
    try {
      e.preventDefault();
      listNum = 3;
    } catch {
      console.log("안댐");
    }
  };

  const { data, loading, error } = useAxios({
    method: "GET",
    baseURL: "http://13.125.255.188:5000",
    url: "news",
  });

  useEffect(() => {
    if (!loading && data) {
      setCoins(data);
      setCoinsDisplay(data.slice(0, 20));
    }
  }, [data, loading]);

  useEffect(() => {
    const a = [...coins];
    setCoinsDisplay(a.slice(listNum * 10, (listNum + 1) * 10));
  }, [listNum]);

  if (error) {
    return <h1 className="text-danger">{error.message}</h1>;
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "Column" }}
      >
        <Col md={4} className="my-3 input-box">
          <InputGroup>
            <input
              type="text"
              value={키워드}
              onChange={keywordHandler}
              name="keyword"
              placeholder="뉴스 제목 입력"
              required
            />{" "}
            <Button type="submit" variant="primary">
              검색
            </Button>
          </InputGroup>
        </Col>
      </form>
      <table className="table coinlist-table table-striped table-hover text-center">
        <thead className="text-light bg-success ">
          <tr>
            <th>
              <span>No</span>
            </th>
            <th>
              <span>제목</span>
            </th>
            <th>
              <span>내용</span>
            </th>
            <th>
              <span>신문사</span>
            </th>
            <th>
              <span>날짜</span>
            </th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {loading && (
            <tr>
              <td colSpan={5}>
                <h1 className="text-center">Loading...</h1>
              </td>
            </tr>
          )}
          {coinsDisplay.map((coin, index) => (
            <tr>
              <th>
                <span>{index + 1}</span>
              </th>
              <th>
                <a href={coin.url} target="_blank">
                  <span>{coin.name}</span>
                </a>
              </th>
              <th>
                <span>{coin.description}</span>
              </th>
              <th>
                <span>{coin.provider[0].name}</span>
              </th>
              <th>
                <span>{coin.datePublished.substr(0, 10)}</span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default News;
