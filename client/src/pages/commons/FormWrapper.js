import styled from "styled-components";

const StyledFormWrapper = styled.div`
  margin: calc(var(--su12) / 2);
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
`;

function FormWrapper({ children, ...rest }) {
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
}

export default FormWrapper;
