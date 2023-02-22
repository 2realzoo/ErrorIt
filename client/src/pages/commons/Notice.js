import styled from "styled-components";

const StyledNotice = styled.div`
  font-size: var(--fs-caption);
  margin-top: ${(props) => props.marginTop || "var(--su4)"};
  margin-bottom: var(--su4);
  clear: both;
  color: ${(props) => props.color || "var(--theme-body-font-color)"};
`;

function Notice({ children, pageName, ...rest }) {
  return (
    <StyledNotice pageName={pageName} {...rest}>
      {children}
    </StyledNotice>
  );
}

export default Notice;
