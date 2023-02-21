import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border-color: hsl(205, 41%, 63%);
  border: 1px solid;
  border-radius: 3px;
  align-self: center;
  padding-top: calc(8px * 1);
  padding-bottom: calc(8px * 1);
  padding-left: 0.8em;
  padding-right: 0.8em;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 0.8rem;
  line-height: 15px;
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
  white-space: nowrap;
  ${(props) =>
    props.hoverBackgroundColor
      ? css`
          &:hover {
            background-color: ${props.hoverBackgroundColor};
          }
        `
      : css`
          &:hover {
            background-color: inherit;
          }
        `};

  color: ${(props) => props.color || "hsl(205, 47%, 42%)"};
  background: ${(props) => props.background || "hsl(205, 46%, 92%)"};
  margin-left: ${(props) => props.marginLeft || "0"};
  margin-right: ${(props) => props.marginRight || "0"};
  border-color: ${(props) => props.borderColor || "hsl(205, 41%, 63%)"};
`;

function Button({
  children,
  hoverBackgroundColor,
  color,
  background,
  marginLeft,
  marginRight,
  borderColor,
  ...rest
}) {
  return (
    <StyledButton
      hoverBackgroundColor={hoverBackgroundColor}
      color={color}
      background={background}
      marginLeft={marginLeft}
      marginRight={marginRight}
      borderColor={borderColor}
      {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
