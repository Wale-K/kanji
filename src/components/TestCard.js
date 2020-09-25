import React from "react";
import styled from "styled-components";
import { buttonsArray } from "../utilities";

const CardThird = styled.div`
  height: 33%;
  padding: 1rem;
  display: ${(props) => props.display};
  align-items: ${(props) => props.align};
  flex-direction: column;
  justify-content: space-between;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const Kanji = styled.p`
  font-size: 7rem;
  margin: 0;
  text-align: center;
`;

const CardContainer = styled.div`
  height: 92vh;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  border: solid 1px #474747;
  button {
    border: solid 0.5px #474747;
    :hover {
      cursor: pointer;
    }
  }
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

const ValuesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;

  p {
    margin: 1rem;
    font-size: 1.5rem;
  }
`;

const NextButton = styled.button`
  background-color: #33cc33;
  width: 9%;

  decoration: none;
`;

const GradeButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

const TestCard = (props) => {
  return (
    <CardContainer display="block">
      <CardThird display="flex">
        <TopBarContainer>
          <TestTypeContainer>
            <TestType
              onClick={props.handleToggleTestMode}
              backgroundColor={
                props.toggleTestMode ? "rgba(255,77,77, 0.3)" : "rgb(255,77,77)"
              }
              color={props.toggleTestMode ? "#474747" : "white"}
            >
              Reading Test
            </TestType>
            <TestType
              onClick={props.handleToggleTestMode}
              backgroundColor={
                props.toggleTestMode ? "rgb(255,77,77)" : "rgba(255,77,77, 0.3)"
              }
              color={props.toggleTestMode ? "white" : "#474747"}
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
      </CardThird>

      <CardThird>
        {props.toggleTestMode ? (
          <Kanji>{props.currentKanji.kanji}</Kanji>
        ) : (
          <ValuesContainer>
            {props.currentKanji.meanings.map((elem) => {
              return <p key={elem}>{elem}</p>;
            })}
          </ValuesContainer>
        )}
      </CardThird>
      <CardThird display="flex" align="flex-end">
        <NextButton onClick={props.randomKanji}>
          {props.toggleTestMode ? "次" : "Next"}
        </NextButton>
        <KanjiModeDiv onClick={props.toggleCard}>Study Mode</KanjiModeDiv>
      </CardThird>
    </CardContainer>
  );
};

export default TestCard;
