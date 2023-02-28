import styled, { css } from "styled-components";

const StyledButton = styled.button`
  margin: calc(var(--su16) / 2);
  margin-right: 0;
  margin-left: 0;
  background-color: var(--_bu-bg);
  border: var(--_bu-baw) solid var(--_bu-bc);
  border-radius: var(--_bu-br);
  box-shadow: var(--_bu-bs);
  color: white;
  font-size: var(--_bu-fs);
  padding: var(--_bu-p);
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: normal;
  line-height: var(--lh-sm);
  position: relative;
  width: 100%;
  --_bu-baw: var(--su-static1);
  --_bu-bc: transparent;
  --_bu-br: var(--br-sm);

  ${(props) => {
    switch (props.pageName) {
      case "CheckUser":
      case "SignUp":
        return css`
          &:disabled {
            cursor: default;
            background-color: var(--black-300);
          }
        `;
      case "ChangePassword":
        return css`
          &:disabled {
            cursor: default;
            background-color: var(--black-150);
            color: black;
            &:hover {
              background-color: var(--black-150);
              color: black;
            }
          }
          &:hover {
            background-color: var(--_bu-bg-hover);
            color: white;
          }
        `;
      default:
        return css``;
    }
  }}
`;

function Button({ children, pageName, ...rest }) {
  return (
    <StyledButton pageName={pageName} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
