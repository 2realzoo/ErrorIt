import styled from "styled-components";
import MainList from "../components/Main/MainList";
import QuestionTitle from "../components/QuestionTitle";

const MainComponent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  min-height: 100vh;
`;

function Main() {
  return (
    <MainComponent>
      <QuestionTitle TitleContents="All Questions" />
      <MainList />
    </MainComponent>
  );
}

export default Main;
