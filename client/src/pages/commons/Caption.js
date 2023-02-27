import styled from "styled-components";

const StyledCaption = styled.a`
  font-size: var(--fs-caption);
  --_li-fc: var(--theme-link-color);
  --_li-fc-hover: var(--theme-link-color-hover);
  --_li-fc-visited: var(--theme-link-color-visited);
  color: var(--_li-fc);
  cursor: pointer;
  text-decoration: none;
  user-select: auto;
`;

function Caption({ children, ...rest }) {
  return <StyledCaption {...rest}>{children}</StyledCaption>;
}

export default Caption;
