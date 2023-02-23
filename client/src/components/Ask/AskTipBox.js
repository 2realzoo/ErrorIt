import styled from "styled-components";
import { TbWriting } from "react-icons/tb";
import * as A from "./askStyled";

const AskTipBox = ({ title, content }) => {
  return (
    <A.TipContainer>
      <A.TipTitle>{title}</A.TipTitle>
      <A.TipContent>
        <A.TipIcon>
          <TbWriting className="writeIcon" />
        </A.TipIcon>
        <A.TipText>{content}</A.TipText>
      </A.TipContent>
    </A.TipContainer>
  );
};

export default AskTipBox;
