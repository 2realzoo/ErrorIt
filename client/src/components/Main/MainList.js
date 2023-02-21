import * as M from "./mainStyled";
import { useState } from "react";
import { MainQuestion } from "./MainQuestion";

const MainList = () => {
  const [sortTag, setSortTag] = useState("Newest");
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
      <MainQuestion />
      <MainQuestion />
      <MainQuestion />
      <MainQuestion />
    </>
  );
};

export default MainList;
