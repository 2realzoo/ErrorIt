import styled from "styled-components";

const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin: calc(var(--su4) / 2);
  margin-right: 0;
  margin-left: 0;
  padding: 0.6em 0.7em;
  border: 1px solid var(--bc-darker);
  border-radius: var(--br-sm);
  background-color: var(--white);
  color: var(--fc-dark);
  font-size: var(--fs-body1);
  font-family: inherit;
`;

function Input({ children, ...rest }) {
  return <StyledInput {...rest}>{children}</StyledInput>;
}

export default Input;
