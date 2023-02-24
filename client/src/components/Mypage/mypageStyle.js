import styled from "styled-components";
import userImg from "../../asset/tempUser.png";

/* ========================== MypageTitle's Styles ===========================*/

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
export const UserImg = styled.img.attrs({
  src: `${userImg}`,
})`
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
  top: 0;
  right: 20px;
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
