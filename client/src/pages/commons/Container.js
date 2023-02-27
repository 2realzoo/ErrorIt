import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-color: var(--black-050);
  overflow: hidden;

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
          padding-bottom: 10rem;
        `;
      default:
        return;
    }
  }}
`;

function Container({ children, pageName, ...rest }) {
  return (
    <StyledContainer pageName={pageName} {...rest}>
      {children}
    </StyledContainer>
  );
}

export default Container;
