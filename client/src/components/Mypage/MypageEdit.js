import axios from "axios";
import { useState } from "react";
import * as E from "./mypageStyle";

const MypageEdit = () => {
  const [name, setName] = useState("나중에 info받아서 초기값설정해");
  const [intro, setIntro] = useState("나중에 info받아서 초기값설정해");

  const submitPatch = () => {
    const setting = {
      name: name,
      intro: intro,
    };
    console.log(setting);
    // axios.patch('/api/members/{memberid}', setting).then((res) => {
    //   console.log(res.data)
    // })
  };

  return (
    <E.EditContainer>
      <h2>Edit your profile</h2>
      <h3>Public information</h3>
      <E.EditBox>
        <p>Display Name</p>
        <input type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
        <p>About Me</p>
        <textarea onChange={(e) => setIntro(e.target.value)} value={intro} />
      </E.EditBox>
      <E.SubmitBnt onClick={submitPatch}>Submit</E.SubmitBnt>
    </E.EditContainer>
  );
};

export default MypageEdit;
