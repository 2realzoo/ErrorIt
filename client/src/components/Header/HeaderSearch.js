import React from "react";
import styled from "styled-components";
import { TbSearch } from "react-icons/tb";
import SearchHintBox from "./SearchHint";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  top: 8px;
  background-color: transparent;
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
  .search-icon {
    margin-right: 0.3em;
    min-width: 22px;
    color: var(--theme-topbar-search-placeholder);
    font-size: 1.3rem;
    padding-top: 2px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
`;
function HeaderSearch({ isHintOpen }) {
  return (
    <Container className="search-box">
      <Search className="search-box">
        <TbSearch className="search-icon search-box" />
        <SearchInput
          className="search-input search-box"
          type="search"
          placeholder="Search..."
        />
      </Search>
      {isHintOpen ? <SearchHintBox /> : <></>}
    </Container>
  );
}

export default HeaderSearch;
