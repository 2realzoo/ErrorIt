import styled from "styled-components";
import { goodQuestion } from "./AskTips";
// import ask_bg from "../../ask_bg.svg";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  height: 420px;
  h1 {
    font-size: 28px;
    font-weight: 600;
    position: absolute;
    top: 40px;
  }
`;
// const AskBackImg = styled.img.attrs({
//   src: `${ask_bg}`,
// })`
//   width: 70%;
//   max-width: 600px;
//   position: absolute;
//   right: 0;
// `;

const TipBox = styled.div`
  width: 80%;
  max-width: 950px;
  height: 270px;
  background: var(--blue-050);
  border: 1px solid var(--blue-200);
  border-radius: 3px;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  h2 {
    font-size: 22px;
    margin-bottom: 14px;
  }
  h5 {
    font-size: 14px;
    font-weight: bold;
    margin: 14px 0 10px 0;
  }
`;
const Description = styled.div`
  white-space: pre-wrap;
`;
const Step = styled.li`
  list-style: inside;
  font-size: 14px;
  margin-left: 20px;
`;

const AskQuestionTitle = () => {
  return (
    <TitleContainer>
      <h1>Ask a public question</h1>
      {/* <AskBackImg /> */}
      <TipBox>
        <h2>{goodQuestion.title}</h2>
        <Description>{goodQuestion.description}</Description>
        <h5>Steps</h5>
        <ul>
          {goodQuestion.steps.map((el, id) => (
            <Step key={id}>{el}</Step>
          ))}
        </ul>
      </TipBox>
    </TitleContainer>
  );
};

export default AskQuestionTitle;
