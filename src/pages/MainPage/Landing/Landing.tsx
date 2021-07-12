import React from 'react';
import { StepWizardChildProps } from "react-step-wizard";
import { Button, Container } from "@material-ui/core";
import styled from 'styled-components';

type Props = Partial<StepWizardChildProps>


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
`;

const StartButton = styled(Button)`
    width: 100%;
`;

const LandingContainer = styled.div`
    width: 100%;
`;
const Landing: React.FC<Props> = ({nextStep}) => {
  const handleClick = () => {
    if (nextStep) {
      nextStep();
    }
  };
  return (
    <Container>
      <Wrapper>
        <p>Logo</p>
        <StartButton variant="contained" color="primary" onClick={handleClick}>
          เริ่ม
        </StartButton>
      </Wrapper>
    </Container>
  );
};

export default Landing;