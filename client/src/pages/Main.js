import styled from "styled-components";
import MainList from "../components/Main/MainList";
import QuestionTitle from "../components/QuestionTitle";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { currentPage } from "../reducers/actions";
import { useEffect } from "react";
const MainComponent = styled.div`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;
const QuestionContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 30px;
  &.logined {
    max-width: 1300px;
  }
`;

function Main() {
  const dispatch = useDispatch();
  const { currentPageReducer } = useSelector((state) => state);
  useEffect(() => {
    if (currentPageReducer === "Users") dispatch(currentPage("Question"));
  }, []);
  return (
    <MainComponent>
      {sessionStorage.getItem("memberId") ? <Sidebar /> : <></>}
      <QuestionContainer className={sessionStorage.getItem("memberId") ? "" : "logined"}>
        <QuestionTitle TitleContents="All Questions" />
        <MainList />
      </QuestionContainer>
    </MainComponent>
  );
}

export default Main;
