import styled from "styled-components";

export const QuestionContainer = styled.div`
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubAttribute = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  ul {
    display: flex;
    li {
      font-size: small;
      span{
        color: var(--black-200);
      }
      margin: 5px 10px 10px 0;
    }
  }
`;
