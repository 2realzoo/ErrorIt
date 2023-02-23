import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
`;
const InputContainer = styled.div`
  width: 80%;
  max-width: 950px;
  margin-top: 20px;
`;
const InputBox = styled.div`
  width: 100%;
  border: 1px solid var(--black-075);
  padding: 1rem;
  margin-bottom: 20px;
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
  }
  textarea {
    border: 1px solid var(--black-075);
    width: 100%;
    height: 200px;
    padding: 0.5rem;
    border-radius: 3px;
    resize: vertical;
  }
`;
const NextBnt = styled.div`
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

const AskForm = () => {
  const [chapter, setChapter] = useState(1);
  const [disabledBnt, setDisabledBnt] = useState(true);
  const [openTip, setOpenTip] = useState("title");
  const titleCheck = (e) => {
    if (e.target.value.length >= 10) setDisabledBnt(false);
  };
  const contentsCheck = (e) => {
    if (e.target.value.length >= 20) setDisabledBnt(false);
  };
  const goToNext = () => {
    if (!disabledBnt) {
      setChapter(chapter + 1);
      setDisabledBnt(true);
    }
  };
  return (
    <FormContainer>
      <InputContainer>
        <form>
          <InputBox>
            <h3>Title</h3>
            <p>Be specific and imagine you’re asking a question to another person. Minimum 10 characters.</p>
            <input
              type="text"
              name="title"
              placeholder="e.g Is there an R function for finding the index of element in a vector?"
              onKeyUp={titleCheck}
              onFocus={() => {
                setOpenTip("title");
              }}
            />
            {chapter === 1 ? (
              <NextBnt className={disabledBnt ? "disabled" : ""} onClick={goToNext}>
                Next
              </NextBnt>
            ) : (
              <></>
            )}
          </InputBox>
          <InputBox>
            <h3>What are the details of your problem?</h3>
            <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
            <textarea
              name="contents"
              onKeyUp={contentsCheck}
              onFocus={() => {
                setOpenTip("content");
              }}
            />
            {chapter === 2 ? (
              <NextBnt className={disabledBnt ? "disabled" : ""} onClick={goToNext}>
                Next
              </NextBnt>
            ) : (
              <></>
            )}
          </InputBox>
        </form>
      </InputContainer>
    </FormContainer>
  );
};

export default AskForm;
