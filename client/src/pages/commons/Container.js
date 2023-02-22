import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  background-color: var(--black-050);
  overflow: visible;
  ${(props) => {
    switch (props.pageName) {
      case "SignUp":
        return css`
          padding: var(--su24);
          padding-left: var(--su16);
          padding-right: var(--su16);
        `;
      case "Check":
        return css`
          justify-content: center;
        `;
      default:
        return css``;
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
