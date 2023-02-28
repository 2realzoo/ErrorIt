import React, { useEffect, useState } from "react";
import MypagePost from "./MypagePost";
import * as L from "./mypageStyle";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";

const MypageList = ({ title, type }) => {
  const { mypageReducer } = useSelector((state) => state);
  const userId = sessionStorage.getItem("memberId");
  const [sort, setSort] = useState("최신순");
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalElements: 0 });
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    const endpoint = mypageReducer === "Questions" ? `/api/members/${userId}/questions` : `/api/members/${userId}/answers`;
    const REQ_PARAM = { sort: sort, page: page };
    axios({
      method: "GET",
      url: endpoint,
      params: REQ_PARAM,
      headers: {
        "ngrok-skip-browser-warning": "12",
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.questions) {
        setList(res.data.questions);
      } else {
        setList(res.data.answers);
      }
      setPageInfo(res.data.pageInfo);
    });
  }, [mypageReducer]);

  return (
    <L.ListContainer>
      <h3>{title}</h3>
      <L.SortContainer>
        <L.Sort className={sort === "최신순" ? "selected" : ""} onClick={() => setSort("최신순")}>
          Newest
        </L.Sort>
        <L.Sort className={sort === "조회순" ? "selected" : ""} onClick={() => setSort("조회순")}>
          View
        </L.Sort>
      </L.SortContainer>
      <L.Lists>
        {list.map((el, id) => (
          <MypagePost key={el.modifiedAt} post={el} type={type} />
        ))}
      </L.Lists>
      <L.PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={pageInfo.totalElements}
          pageRangeDisplayed={5}
          prevPageText={"Prev"}
          nextPageText={"Next"}
          onChange={handlePageChange}
          hideFirstLastPages={true}
        />
      </L.PageContainer>
    </L.ListContainer>
  );
};

export default MypageList;
