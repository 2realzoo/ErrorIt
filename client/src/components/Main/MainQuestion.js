import * as M from "./mainStyled";
import { Link } from "react-router-dom";

export const MainQuestion = ({ createAt, answers, member, questionId, tags, title, viewCount }) => {
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

          <M.QuestionContent>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </M.QuestionContent>
          <M.TagContainer>
            {tags.map((el, id) => (
              <M.Tag key={`${id}'sTags${el}`}>{el}</M.Tag>
            ))}
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
