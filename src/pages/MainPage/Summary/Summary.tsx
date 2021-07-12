import React, {useEffect} from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import styled from 'styled-components';
import { Button, Container } from "@material-ui/core";
import { IUser } from "../MainPage";
import { useCompare } from "../../../hook/useCompare";
import { useAppStore } from "../../../state/app";

type Props = Partial<StepWizardChildProps> & {
  user: IUser
}

const SummaryWrapper = styled.div`
    width: 100%;
    margin: 2rem 0;
`;
const SubmitButton = styled(Button)`
    width: 100%;
    margin: 2rem 0;
`;

const Form = styled.form`
    width: 100%;
`;

const PreviewImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 450px;
`;

const Summary: React.FC<Props> = ({nextStep, user}) => {
  const state = useAppStore()
  const {compare} = useCompare();
  const submitCompare = () => {
    state.activeLoading()
    compare.mutate({
      image: user.img,
      staff_id: user.staffId
    });
    //TODO
    // - Handle loading state
    // - Handle success or fail result
  };
  useEffect(() => {
    if(!compare.isLoading){
      state.inactiveLoading()
    }
  }, [compare.isLoading])

  return (user) ? (
    <Container>
      <SummaryWrapper>
        <p>รหัสพนักงาน : {user.staffId}</p>
        <PreviewImg src={user.img} alt=""/>
        <SubmitButton variant="contained" color="primary" type="button" onClick={submitCompare}>
          ยืนยัน
        </SubmitButton>
      </SummaryWrapper>
    </Container>
  ) : <div></div>;
};

export default Summary;