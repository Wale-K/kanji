import React from "react";

import { CardContainer } from "../StyledComponents";
import { FirstThird } from "./FirstThird";
import { SecondThird } from "./SecondThird";
import { ThirdThird } from "./ThirdThird";

const KanjiCard = (props) => {
  return (
    <CardContainer display={props.displayStudy ? "flex" : "none"}>
      <FirstThird
        currentKanji={props.currentKanji}
        kanjiStart={props.kanjiStart}
        decrementKanji={props.decrementKanji}
        incrementKanji={props.incrementKanji}
        randomKanji={props.randomKanji}
        kanjiEnd={props.kanjiEnd}
      />
      <SecondThird currentKanji={props.currentKanji} />
      <ThirdThird
        selectedGrades={props.selectedGrades}
        gradeOnOffSwitch={props.gradeOnOffSwitch}
        currentKanji={props.currentKanji}
        toggleCard={props.toggleCard}
      />
    </CardContainer>
  );
};

export default KanjiCard;
