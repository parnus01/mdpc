import React, {useState} from 'react';
import styled from "styled-components";
import StepWizard from "react-step-wizard";
import Landing from "./Landing/Landing";
import CameraTaker from "./CameraTaker/CameraTaker";
import UserInfo from "./UserInfo/UserInfo";
import Summary from "./Summary/Summary";

type Props = {}

export type IUser = {
  staffId : string;
  img : string
}

export default function Mainpage({}: Props) {
  const [user, setUser] = useState<IUser>({
    staffId : '',
    img : ''
  });
  const handleLandingNext = (id : string) => {
    setUser(prevState => ({
      ...prevState,
      staffId : id
    }))
  }

  const handleCameraNext = (img : string) => {
    setUser(prevState => ({
      ...prevState,
      img : img
    }))
  }
  return (
    <div className="MainPage">
      <StepWizard isLazyMount={true}>
        <Landing />
        <UserInfo onNext={(id : string) => handleLandingNext(id)}/>
        <CameraTaker onNext={(img : string) => handleCameraNext(img)}/>
        <Summary user={user}/>
      </StepWizard>
    </div>);
}

