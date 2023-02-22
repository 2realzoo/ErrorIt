import styled from "styled-components";

const StyledForm = styled.div`
  margin: calc(var(--su12) / 2);
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
`;

function Form({ children, ...rest }) {
  return <StyledForm>{children}</StyledForm>;
}

export default Form;
