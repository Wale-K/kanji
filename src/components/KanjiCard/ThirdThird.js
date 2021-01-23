import React from "react";
import styled from "styled-components";
import { buttonsArray } from "../../utilities";
import { CardThird } from "../StyledComponents";

const Headings = styled.p`
  color: green;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
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

export const ThirdThird = (props) => {
  return (
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
  );
};
