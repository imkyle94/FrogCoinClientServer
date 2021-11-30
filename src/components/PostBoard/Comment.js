import React, { useEffect } from "react";
import { useState } from "react";
import TimeCounting from "time-counting";
import axios from "axios";

function Comment({ commentId }) {
  const [areaComment, setAreaComment] = useState({
    nickname: "",
    comment: "",
  });

  const [viewComment, setViewComment] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const getComment = (e) => {
    const { name, value } = e.target;
    setAreaComment({
      ...areaComment,
      [name]: value,
    });
    console.log(areaComment);
  };

  useEffect(() => {}, [viewComment]);

  useEffect(() => {
    if (pageLoading === false) return;
    setPageLoading(false);
    loadComment();
  }, [pageLoading]);

  const writeComment = (id, nickname, content) => {
    axios
      .post("http://localhost:8011/write-comment", {
        id: id,
        contents: content,
        nickname: nickname,
      })
      .then((response) => {
        loadComment();
      });
  };

  const loadComment = () => {
    axios
      .get("http://localhost:8011/list-comment?id=" + commentId)
      .then((response) => {
        const { data } = response.data;
        let lists = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
          lists = lists.concat({
            ...areaComment,
            nickname: data[i].nickname,
            comment: data[i].contents,
          });
        }
        // console.log(lists);
        setViewComment(lists);
        // setViewComment(viewComment.concat({ ...areaComment }));
      });
  };

  return (
    <div>
      <div className>
        {viewComment.map((element) => (
          <div
            Style="
            border-style: none none solid none;
            border-width: 1px;
            margin-left : 10px;
            padding: 10px;
            margin-right : 10px;
            border-color: gray;
            background-color: #01bf7010
            "
          >
            <div
              style={{
                color: "green",
                fontWeight: "bold",
                float: "left",
                marginRight: 15,
              }}
            >
              {element.nickname}
            </div>
            {element.comment}
            <div
              style={{
                float: "right",
                marginRight: 15,
                color: "gray",
              }}
            >
              {TimeCounting(new Date(), {
                objectTime: "",
                lang: "ko",
                calculate: { justNow: 6 },
              })}
            </div>
          </div>
        ))}
        <div style={{ marginBottom: 14, overflow: "hidden" }}>
          <div className="CommentNickname" style={{ float: "left" }}>
            <input
              className="Commennickname-input"
              type="text"
              placeholder="닉네임"
              onChange={getComment}
              name="nickname"
              style={{ width: 150, height: 40, marginTop: 14 }}
            />
          </div>
          <div className="Comment" style={{ overflow: "hidden" }}>
            <input
              className="Comment-input"
              type="text"
              placeholder="내용..."
              onChange={getComment}
              name="comment"
              style={{
                width: 570,
                height: 40,
                marginTop: 14,
                marginLeft: 10,
                float: "left",
              }}
            />
          </div>
          <button
            onClick={() => {
              //setViewComment(viewComment.concat({ ...areaComment }));
              writeComment(
                commentId,
                areaComment.nickname,
                areaComment.comment
              );
            }}
            style={{
              width: 80,
              height: 45,
              marginTop: 15,
              marginLeft: 10,
              background: "#01bf71",
              border: "none",
              color: "#ffff",
            }}
          >
            ribbit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
