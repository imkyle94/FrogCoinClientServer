import { NewsContainer2, Icon } from "./newsElements";
import React, { useState, useContext } from "react";
import { NewsContext } from "../News/NewsContext";
import NewsArticle from "./NewsArticle";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewS2(props) {
  const coinsDisplay = useContext(NewsContext);
  const handleAddOnclick = () => {
    console.log("뉴스 자세히");
  };

  return (
    <div>
      <NewsContainer2>
        <Link to="news">
          <Button onClick={handleAddOnclick}>뉴스 자세히 보기</Button>
        </Link>

        <div className="all__news">
          {coinsDisplay
            ? coinsDisplay.coinsDisplay.map((news) => (
                <NewsArticle data={news} key={news.url} />
              ))
            : "Loading"}
        </div>
      </NewsContainer2>
    </div>
  );
}

export default NewS2;
