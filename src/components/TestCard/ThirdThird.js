import React from "react";
import styled from "styled-components";
import { TestCardThird } from "../StyledComponents";

const KanjiModeDiv = styled.div`
  padding: 1rem;
  width: 7%;
  margin-bottom: 1vh;
  text-align: center;
  background-color: rgba(255, 77, 77, 0.3);

  :hover {
    cursor: pointer;
    background-color: rgb(255, 77, 77);
    color: white;
  }
`;

const NextButton = styled.button`
  background-color: #33cc33;
  width: 9%;
`;

export const ThirdThird = (props) => {
  return (
    <TestCardThird display="flex" align="flex-end">
      <NextButton onClick={props.randomKanji}>
        {props.toggleTestMode ? "次" : "Next"}
      </NextButton>
      <KanjiModeDiv onClick={props.toggleCard}>Study Mode</KanjiModeDiv>
    </TestCardThird>
  );
};
