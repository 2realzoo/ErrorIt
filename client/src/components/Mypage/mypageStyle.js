import styled from "styled-components";
import userImg from "../../asset/tempUser.png";

/* ========================== MypageTitle's Styles ===========================*/

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
export const UserImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 3px;
`;
export const Textbox = styled.div`
  margin-left: 20px;
  padding-top: 10px;
  h3 {
    font-size: 34px;
    margin-bottom: 5px;
  }
  p {
    display: block;
    position: relative;
    color: var(--black-400);
    margin-bottom: 5px;
    font-size: 14px;
    .icon {
      position: absolute;
      bottom: 0;
    }
  }
`;
export const EditBnt = styled.div`
  width: 100px;
  height: 34px;
  border: 1px solid var(--black-300);
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 30px;
  font-size: 14px;
  color: var(--black-600);
  cursor: pointer;
  :hover {
    background: var(--black-025);
    color: var(--black-800);
  }
`;

/* ========================== MypageCategory's Styles ===========================*/

export const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;
export const Category = styled.div`
  width: 78px;
  height: 32px;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  :hover {
    background: var(--black-075);
  }
  &.active {
    color: white;
    background: var(--theme-primary-color);
    :hover {
      background: hsl(var(--theme-primary-color-h), var(--theme-primary-color-s), calc(var(--theme-primary-color-l) - 10%));
    }
  }
`;

/* ========================== MypageList's Styles ===========================*/

export const ListContainer = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  h3 {
    font-size: 24px;
  }
`;

export const SortContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
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

export const Lists = styled.div`
  width: 100%;
  border: 1px solid var(--black-075);
  border-radius: 3px;
  margin-top: 20px;
`;

export const PostContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid var(--black-075);
  position: relative;
  &:last-child {
    border: none;
  }
  h3 {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    color: var(--black-500);
    font-size: 14px;
    &.date {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
    }
  }
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

/* ========================== MypageSetting's Styles ===========================*/

export const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 20px;
`;
export const SettingBar = styled.div`
  width: 20%;
  max-width: 160px;
  flex-grow: 1;
  h5 {
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 10px;
  }
  margin-right: 30px;
`;
export const SettingComponent = styled.div`
  width: 80%;
  height: 80vh;
  flex-grow: 2;
`;
export const BarMenu = styled.ul``;
export const Menu = styled.li`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  border-radius: 20px;
  padding-left: 10px;
  line-height: 28px;
  cursor: pointer;
  :hover {
    background: var(--black-075);
  }
  &.active {
    color: white;
    background: var(--theme-primary-color);
    :hover {
      background: hsl(var(--theme-primary-color-h), var(--theme-primary-color-s), calc(var(--theme-primary-color-l) - 10%));
    }
  }
`;

/* ========================== MypageEdit's Styles ===========================*/

export const EditContainer = styled.div`
  width: 100%;
  h2 {
    font-size: 28px;
    border-bottom: 1px solid var(--black-075);
    margin-top: -5px;
    padding-bottom: 16px;
  }
  h3 {
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 20px;
  }
`;
export const EditBox = styled.div`
  width: 100%;
  border: 1px solid var(--black-075);
  border-radius: 3px;
  padding: 1rem;
  p {
    font-weight: 600;
    margin-bottom: 6px;
  }
  input {
    border: 1px solid var(--black-075);
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
    padding: 0.4rem 0.8rem;
    margin-bottom: 10px;
  }
  textarea {
    resize: vertical;
    border: 1px solid var(--black-075);
    border-radius: 3px;
    width: 100%;
    height: 200px;
    padding: 0.8rem;
  }
`;
export const SubmitBnt = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 3px;
  color: var(--theme-button-primary-color);
  box-shadow: inset 0 2px 0 0 hsla(0, 0%, 100%, 0.7);
  background: var(--theme-button-primary-background-color);
  text-decoration: none;
  text-align: center;
  outline: none;
  position: relative;
  line-height: 40px;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
  :hover {
    background: var(--theme-button-primary-hover-background-color);
  }
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

export const NoticeText = styled.p`
  color: var(--red-600);
  font-size: 12px;
  display: none;
  &.active {
    display: block;
  }
`;
