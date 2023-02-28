import styled from "styled-components";
import { useNavigate } from "react-router";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: 400;
`;

const WriteBtn = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 3px;
  color: var(--theme-button-primary-color);
  box-shadow: inset 0 2px 0 0 hsla(0, 0%, 100%, 0.7);
  background: var(--theme-button-primary-background-color);
  text-decoration: none;
  text-align: center;
  outline: none;
  position: relative;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  :hover {
    background: var(--theme-button-primary-hover-background-color);
  }
`;

const QuestionTitle = ({ TitleContents }) => {
  const navigate = useNavigate();
  const linkToWrite = () => {
    if (sessionStorage.getItem("memberId")) {
      navigate("/ask");
    } else {
      alert("질문 작성은 로그인 후 가능합니다");
    }
  };
  return (
    <Container>
      <Title>{TitleContents}</Title>
      <WriteBtn onClick={linkToWrite}>Ask Question</WriteBtn>
    </Container>
  );
};

export default QuestionTitle;
