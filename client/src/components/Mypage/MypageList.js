import React, { useEffect, useState } from "react";
import MypagePost from "./MypagePost";
import * as L from "./mypageStyle";
import axios from "axios";
import { useSelector } from "react-redux";

const MypageList = ({ title }) => {
  const { mypageReducer } = useSelector((state) => state);
  const [sort, setSort] = useState("Newest");
  const [list, setList] = useState([]);

  useEffect(() => {
    const endpoint = mypageReducer === "questions" ? `/members/{memberId}/questions` : `/members/{memberId}/answers`;
    // axios
    //   .get(endpoint)
    //   .then((res) => {
    //     console.log(res.data);
    //     setList(mypageReducer === "questions" ? res.data.question : res.data.answers);
    //   })
    //   .catch((err) => err);
  }, [mypageReducer]);

  return (
    <L.ListContainer>
      <h3>{title}</h3>
      <L.SortContainer>
        <L.Sort className={sort === "Newest" ? "selected" : ""} onClick={() => setSort("Newest")}>
          Newest
        </L.Sort>
        <L.Sort className={sort === "View" ? "selected" : ""} onClick={() => setSort("View")}>
          View
        </L.Sort>
      </L.SortContainer>
      <L.Lists>
        <MypagePost />
      </L.Lists>
    </L.ListContainer>
  );
};

export default MypageList;
