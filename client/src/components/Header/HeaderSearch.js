import React, { useState } from "react";
import styled from "styled-components";
import { TbSearch } from "react-icons/tb";
import Button from "./Button";
import "./HeaderSearch.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  top: 8px;
`;
const Search = styled.div`
  background-color: white;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  color: hsl(210, 8%, 25%);
  display: flex;
  position: absolute;
  flex-direction: row;
  align-items: center;
  line-height: calc(15 / 13);
  width: 100%;
  height: 30.6px;
  padding: 0.6em 0.7em;
  margin-bottom: 10px;
`;
const SearchInput = styled.input`
  width: 100%;
`;
const SearchHintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--_po-bg);
  border: 1px solid var(--_po-bc);
  border-radius: var(--br-md);
  height: 100%;
  box-shadow: var(--_po-bs);
  position: relative;
  top: 44px;
  left: 40px;
  width: 80%;
  max-width: 36rem;
  min-width: 435px;
  height: fit-content;
  color: var(--fc-dark);
  font-size: var(--fs-body1);
  white-space: normal;
  z-index: var(--zi-popovers);
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
function HeaderSearch() {
  const [isActive, setIsActive] = useState(false);
  const handleClickSearch = () => {
    setIsActive(true);
  };
  //   const handleUnmountSearch = () => {
  //     setIsActive(false);
  //   };
  return (
    <Container>
      <Search onFocus={handleClickSearch}>
        <TbSearch className="search-icon" />
        <SearchInput
          className="search-input"
          type="search"
          placeholder="Search..."
        />
      </Search>
      {isActive ? (
        <SearchHintWrapper>
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
      ) : (
        <></>
      )}
    </Container>
  );
}

export default HeaderSearch;
