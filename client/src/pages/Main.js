import styled from "styled-components";
import MainList from "../components/Main/MainList";
import QuestionTitle from "../components/QuestionTitle";
import Sidebar from "../components/Sidebar";
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
