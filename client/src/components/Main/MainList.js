import * as M from "./mainStyled";
import { useEffect, useState } from "react";
import { MainQuestion } from "./MainQuestion";
import Pagination from "react-js-pagination";
import axios from "axios";

const MainList = () => {
  const [sortTag, setSortTag] = useState("Newest");
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data);
        setQuestionList(res.data.questions);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => err);
  }, []);

  return (
    <>
      <M.SortContainer>
        <M.Sort className={sortTag === "Newest" ? "selected" : ""} onClick={() => setSortTag("Newest")}>
          Newest
        </M.Sort>
        <M.Sort className={sortTag === "View" ? "selected" : ""} onClick={() => setSortTag("View")}>
          View
        </M.Sort>
        <M.Sort className={sortTag === "Score" ? "selected" : ""} onClick={() => setSortTag("Score")}>
          Score
        </M.Sort>
      </M.SortContainer>
      {questionList &&
        questionList.map((el, id) => {
          return (
            <MainQuestion
              key={el.questionId}
              createAt={el.createAt}
              answers={el.answers}
              member={el.member}
              questionId={el.questionId}
              tags={el.tags}
              title={el.title}
              viewCount={el.viewCount}
            />
          );
        })}
      <M.PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={pageInfo.totalElement}
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
