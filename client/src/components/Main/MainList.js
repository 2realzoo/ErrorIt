import * as M from "./mainStyled";
import { useEffect, useState } from "react";
import { MainQuestion } from "./MainQuestion";
import Pagination from "react-js-pagination";
import axios from "axios";

const MainList = () => {
  const [sortTag, setSortTag] = useState("latest");
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalElements: 0 });

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const REQ_PARAM = { sort: sortTag, page: page };

    axios({
      method: "GET",
      url: "/api/questions",
      params: REQ_PARAM,
      headers: {
        "ngrok-skip-browser-warning": "12",
      },
    }).then((res) => {
      console.log(res.data);
      setQuestionList(res.data.questions);
      setPageInfo(res.data.pageInfo);
    });
    window.scrollTo(0, 0);
  }, [sortTag, page]);

  return (
    <>
      <M.SortContainer>
        <M.Sort className={sortTag === "latest" ? "selected" : ""} onClick={() => setSortTag("latest")}>
          Latest
        </M.Sort>
        <M.Sort className={sortTag === "popular" ? "selected" : ""} onClick={() => setSortTag("popular")}>
          Most Viewed
        </M.Sort>
        {/* <M.Sort className={sortTag === "Score" ? "selected" : ""} onClick={() => setSortTag("Score")}>
          Score
        </M.Sort>  // 추천 기능 구현시 활성화*/}
      </M.SortContainer>
      {questionList &&
        questionList.map((el, id) => {
          return (
            <MainQuestion
              key={el.questionId}
              createAt={el.createdAt}
              answers={el.answers}
              member={el.member}
              questionId={el.questionId}
              title={el.title}
              viewCount={el.viewCount}
              content={el.content}
            />
          );
        })}
      <M.PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={pageInfo?.totalElements}
          pageRangeDisplayed={5}
          prevPageText={"Prev"}
          nextPageText={"Next"}
          onChange={handlePageChange}
          hideFirstLastPages={true}
        />
      </M.PageContainer>
    </>
  );
};

export default MainList;
