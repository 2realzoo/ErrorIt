import { useState } from "react";
import * as S from "./mypageStyle";
import MypageEdit from "./MypageEdit";
import MypageDelete from "./MypageDelete";
import MypagePassword from "./MypagePassword";

const MypageSetting = () => {
  const [setting, setSetting] = useState("Edit");

  return (
    <S.SettingContainer>
      <S.SettingBar>
        <h5>PERSONAL INFORMATION</h5>
        <S.BarMenu>
          <S.Menu className={setting === "Edit" ? "active" : ""} onClick={() => setSetting("Edit")}>
            Edit profile
          </S.Menu>
          <S.Menu className={setting === "Change" ? "active" : ""} onClick={() => setSetting("Change")}>
            Change Passsword
          </S.Menu>
          <S.Menu className={setting === "Delete" ? "active" : ""} onClick={() => setSetting("Delete")}>
            Delete profile
          </S.Menu>
        </S.BarMenu>
      </S.SettingBar>
      <S.SettingComponent>
        {setting === "Edit" ? <MypageEdit /> : <></>}
        {setting === "Change" ? <MypagePassword /> : <></>}
        {setting === "Delete" ? <MypageDelete /> : <></>}
      </S.SettingComponent>
    </S.SettingContainer>
  );
};

export default MypageSetting;
