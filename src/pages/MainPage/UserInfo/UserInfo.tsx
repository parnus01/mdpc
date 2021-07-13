import React, { SyntheticEvent, useEffect, useState, useRef } from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import styled from 'styled-components';
import { Button, Container, Modal, TextField } from "@material-ui/core";
import { useStaff } from "../../../hook/useStaff";
import { useConsent } from "../../../hook/useConsent";

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
const StyleModal = styled(Modal)`
    width: 90%;
    margin: 0 auto;
`;
const StyleModalContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background-color: white;
    padding: 1rem 1rem;
    outline: none;
`;
const StyleButtonGroup = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;

    button {
        width: 100px;
        margin: 0 0.5rem;
    }
`;
const UserInfo: React.FC<Props> = ({nextStep, onNext}) => {
  const [staffId, setStaffId] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const staffRef = useRef('');
  const {fetchStaff, acceptConsent} = useStaff(staffId);
  const {fetchConsent} = useConsent();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStaffId((staffRef.current as unknown as HTMLInputElement).value);
  };
  const handleAcceptConsent = () => {
    acceptConsent.mutate({
      staff_id: staffId
    });
  };

  const handleNextStep = () => {
    if (nextStep) {
      nextStep();
      onNext(staffId);
    }
  };

  useEffect(() => {
    if (fetchStaff.data) {
      if (!fetchStaff.data.info.consent_version) {
        setIsOpenModal(true);
      } else {
        handleNextStep();
      }
    }
    if (acceptConsent.isSuccess) {
      handleNextStep();
    }
  }, [fetchStaff.isLoading, fetchStaff.data, acceptConsent.isSuccess]);

  return (
    <Container>
      <UserInfoWrapper>
        <Form className="userinfo-form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="staff-id" label="รหัสพนักงาน"
                     inputRef={staffRef}
                     required={true}
                     style={{width: '100%'}}/>
          <NextButton variant="contained" color="primary" type="submit">
            ต่อไป
          </NextButton>
        </Form>
        {fetchConsent.data &&
        <StyleModal
          open={isOpenModal}
        >
          <StyleModalContent>
            <h4>consent version : {fetchConsent.data.version}</h4>
            <p>{fetchConsent.data.consent}</p>
            <StyleButtonGroup>
              <Button variant="contained" onClick={() => setIsOpenModal(false)}>
                ไม่ยอมรับ
              </Button>
              <Button variant="contained" color="primary" onClick={handleAcceptConsent}>
                ยอมรับ
              </Button>
            </StyleButtonGroup>
          </StyleModalContent>
        </StyleModal>}
      </UserInfoWrapper>
    </Container>
  );
};

export default UserInfo;