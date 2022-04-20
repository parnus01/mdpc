import React, { useCallback, useEffect, useRef } from 'react';
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

const Canvas = styled.canvas`
    height: auto;
    max-width: 100%;
    max-height: 60vh;
`;
const boxWidth= 100
const boxHeight= 100
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

  const canvasImgRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasImgRef.current) {
      const canvas = canvasImgRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        let imgObj = new Image();
        imgObj.src = user.img;
        imgObj.onload = () => {
          context.canvas.width = imgObj.width;
          context.canvas.height = imgObj.height;
          context.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
          context.strokeStyle = "#FF0000";
          context.lineWidth = 3;
          context.strokeRect(20, 100, boxWidth, boxHeight);
          context.strokeRect(160, 100, boxWidth, boxHeight);
          context.strokeRect(300, 100, boxWidth, boxHeight);
          context.fillStyle = 'red';
          context.font = "30px Arial";
          context.fillText('test draw text', 300, imgObj.height - 20);
        };
      }
    }

  }, [user.img]);
  return (user) ? (
    <Container>
      <SummaryWrapper>
        {!compare.isError && !compare.isSuccess &&
        <>
          <p>รหัสพนักงาน : {user.staffId}</p>
          <h3>Raw image :</h3>
          <PreviewImg src={user.img} alt=""/>
          <br/>
          <h3>Canvas image :</h3>
          <Canvas ref={canvasImgRef} />

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