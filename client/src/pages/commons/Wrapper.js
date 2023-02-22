import styled, { css } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
  ${(props) => {
    switch (props.pageName) {
      case "Login":
        return css`
          padding-top: 18vh;
          padding-bottom: 24vh;
        `;
      case "SignUp":
        return css``;
      case "CheckUser":
        return css`
          padding-top: 17vh;
          padding-bottom: 23vh;
        `;
      default:
        return css``;
    }
  }}
`;

function Wrapper({ children, pageName, ...rest }) {
  return (
    <StyledWrapper pageName={pageName} {...rest}>
      {children}
    </StyledWrapper>
  );
}

export default Wrapper;
