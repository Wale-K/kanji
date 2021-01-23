import React from "react";
import styled from "styled-components";
import { TestCardThird } from "../StyledComponents";
import { buttonsArray } from "../../utilities";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TestTypeContainer = styled.div`
  display: flex;
`;

const TestType = styled.p`
  margin: 0 1rem 0 0;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  :hover {
    cursor: pointer;
  }
  padding: 0.5rem;
`;

const QuestionTitleDiv = styled.div`
  text-align: center;
  font-size: 2.5rem;
`;

const GradeButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

export const FirstThird = (props) => {
  return (
    <TestCardThird display="flex">
      <TopBarContainer>
        <TestTypeContainer>
          <TestType
            onClick={props.handleToggleTestMode}
            backgroundColor={
              props.toggleTestMode ? "rgb(255,77,77)" : "rgba(255,77,77, 0.3)"
            }
            color={props.toggleTestMode ? "white" : "#474747"}
          >
            Reading Test
          </TestType>
          <TestType
            onClick={props.handleToggleTestMode}
            backgroundColor={
              props.toggleTestMode ? "rgba(255,77,77, 0.3)" : "rgb(255,77,77)"
            }
            color={props.toggleTestMode ? "#474747" : "white"}
          >
            Writing Test
          </TestType>
        </TestTypeContainer>
        <div>
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
        </div>
      </TopBarContainer>
      <QuestionTitleDiv>
        {props.toggleTestMode ? (
          <p>What are the meanings and readings for this kanji?</p>
        ) : (
          <p>What is the kanji of these meanings?</p>
        )}
      </QuestionTitleDiv>
    </TestCardThird>
  );
};
