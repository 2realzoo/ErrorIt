import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import * as D from "./mypageStyle";
import Refresh from "../../util/Refresh";

const DeleteBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const NoticeBox = styled.ul`
  width: 100%;
  padding: 1rem;
`;
const Notice = styled.li`
  list-style: inside;
`;

const Label = styled.label`
  position: relative;
  display: block;
  margin-top: 20px;
  input {
    width: 20px;
    height: 20px;
    border: 1px solid var(--black-075);
    appearance: auto;
    position: absolute;
    top: 2px;
  }
  cursor: pointer;
`;
const DeleteBnt = styled.div`
  width: 100px;
  height: 38px;
  border-radius: 3px;
  color: var(--theme-button-primary-color);
  box-shadow: inset 0 1px 0 1px hsla(0, 0%, 100%, 0.6);
  background: var(--red-500);
  text-decoration: none;
  text-align: center;
  position: relative;
  line-height: 38px;
  font-size: 12px;
  margin-top: 28px;
  cursor: default;
  opacity: 0.5;
  &.active {
    opacity: 1;
    cursor: pointer;
  }
`;

const MypageDelete = ({ userInfo }) => {
  const [delCheck, setDelCheck] = useState(false);
  const deleteReq = async () => {
    const axiosReq = () => {
      return axios
        .delete(`/api/members/${userInfo.memberId}`, {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => res)
        .catch((err) => err);
    };
    let result = await axiosReq();
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosReq();
    }
    return result.data;
  };
  const deleteProfile = () => {
    if (delCheck) {
      deleteReq
        .then((res) => {
          console.log(res.data);
          window.location.replace("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <D.EditContainer>
      <h2>Delete Profile</h2>
      <DeleteBox>
        <p>Before confirming that you would like your profile deleted, we'd like to take a moment to explain the implications of deletion:</p>
        <NoticeBox>
          <Notice>
            Deletion is irreversible, and you will have no way to regain any of your original content, should this deletion be carried out and you change your
            mind later on.
          </Notice>
          <Notice>
            Your questions and answers will remain on the site, but will be disassociated and anonymized and will not indicate your authorship even if you later
            return to the site.
          </Notice>
        </NoticeBox>
        <p>
          Confirming deletion will only delete your profile on Stack Overflow - it will not affect any of your other profiles on the Stack Exchange network. If
          you want to delete multiple profiles, you'll need to visit each site separately and request deletion of those individual profiles.
        </p>
        <Label>
          <input type="checkbox" onChange={() => setDelCheck(!delCheck)} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I have read the information stated above and understand the implications of having my profile deleted. I wish to
          proceed with the deletion of my profile.
        </Label>
      </DeleteBox>
      <DeleteBnt className={delCheck ? "active" : ""} onClick={deleteProfile}>
        Delete Profile
      </DeleteBnt>
    </D.EditContainer>
  );
};

export default MypageDelete;
