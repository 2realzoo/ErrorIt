import axios from "axios";
import { useEffect, useState } from "react";
import * as E from "./mypageStyle";
import Refresh from "../../util/Refresh";

const MypageEdit = ({ userInfo }) => {
  const [name, setName] = useState(userInfo.name);
  const [intro, setIntro] = useState("");

  const patchReq = async (data) => {
    const axiosPatch = () => {
      return axios
        .patch(`/api/members/${userInfo.memberId}`, data, {
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

  const submitPatch = () => {
    const setting = {
      name: name,
      intro: intro,
    };
    patchReq(setting)
      .then((res) => {
        console.log(res.data);
        window.location.replace("/mypage");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (userInfo.intro) {
      setIntro(userInfo.intro);
    }
  }, []);

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
