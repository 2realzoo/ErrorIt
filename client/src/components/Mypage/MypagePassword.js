import { useState, useRef } from "react";
import * as P from "./mypageStyle";
import axios from "axios";
import Refresh from "../../util/Refresh";

const MypagePassword = ({ userInfo }) => {
  const [checked, setChecked] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [pwdReg, setPwdReg] = useState(true);
  const [checkReg, setCheckReg] = useState(true);
  const newPass = useRef();

  const patchReq = async (data) => {
    const axiosPatch = (data) => {
      return axios
        .patch(`/api/members/${sessionStorage.getItem("memberId")}/password`, data, {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => res)
        .catch((err) => err);
    };
    let result = await axiosPatch();
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosPatch();
    }
    return result.data;
  };

  const changePwd = () => {
    const setting = { password: newPwd };
    if (newPwd != pwdCheck || !pwdReg || !checkReg) {
      alert("비밀번호 양식이 맞지 않습니다. 다시 확인해주세요");
      newPass.current.focus();
    } else {
      patchReq(setting)
        .then((res) => {
          alert("비밀번호가 변경되었습니다");
          window.location.replace("/mypage");
        })
        .catch((err) => {
          alert("비밀번호 변경에 실패했습니다");
        });
    }
  };
  const checkPwd = () => {
    const info = { email: userInfo.email, password: currentPwd };
    axios
      .post("/api/login", info, {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {
        window.localStorage.setItem("jwtToken", res.headers.authorization);
        setChecked(true);
      })
      .catch((err) => {
        alert("비밀번호 확인에 실패했습니다. 다시 확인해주세요");
      });
  };

  const passwordCheck = (e) => {
    const regexp = new RegExp(/^(?=.+[A-Za-z])(?=.+\d)[A-Za-z\d]{8,}$/gm);
    switch (e.target.id) {
      case "newPassword":
        regexp.test(e.target.value) ? setPwdReg(true) : setPwdReg(false);
        break;
      case "newPwdCheck":
        e.target.value === newPwd ? setCheckReg(true) : setCheckReg(false);
        break;
      default:
        return;
    }
  };

  return (
    <P.EditContainer>
      <h2>Change your password</h2>
      <h3></h3>
      {checked ? (
        <>
          <P.EditBox>
            <p>New Password</p>
            <input
              type="password"
              placeholder="Enter your NEW password"
              value={newPwd}
              id="newPassword"
              onChange={(e) => setNewPwd(e.target.value)}
              ref={newPass}
              onKeyUp={passwordCheck}
            />
            <P.NoticeText className={pwdReg ? "" : "active"}>
              Passwords must contain at least eight characters, including at least 1 letter and 1 number.
            </P.NoticeText>
            <p>Password Check</p>
            <input
              type="password"
              placeholder="Enter your NEW password again"
              value={pwdCheck}
              id="newPwdCheck"
              onChange={(e) => setPwdCheck(e.target.value)}
              onKeyUp={passwordCheck}
            />
            <P.NoticeText className={checkReg ? "" : "active"}>New password and confirmation password are different. Please check your password.</P.NoticeText>
          </P.EditBox>
          <P.SubmitBnt onClick={changePwd}>Submit</P.SubmitBnt>
        </>
      ) : (
        <>
          <P.EditBox>
            <p>Password Confirm</p>
            <input type="password" placeholder="Enter your current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
          </P.EditBox>
          <P.SubmitBnt onClick={checkPwd}>Confirm</P.SubmitBnt>
        </>
      )}
    </P.EditContainer>
  );
};

export default MypagePassword;
