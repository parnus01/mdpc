import React, { useCallback, useEffect } from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import styled from 'styled-components';
import { Button, Container } from "@material-ui/core";
import { IUser } from "../MainPage";
import { useCompare } from "../../../hook/useCompare";
import { convertURIToBlob } from "../../../services/utils";

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

const PreviewImg = styled.img`
    height: auto;
    max-width: 100%;
    max-height: 60vh;
`;

const Summary: React.FC<Props> = ({nextStep, user}) => {
  const {compare} = useCompare();
  const imageFile = useCallback(
    (input: string) => {
      return convertURIToBlob(input);
    },
    [user.img],
  );

  const submitCompare = () => {
    compare.mutate({
      image: imageFile(user.img),
      staff_id: user.staffId
    });
  };

  return (user) ? (
    <Container>
      <SummaryWrapper>
        {!compare.isError && !compare.isSuccess &&
        <>
          <p>รหัสพนักงาน : {user.staffId}</p>
          <PreviewImg src={user.img} alt=""/>
          <SubmitButton variant="contained" color="primary" type="button" onClick={submitCompare}>
            ยืนยัน
          </SubmitButton>
        </>
        }
        {/*200 case*/}
        {compare.data && compare.isSuccess &&
        <p>
          Result : {(compare.data.result.check_result) ? 'pass' : 'not pass'} <br/>
          Description : {compare.data.result.detail}
        </p>}
        {/*---------------------------*/}

        {/*Error case*/}
        {(compare.error instanceof Error) && compare.isError &&
        <p>
          Error found <br/>
          Description : {compare.error.message}
        </p>}
        {/*---------------------------*/}
      </SummaryWrapper>
    </Container>
  ) : <></>;
};

export default Summary;