import styled, { css } from "styled-components";

const StyledFormContainer = styled.form`
  box-shadow: var(--bs-xl);
  padding: var(--su24);
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
  background-color: var(--white);
  border-radius: var(--br-lg);
  max-width: 20rem;
  ${(props) => {
    switch (props.pageName) {
      case "Login":
        return css`
           {
            width: 255px;
          }
        `;
      default:
        return css`
           {
          }
        `;
    }
  }}
`;

function FormContainer({ children, pageName, ...rest }) {
  return (
    <StyledFormContainer pageName={pageName} {...rest}>
      {children}
    </StyledFormContainer>
  );
}

export default FormContainer;
