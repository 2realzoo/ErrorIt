import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  margin: calc(var(--su4) / 2);
  margin-right: 0;
  margin-left: 0;
  padding: 0.3em 0.5em;
  border: 1px solid var(--bc-darker);
  border-radius: var(--br-sm);
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;
  width: 100%;
`;

function Select({ children, ...rest }) {
  return <StyledSelect {...rest}>{children}</StyledSelect>;
}

export default Select;
