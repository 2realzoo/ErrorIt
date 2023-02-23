import AskQuestionTitle from "../components/Ask/AskQuestionTitle";
import styled from "styled-components";
import AskForm from "../components/Ask/AskForm";

const QuestionComponent = styled.div`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  min-height: 100vh;
`;

function AskQuestion() {
  return (
    <QuestionComponent>
      <AskQuestionTitle />
      <AskForm />
    </QuestionComponent>
  );
}

export default AskQuestion;
