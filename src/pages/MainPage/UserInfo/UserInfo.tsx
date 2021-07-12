import React, { SyntheticEvent, useState } from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import styled from 'styled-components';
import { Button, Container, TextField } from "@material-ui/core";

type Props = Partial<StepWizardChildProps> & {
  onNext: (id: string) => void
}

const UserInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
`;
const NextButton = styled(Button)`
    width: 100%;
    margin: 2rem 0;
`;

const Form = styled.form`
    width: 100%;
`;
const UserInfo: React.FC<Props> = ({nextStep, onNext}) => {
  const [staffId, setStaffId] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (nextStep) {
      nextStep();
      onNext(staffId)
    }
  };
  return (
    <Container>
      <UserInfoWrapper>
        <Form className="userinfo-form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="staff-id" label="รหัสพนักงาน"
                     value={staffId}
                     onChange={(e) => setStaffId(e.target.value)}
                     required={true}
                     style={{width: '100%'}}/>
          <NextButton variant="contained" color="primary" type="submit">
            ต่อไป
          </NextButton>
        </Form>
      </UserInfoWrapper>
    </Container>
  );
};

export default UserInfo;