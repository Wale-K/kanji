import React from "react";
import { CardContainer } from "../StyledComponents";
import { FirstThird } from "./FirstThird";
import { SecondThird } from "./SecondThird";
import { ThirdThird } from "./ThirdThird";

const TestCard = (props) => {
  return (
    <CardContainer display={props.display ? "flex" : "none"}>
      <FirstThird
        display="flex"
        handleToggleTestMode={props.handleToggleTestMode}
        toggleTestMode={props.toggleTestMode}
        selectedGrades={props.selectedGrades}
        gradeOnOffSwitch={props.gradeOnOffSwitch}
      />
      <SecondThird
        toggleTestMode={props.toggleTestMode}
        currentKanji={props.currentKanji}
      />
      <ThirdThird
        display="flex"
        align="flex-end"
        randomKanji={props.randomKanji}
        toggleCard={props.toggleCard}
      />
    </CardContainer>
  );
};

export default TestCard;
