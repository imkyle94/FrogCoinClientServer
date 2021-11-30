import React, { Component, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./PostBoard.css";
import ReactHtmlParser from "react-html-parser";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeCounting from "time-counting";
import Comment from "./Comment";
import Storage from "./Storage";
import axios from "axios";
import ImgurUploaderInit from "ckeditor5-imgur-uploader";
import { Link } from "react-router-dom";

function App({ page }) {
  //초기값
  const [areaContent, setAreaContent] = useState({
    nickname: "",
    content: "",
    contentId: "",
    comment: { Comment },
  });
  const ImgurUploader = ImgurUploaderInit({ clientID: "c9e46ed50365447" });

  const [viewContent, setViewContent] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const storage = new Storage();
  const [pages, setPages] = useState(1);
  const [loadingEnd, setLoadingEnd] = useState(true);

  //입력값
  const getValue = (e) => {
    const { name, value } = e.target;
    setAreaContent({
      ...areaContent,
      [name]: value,
    });
    console.log(areaContent);
  };

  //무한스크롤 설정값
  class App extends React.Component {
    state = {
      items: Array.from({ length: 15 }),
    };
    fetchMoreData = () => {
      // 1.5초 딜레이 후 5개의 내용 로드
      setTimeout(() => {
        this.setState({
          items: this.state.items.concat(Array.from({ length: 5 })),
        });
      }, 1500);
    };

    randomkey = () => {
      const key = new Date();
      return key.toString() + Math.random() * 100000;
    };

    //무한스크롤 렌더
    render() {
      return (
        <div>
          <hr />
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {this.state.items.map((viewContent, randomkey) => (
              <div key={randomkey}>{viewContent}</div>
            ))}
          </InfiniteScroll>
        </div>
      );
    }
  }
  // 무한스크롤 렌더 종료

  // useEffect viewContent Check

  // 컴포넌트가 업데이트 되는 경우 (댓글을 작성했을 때)
  useEffect(() => {
    if (pageLoad === true) return;
    storage.setItem("comment", viewContent);
  }, [viewContent]);

  // 페이지를 처음 로드 하는 경우, 페이지 로딩 관련 절차를 정지시키고,
  // 코멘트를 로컬스토리지에서 불러오는 작업 (단, JSON으로 한번 감싸야 함)
  // [Object object] 로 저장 됨.
  useEffect(() => {
    setPageLoad(false);
    if (storage.getItem("comment") === null) {
      storage.setItem("comment", []);
    }
    //setViewContent(storage.getItem("comment"));

    // Axios 데이터 받아오기
    axios.get("http://localhost:8011/list").then((response) => {
      const { data } = response.data;
      const count = data.length;
      let arr = [];
      for (let i = 0; i < count; i++) {
        arr = arr.concat({
          ...areaContent,
          nickname: data[i].team_name,
          content: data[i].contents,
          id: data[i].post_num,
        });
      }

      console.log(arr);
      setViewContent(arr);
    });
  }, [pageLoad]);

  const randomkey = () => {
    const key = new Date();
    return Buffer.from(encodeURIComponent(Math.random() * 100000)).toString(
      "base64"
    );
  };

  const writePost = (contents) => {
    console.log(contents);
    axios
      .post("http://localhost:8011/write", {
        name: contents.nickname,
        contents: contents.content,
      })
      .then((response) => {
        setPages(1);
        setViewContent([]);
        setLoadingEnd(true);
        axios
          .get("http://localhost:8011/list?pages=" + pages)
          .then((response) => {
            const { data } = response.data;
            const count = data.length;
            let arr = [];
            for (let i = 0; i < count; i++) {
              arr = arr.concat({
                ...areaContent,
                nickname: data[i].team_name,
                content: data[i].contents,
                id: data[i].post_num,
              });
            }

            console.log(arr);
            setViewContent(arr);
          });
      });
  };

  const nextPost = () => {
    let currentPage = pages + 1;
    setPages(currentPage);
    axios
      .get("http://localhost:8011/list?pages=" + currentPage)
      .then((response) => {
        const { data } = response.data;
        const count = data.length;

        let arr = viewContent;
        for (let i = 0; i < count; i++) {
          arr = arr.concat({
            ...areaContent,
            nickname: data[i].team_name,
            content: data[i].contents,
            id: data[i].post_num,
          });
        }

        console.log(arr);
        setViewContent(arr);

        if (count === 0 || count <= 7) {
          setLoadingEnd(false);
        }
      });
  };

  //여기서부터 출력
  return (
    <div className="App">
      <Link to="/Postboard">
        <h2 Style="text-align: center; text-decoration: none; color: green">
          ribbit-ribbit board
        </h2>
      </Link>
      {page === "index" ? (
        ""
      ) : (
        <>
          <input
            className="nickname-input"
            type="text"
            placeholder="닉네임"
            onChange={getValue}
            name="nickname"
          />
          <button
            className="submit-button"
            onClick={() => {
              /*setViewContent(
              viewContent.concat({ ...areaContent, contentId: randomkey() })
            );*/
              writePost(areaContent);
            }}
          >
            RIBBIT
          </button>

          {/* 포스트박스 */}
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [ImgurUploader],
            }}
            data="<p>내용...</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              // const data = editor.getData();
              const data = document.querySelector(".ck.ck-content").innerHTML;
              console.log({ event, editor, data });
              setAreaContent({
                ...areaContent,
                content: data,
              });
              console.log(areaContent);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </>
      )}

      {/* 작성글 출력 */}
      <div className="form-wrapper">
        {/* <App> */}
        <InfiniteScroll
          dataLength={viewContent.length}
          next={() => {
            if (page === "index") {
              return false;
            } else {
              nextPost();
            }
          }}
          hasMore={page === "index" ? false : loadingEnd}
          loader={<h4>Loading...</h4>}
        >
          {viewContent.map((element, index) => (
            <div
              Style="
            border-style: none none solid none;
            border-width: 2px;
            margin-left : 10px;
            margin-right : 10px;
            border-color: gray;"
            >
              <div style={{ float: "left", fontSize: 16, fontWeight: "bold" }}>
                {element.nickname}
              </div>
              <div style={{ float: "right" }}>
                {TimeCounting(new Date(), {
                  objectTime: "",
                  lang: "ko",
                  calculate: { justNow: 600 },
                })}
              </div>
              <br />
              <div className="userCommentContents" style={{ marginBottom: 10 }}>
                {ReactHtmlParser(element.content)}
              </div>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="commentLayerOpener"
                  onClick={(e) => {
                    if (!e.target.classList.contains("open")) {
                      e.target.classList.add("open");
                    } else {
                      e.target.classList.remove("open");
                    }
                  }}
                >
                  댓글달기
                </button>
                <div className="commentLayer">
                  <Comment commentId={element.id} />
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {/* </App> */}
      </div>
    </div>
  );
}

export default App;
