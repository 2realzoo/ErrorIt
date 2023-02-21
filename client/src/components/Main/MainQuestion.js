import * as M from "./mainStyled";

export const MainQuestion = () => {
  return (
    <>
      <M.QuestionContainer>
        <M.LeftBox>
          <p>0 answers</p>
          <p>0 views</p>
        </M.LeftBox>
        <M.RigthBox>
          <h3>Questions.title</h3>
          <M.QuestionContent>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </M.QuestionContent>
          <M.TagContainer>
            <M.Tag>java</M.Tag>
            <M.Tag>javascript</M.Tag>
          </M.TagContainer>
          <M.WriterContainer>
            <M.Writer>Question.member</M.Writer>
            <M.Date>Question.createdAt</M.Date>
          </M.WriterContainer>
        </M.RigthBox>
      </M.QuestionContainer>
    </>
  );
};
