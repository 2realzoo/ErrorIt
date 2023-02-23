import * as A from "./askStyled";
import { goodQuestion } from "./AskTips";

const AskQuestionTitle = () => {
  return (
    <A.TitleContainer>
      <h1>Ask a public question</h1>
      <A.AskBackImg />
      <A.TipBox>
        <h2>{goodQuestion.title}</h2>
        <A.Description>{goodQuestion.description}</A.Description>
        <h5>Steps</h5>
        <ul>
          {goodQuestion.steps.map((el, id) => (
            <A.Step key={id}>{el}</A.Step>
          ))}
        </ul>
      </A.TipBox>
    </A.TitleContainer>
  );
};

export default AskQuestionTitle;
