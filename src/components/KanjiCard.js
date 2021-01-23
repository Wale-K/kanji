import React from "react";
import styled from "styled-components";
import {
  buttonsArray,
  start,
  decrement,
  increment,
  end,
  random,
} from "../utilities";

const CardContainer = styled.div`
  display: flex;
  height: 91vh;
  border: solid 1px #474747;
  margin: 2rem;
  button {
    border: solid 0.5px #474747;
    :hover {
      cursor: pointer;
    }
  }
`;

const TopBar = styled.div`
  color: rgb(255, 77, 77);
  font-weight: bold;
  font-size: 1.2rem;
`;

const Headings = styled.p`
  color: green;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const CardThird = styled.div`
  width: 33%;
  border-right: ${(props) => props.borderRight};
  padding: 1rem;
  display: ${(props) => props.display};
  flex-direction: column;
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

const TestModeDiv = styled.div`
  padding: 1rem;
  width: 19%;

  text-align: center;
  background-color: rgba(255, 77, 77, 0.3);

  :hover {
    cursor: pointer;
    background-color: rgb(255, 77, 77);
    color: white;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0 1vh 0;
`;

const GradeButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

const AllButtons = styled.div`
  align-self: flex-end;
  button {
    :hover {
      cursor: pointer;
    }
  }
`;

const KanjiCard = (props) => {
  return (
    <CardContainer display="flex">
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
      <CardThird borderRight="solid 1px #474747">
        <SubsectionDiv height="43%">
          <Headings>Meanings</Headings>
          <ValuesContainer>
            {props.currentKanji
              ? props.currentKanji.meanings.map((elem) => {
                  return <p key={elem}>{elem}</p>;
                })
              : ""}
          </ValuesContainer>
        </SubsectionDiv>
        <Headings>Name Readings</Headings>
        <ValuesContainer>
          {props.currentKanji
            ? props.currentKanji.name_readings.map((elem) => {
                return <p key={elem}>{elem}</p>;
              })
            : ""}
        </ValuesContainer>
      </CardThird>

      <CardThird display="flex">
        <AllButtons>
          {buttonsArray.map((elem) => {
            return (
              <GradeButton
                backgroundColor={
                  props.selectedGrades.includes(elem) &&
                  props.selectedGrades.length !== 7
                    ? "rgb(255,77,77)"
                    : "rgba(255,77,77, 0.3)"
                }
                color={
                  props.selectedGrades.includes(elem) &&
                  props.selectedGrades.length !== 7
                    ? "white"
                    : "#474747"
                }
                key={elem}
                onClick={props.gradeOnOffSwitch(elem)}
              >
                {elem}
              </GradeButton>
            );
          })}
          <GradeButton
            onClick={props.gradeOnOffSwitch("All")}
            backgroundColor={
              props.selectedGrades.length === 7
                ? "rgb(255,77,77)"
                : "rgba(255,77,77, 0.3)"
            }
            color={props.selectedGrades.length === 7 ? "white" : "#474747"}
          >
            All
          </GradeButton>
        </AllButtons>
        <TopBar>Info.</TopBar>
        <div>
          <Headings>JLPT</Headings>
          <p>{props.currentKanji.jlpt}</p>
          <Headings>Grade</Headings>
          <p>{props.currentKanji.grade}</p>
          <Headings>Strokes</Headings>
          <p>{props.currentKanji.stroke_count}</p>
        </div>
        <Bottom>
          <div>
            <input
              value={props.searchInputValue}
              onChange={props.kanjiSearch}
            ></input>
            <button onClick={props.kanjiSearchSubmit}>Search</button>
          </div>

          <TestModeDiv onClick={props.toggleCard}>Test Mode</TestModeDiv>
        </Bottom>
      </CardThird>
    </CardContainer>
  );
};

export default KanjiCard;
