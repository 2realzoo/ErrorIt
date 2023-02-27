import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import AskTipBox from "./AskTipBox";
import { titleTip, contentTip, tagTip } from "./AskTips";
import * as A from "./askStyled";

const AskForm = () => {
  const [chapter, setChapter] = useState(1);
  const [disabledBnt, setDisabledBnt] = useState(true);
  const [openTip, setOpenTip] = useState("title");
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const tagInput = useRef();
  const titleInput = useRef();
  const contentInput = useRef();
  const navigate = useNavigate();

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
  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  };
  const submitQuestion = () => {
    const questionData = {
      memberId: sessionStorage.getItem("memberId"),
      title: titleInput.current.value,
      content: contentInput.current.value,
    };
    axios
      .post("/api/questions", questionData, {
        headers: {
          "ngrok-skip-browser-warning": "12",
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/question", { state: { questionId: res.data.questionId } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <A.FormContainer>
      <A.InputContainer>
        <A.InputBox>
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
            ref={titleInput}
          />
          {chapter === 1 ? (
            <A.NextBnt className={disabledBnt ? "disabled" : ""} onClick={goToNext}>
              Next
            </A.NextBnt>
          ) : (
            <></>
          )}
        </A.InputBox>
        {openTip === "title" ? <AskTipBox title={titleTip.title} content={titleTip.description} /> : <></>}
      </A.InputContainer>
      <A.InputContainer>
        <A.InputBox className={chapter >= 2 ? "" : "inputDisabled"}>
          <h3>What are the details of your problem?</h3>
          <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
          <textarea
            name="contents"
            onKeyUp={contentsCheck}
            onFocus={() => {
              setOpenTip("content");
            }}
            ref={contentInput}
            disabled={chapter >= 2 ? false : true}
          />
          {chapter === 2 ? (
            <A.NextBnt className={disabledBnt ? "disabled" : ""} onClick={goToNext}>
              Next
            </A.NextBnt>
          ) : (
            <></>
          )}
        </A.InputBox>
        {openTip === "content" ? <AskTipBox title={contentTip.title} content={contentTip.description} /> : <></>}
      </A.InputContainer>
      <A.InputContainer>
        <A.InputBox className={chapter === 3 ? "" : "inputDisabled"}>
          <h3>Tags</h3>
          <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
          <A.TagBox
            onClick={() => {
              tagInput.current.focus();
            }}
          >
            {tagList.map((tagItem, index) => {
              return (
                <A.TagItem key={index}>
                  <span>{tagItem}</span>
                  <A.DelBnt onClick={deleteTagItem}>X</A.DelBnt>
                </A.TagItem>
              );
            })}
            <input
              type="text"
              ref={tagInput}
              placeholder="Press enter to add tags"
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyUp={(e) => (e.key === "Enter" ? submitTagItem() : null)}
              className="tagInput"
              onFocus={() => {
                setOpenTip("tag");
              }}
            />
          </A.TagBox>
          <A.SubmitBnt className={chapter === 3 ? "" : "submitDisabled"} onClick={submitQuestion}>
            Submit
          </A.SubmitBnt>
        </A.InputBox>
        {openTip === "tag" ? <AskTipBox title={tagTip.title} content={tagTip.description} /> : <></>}
      </A.InputContainer>
    </A.FormContainer>
  );
};

export default AskForm;
