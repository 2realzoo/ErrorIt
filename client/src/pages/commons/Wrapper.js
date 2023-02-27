import styled, { css } from "styled-components";

const StyledWrapper = styled.div`
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
        return css`
          min-height: 530px;
        `;
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
