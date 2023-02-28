import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  max-width: 100%;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  background-color: var(--black-050);
  display: flex;
  flex: 1 0 auto;
  margin: -50px auto 0 auto;
  align-items: center;
`;

function Container({ children, ...rest }) {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
}

export default Container;
