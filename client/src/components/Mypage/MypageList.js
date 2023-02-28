import React, { useEffect, useState } from "react";
import MypagePost from "./MypagePost";
import * as L from "./mypageStyle";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Refresh from "../../util/Refresh";

const MypageList = ({ title, type }) => {
  const { mypageReducer } = useSelector((state) => state);
  const userId = sessionStorage.getItem("memberId");
  const [sort, setSort] = useState("latest");
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalElements: 0 });
  const handlePageChange = (page) => {
    setPage(page);
  };
  const getList = async (end, param) => {
    const axiosGet = () => {
      return axios({
        method: "GET",
        url: end,
        params: param,
        headers: {
          "ngrok-skip-browser-warning": "12",
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => res)
        .catch((err) => err);
    };
    let result = await axiosGet();
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosGet();
    }
    return result.data;
  };

  useEffect(() => {
    const endpoint = mypageReducer === "Questions" ? `/api/members/${userId}/questions` : `/api/members/${userId}/answers`;
    const REQ_PARAM = { sort: sort, page: page };
    getList(endpoint, REQ_PARAM).then((res) => {
      console.log(res);
      if (res.questions) {
        setList(res.questions);
      } else {
        setList(res.answers);
      }
      setPageInfo(res.pageInfo);
    });
  }, [mypageReducer, sort, page]);

  return (
    <L.ListContainer>
      <h3>{title}</h3>
      <L.SortContainer>
        <L.Sort className={sort === "latest" ? "selected" : ""} onClick={() => setSort("latest")}>
          Latest
        </L.Sort>
        <L.Sort className={sort === "popular" ? "selected" : ""} onClick={() => setSort("popular")}>
          Most Viewed
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
