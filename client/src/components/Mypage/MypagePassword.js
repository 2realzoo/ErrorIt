import { useState, useRef } from "react";
import * as P from "./mypageStyle";

const MypagePassword = () => {
  const [checked, setChecked] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const newPass = useRef();

  const changePwd = () => {
    // const setting = { memberId: "", password: newPwd };
    if (newPwd != pwdCheck) {
      alert("새로운 비밀번호와 비밀번호 확인이 서로 다릅니다");
      newPass.current.focus();
    } else {
      // axios.patch('/api/members/{memberid}/password', setting).then((res) => {
      //   console.log(res.data)
      // })
    }
  };
  const checkPwd = () => {
    // const info = { email: "", password: currentPwd };
    setChecked(true);
    // axios
    //   .post("/api/login", info, {
    //     headers: { "ngrok-skip-browser-warning": "12" },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     //성공이면 setChecked true 실패면 alert (님 비번 틀림)
    //   });
  };

  return (
    <P.EditContainer>
      <h2>Change your password</h2>
      <h3></h3>
      {checked ? (
        <>
          <P.EditBox>
            <p>New Password</p>
            <input type="password" placeholder="Enter your NEW password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} ref={newPass} />
            <p>Password Check</p>
            <input type="password" placeholder="Enter your NEW password again" value={pwdCheck} onChange={(e) => setPwdCheck(e.target.value)} />
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
