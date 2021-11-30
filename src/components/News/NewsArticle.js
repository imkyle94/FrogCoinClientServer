import React from "react";

function NewsArticle({ data }) {
  return (
    <div className="news">
      <h1 className="news__title">{data.name}</h1>
      <p className="news__desc">{data.description}</p>
      <span className="news__author">{data.provider[0].name}</span> <br />
      <span className="news__published">
        {data.datePublished.substr(0, 10)}
      </span>
    </div>
  );
}

export default NewsArticle;
