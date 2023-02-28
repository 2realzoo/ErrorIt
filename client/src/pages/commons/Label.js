import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: var(--fc-dark);
  font-family: inherit;
  font-weight: 600;
  padding: 0 var(--su2);
  margin-top: ${(props) => props.marginTop || "0"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-right: 0;
  margin-left: 0;
`;

function Label({ children, ...rest }) {
  return <StyledLabel {...rest}>{children}</StyledLabel>;
}

export default Label;
