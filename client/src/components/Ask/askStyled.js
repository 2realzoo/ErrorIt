import styled from "styled-components";
import ask_bg from "../../asset/ask_bg.svg";

export const FormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
export const InputContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
`;
export const InputBox = styled.div`
  width: 80%;
  max-width: 950px;
  border: 1px solid var(--black-075);
  padding: 1rem;
  margin-bottom: 20px;
  &.inputDisabled {
    background: var(--black-025);
    opacity: 0.5;
    cursor: not-allowed;
    .submitDisabled {
      display: none;
    }
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  input {
    border: 1px solid var(--black-075);
    width: 100%;
    padding: 0.5rem;
    border-radius: 3px;
    &.tagInput {
      width: auto;
      border: none;
    }
  }
  textarea {
    border: 1px solid var(--black-075);
    width: 100%;
    height: 200px;
    padding: 0.5rem;
    border-radius: 3px;
    resize: vertical;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
export const NextBnt = styled.div`
  width: 50px;
  height: 38px;
  color: white;
  background: var(--theme-button-primary-background-color);
  margin-top: 12px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  &:not(.disabled):hover {
    background: var(--theme-button-primary-hover-background-color);
  }
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const SubmitBnt = styled.div`
  width: 60px;
  height: 38px;
  color: white;
  background: var(--theme-button-primary-background-color);
  margin-top: 12px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  &:hover {
    background: var(--theme-button-primary-hover-background-color);
  }
`;
export const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  cursor: text;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  line-height: 18px;
  margin: 5px;
  padding: 5px;
  background: var(--theme-tag-background-color);
  border-radius: 5px;
  color: var(--theme-tag-color);
  font-size: 13px;
`;

export const DelBnt = styled.div`
  width: 16px;
  height: 16px;
  font-weight: 700;
  margin-left: 3px;
  border-radius: 3px;
  text-align: center;
  line-height: 16px;
  cursor: pointer;
  :hover {
    background: var(--theme-tag-hover-color);
    color: var(--theme-tag-background-color);
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  height: 420px;
  h1 {
    font-size: 28px;
    font-weight: 600;
    position: absolute;
    top: 40px;
  }
`;
export const AskBackImg = styled.img.attrs({
  src: `${ask_bg}`,
})`
  width: 70%;
  max-width: 600px;
  position: absolute;
  right: 0;
`;

export const TipBox = styled.div`
  width: 80%;
  max-width: 950px;
  height: 270px;
  background: var(--blue-050);
  border: 1px solid var(--blue-200);
  border-radius: 3px;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  h2 {
    font-size: 22px;
    margin-bottom: 14px;
  }
  h5 {
    font-size: 14px;
    font-weight: bold;
    margin: 14px 0 10px 0;
  }
`;
export const Description = styled.div`
  white-space: pre-wrap;
`;
export const Step = styled.li`
  list-style: inside;
  font-size: 14px;
  margin-left: 20px;
`;

export const TipContainer = styled.div`
  flex-grow: 1;
  max-width: 300px;
  margin-left: 20px;
  border: 1px solid var(--black-075);
  border-radius: 3px;
`;
export const TipTitle = styled.div`
  width: 100%;
  height: 50px;
  background: var(--black-025);
  border-bottom: 1px solid var(--black-075);
  line-height: 48px;
  padding-left: 10px;
`;
export const TipContent = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  word-break: keep-all;
`;
export const TipIcon = styled.div`
  flex-grow: 1;
  .writeIcon {
    font-size: 40px;
  }
`;
export const TipText = styled.div`
  flex-grow: 2;
  margin-left: 10px;
  font-size: 14px;
  white-space: pre-wrap;
`;
