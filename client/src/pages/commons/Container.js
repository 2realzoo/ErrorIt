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
  ${(props) => {
    switch (props.pageName) {
      case "SignUp":
        return css``;
      case "Check":
        return css`
          justify-content: center;
        `;
      case "AlertChange":
        return css`
          align-items: center;
          padding-bottom: 10rem;
        `;
      default:
        return;
    }
  }};
`;

function Container({ children, pageName, ...rest }) {
  return (
    <StyledContainer pageName={pageName} {...rest}>
      {children}
    </StyledContainer>
  );
}

export default Container;
