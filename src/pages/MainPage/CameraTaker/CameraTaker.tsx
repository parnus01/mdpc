import React, { useCallback, useRef } from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import styled from 'styled-components';
import Webcam from "react-webcam";
import faceImg from "../../../assets/images/face.svg";

type Props = Partial<StepWizardChildProps> & {
  onNext: (id: string) => void
}

const CameraContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: black;
`;

const CameraWrapper = styled.div`
    position: relative;
    video {
        max-height: 100vh;
        width: 100%;
        height: auto;
        background-color: black;
    }
`;

const CaptureButton = styled.div`
    .outer-circle {
        left: -37px;
        height: 75px;
        width: 75px;
        background-color: hsla(0, 0%, 100%, .4);
        z-index: 1;
        border-radius: 50%;
    }

    .inner-circle {
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 38px;
        height: 44px;
        width: 44px;
        background: #fff;
        margin: -22px 0 0 -22px;
        z-index: 2;
    }

    position: fixed;
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyleFaceWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
        width: 40vw;
        height: auto;
    }
`;

const CameraTaker: React.FC<Props> = ({nextStep, onNext}) => {
  const cameraRef = useRef<Webcam>(null);
  const handleCapture = useCallback(() => {
    if (cameraRef.current && nextStep) {
      const img = cameraRef.current.getScreenshot();
      if (img) {
        nextStep();
        onNext(img);
      }
    }
  }, [cameraRef]);

  return (
    <CameraContainer>
      <CameraWrapper>
        <Webcam mirrored={true}
                audio={false}
                ref={cameraRef}
                screenshotQuality={1} // set the Quality of camera (0-1)
                forceScreenshotSourceSize
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user"
                }}>
        </Webcam>
        <StyleFaceWrapper>
          <img src={faceImg} alt=""/>
        </StyleFaceWrapper>
      </CameraWrapper>
      <CaptureButton onClick={handleCapture}>
        <div className="outer-circle">
          <div className="inner-circle"></div>
        </div>
      </CaptureButton>
    </CameraContainer>
  );
};

export default CameraTaker;