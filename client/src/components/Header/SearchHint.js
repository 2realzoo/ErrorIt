import React from "react";
import styled from "styled-components";
import Button from "./Button";

const SearchHintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--_po-bg);
  border: 1px solid var(--_po-bc);
  border-radius: var(--br-md);
  height: 100%;
  box-shadow: var(--_po-bs);
  position: absolute;
  top: 44px;
  left: 40px;
  width: 80%;
  max-width: 36rem;
  min-width: 435px;
  height: fit-content;
  color: var(--fc-dark);
  font-size: var(--fs-body1);
  white-space: normal;
  z-index: 20000;
  .arrow-icon {
    position: absolute;
    transform: translate3d(196.8px, 0px, 0px) rotate(45deg);
    position: absolute;
    display: block;
    height: var(--su12);
    width: var(--su12);
    z-index: -1;
    bottom: var(--_po-arrow-b);
    background-color: var(--_po-arrow-fc);
    right: var(--_po-arrow-r);
    top: -5px;
    border: 1px solid var(--_po-bc);
  }
  .arrow-icon::after {
    bottom: var(--_po-arrow-after-b);
    box-shadow: var(--_po-arrow-after-bs);
    top: 2px;
    right: -15px;
    background: currentColor;
    border-radius: calc(var(--su-static1) * 1.5);
    content: "";
    position: absolute;
    display: block;
    background-color: var(--_po-arrow-fc);
    border: 1px solid white;
    width: 30px;
    height: var(--su12);
    z-index: -1;
    transform: rotate(-45deg);
  }
`;
const SearchHint = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--su12);
`;
const FlexItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: var(--_po-w);
  border-radius: var(--br-md);
  max-width: 24rem;
  white-space: normal;
  z-index: var(--zi-popovers);
  flex-basis: 50%;
  vertical-align: baseline;
`;
const ItemWrapper = styled.div`
  margin-bottom: var(--su12);
`;
const ItemName = styled.span`
  font-family: var(--ff-mono);
`;
const ItemExplain = styled.span`
  padding-left: 0.6rem;
  color: var(--black-500);
`;
const SearchHintBottom = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--su12);
  margin-top: calc(var(--su1) * -1);
  border-top: 1px solid var(--black-075);
  justify-content: space-between;
  align-items: center;
`;
const LinkedWord = styled.a`
  color: var(--theme-link-color);
  cursor: pointer;
`;

function SearchHintBox() {
  return (
    <SearchHintWrapper className="search-box">
      <div className="arrow-icon"></div>
      <SearchHint>
        <FlexItem>
          <ItemWrapper>
            <ItemName>[tag]</ItemName>
            <ItemExplain>search within a tag</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>user:1234</ItemName>
            <ItemExplain>search by author</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>"words here"</ItemName>
            <ItemExplain>exact phrase</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>collective:"Name"</ItemName>
            <ItemExplain>collective content</ItemExplain>
          </ItemWrapper>
        </FlexItem>
        <FlexItem>
          <ItemWrapper>
            <ItemName>answers:0</ItemName>
            <ItemExplain>unanswered questions</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>score:3</ItemName>
            <ItemExplain>posts with a 3+ score</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>is:question</ItemName>
            <ItemExplain>type of post</ItemExplain>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>isaccepted:yes</ItemName>
            <ItemExplain>search within status</ItemExplain>
          </ItemWrapper>
        </FlexItem>
      </SearchHint>
      <SearchHintBottom>
        <Button>Ask a question</Button>
        <LinkedWord href="https://stackoverflow.com/help/searching">
          Search help
        </LinkedWord>
      </SearchHintBottom>
    </SearchHintWrapper>
  );
}

export default SearchHintBox;
