import styled from "styled-components";

export const SortContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--black-075);
`;

export const Sort = styled.div`
  color: var(--black-500);
  height: 35px;
  border: 1px solid var(--black-300);
  padding: 0 0.5rem;
  line-height: 32px;
  cursor: pointer;
  :hover {
    background: var(--theme-button-hover-background-color);
    color: var(--theme-button-hover-color);
  }
  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-left: none;
  }
  &.selected {
    background: var(--black-075);
    color: var(--black-700);
  }
`;

export const QuestionContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0;
  border-bottom: 1px solid var(--black-075);
  display: flex;
  justify-content: space-between;
`;
export const LeftBox = styled.div`
  width: 15%;
  p {
    text-align: right;
    color: var(--highlight-comment);
    margin-bottom: 5px;
  }
`;
export const RigthBox = styled.div`
  width: 83%;
  padding-right: 20px;
  margin-top: -3px;
  h3 {
    color: var(--theme-link-color);
    cursor: pointer;
    font-size: 1.2rem;
    :hover {
      color: var(--theme-link-color-hover);
    }
  }
`;
export const QuestionContent = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export const TagContainer = styled.div`
  margin-top: 10px;
  display: flex;
`;
export const Tag = styled.div`
  color: var(--theme-tag-color);
  background: var(--theme-tag-background-color);
  border-color: var(--theme-tag-border-color);
  padding: 0 1rem;
  height: 20px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    color: var(--theme-tag-hover-color);
    background: var(--theme-tag-hover-background-color);
  }
`;
export const WriterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
export const Writer = styled.span`
  color: var(--theme-link-color);
  margin-right: 10px;
  :hover {
    color: var(--theme-link-color-hover);
  }
`;
export const Date = styled.span`
  color: var(--black-500);
`;

export const PageContainer = styled.div`
  margin: 50px 0 100px 50px;
  .pagination {
    display: flex;
    justify-content: left;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border: 1px solid var(--black-075);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    &:first-child {
      width: 46px;
    }
    &:last-child {
      width: 46px;
    }
    &.disabled {
      display: none;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      text-align: center;
      line-height: 28px;
      font-size: 12px;
    }
    &:not(.active) {
      a {
        :hover {
          background: var(--black-100);
        }
      }
    }
  }

  ul.pagination li.active a {
    color: white;
    cursor: default;
  }

  ul.pagination li.active {
    background-color: var(--theme-primary-color);
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
