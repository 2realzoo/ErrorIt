import * as M from "./mainStyled";
import { Link } from "react-router-dom";

export const MainQuestion = ({ createAt, answers, member, questionId, title, viewCount, content }) => {
  return (
    <>
      <M.QuestionContainer>
        <M.LeftBox>
          <p>{answers} answers</p>
          <p>{viewCount} views</p>
        </M.LeftBox>
        <M.RigthBox>
          <Link to={`/question`} state={{ questionId: questionId }}>
            <h3>{title}</h3>
          </Link>

          <M.QuestionContent>{content}</M.QuestionContent>
          {/* <M.TagContainer>
            {tags.map((el, id) => (
              <M.Tag key={`${id}'sTags${el}`}>{el}</M.Tag>
            ))}
          </M.TagContainer> */}
          <M.TagContainer>
            <M.Tag>JAVA</M.Tag>
            <M.Tag>Javascript</M.Tag>
          </M.TagContainer>
          <M.WriterContainer>
            <M.Writer>{member}</M.Writer>
            <M.Date>{createAt.split("T")[0]}</M.Date>
          </M.WriterContainer>
        </M.RigthBox>
      </M.QuestionContainer>
    </>
  );
};
