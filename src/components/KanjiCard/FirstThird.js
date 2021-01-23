import React from "react";
import styled from "styled-components";
import { start, end, increment, decrement, random } from "../icons";
import { CardThird } from "../StyledComponents";

const Headings = styled.p`
  color: green;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const SubsectionDiv = styled.div`
  height: ${(props) => props.height};
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  p {
    padding-bottom: 1rem;
    margin: 0;
    width: 25%;
  }
`;

const Kanji = styled.p`
  font-size: 7rem;
  margin: 0;
  text-align: center;
`;

const ControlsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  svg {
    width: 2rem;
    height: 2rem;
    :hover {
      cursor: pointer;
      color: rgb(255, 77, 77);
    }
  }
`;

export const FirstThird = (props) => {
  return (
    <CardThird borderRight="solid 1px #474747">
      <Headings>Kanji</Headings>
      <Kanji>{props.currentKanji.kanji}</Kanji>
      <ControlsDiv>
        <svg onkeypress={props.kanjiStart} onClick={props.kanjiStart}>
          {start}
        </svg>
        <svg onClick={props.decrementKanji}>{decrement}</svg>
        <svg onClick={props.incrementKanji}>{increment}</svg>
        <svg onClick={props.kanjiEnd}>{end}</svg>
        <svg onClick={props.randomKanji}>{random}</svg>
      </ControlsDiv>
      <SubsectionDiv height="28%">
        <Headings>Kunyomi</Headings>

        <ValuesContainer>
          {props.currentKanji
            ? props.currentKanji.kun_readings.map((elem) => {
                return <p key={elem}>{elem}</p>;
              })
            : ""}
        </ValuesContainer>
      </SubsectionDiv>

      <Headings>Onyomi</Headings>
      <ValuesContainer>
        {props.currentKanji
          ? props.currentKanji.on_readings.map((elem) => {
              return <p key={elem}>{elem}</p>;
            })
          : ""}
      </ValuesContainer>
    </CardThird>
  );
};
