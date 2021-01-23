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

const Kanji = styled.p`
  font-size: 7rem;
  margin: 0;
  text-align: center;
`;

const CardContainer = styled.div`
  height: 91vh;
  margin: 2rem;
  display: ${(props) => props.display};
  flex-direction: column;
  border: solid 1px #474747;
  button {
    border: solid 0.5px #474747;
    :hover {
      cursor: pointer;
    }
  }
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
`;

export const SecondThird = (props) => {
  return (
    <TestCardThird display="flex">
      {props.toggleTestMode ? (
        <Kanji>{props.currentKanji.kanji}</Kanji>
      ) : (
        <ValuesContainer>
          {props.currentKanji.meanings.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </ValuesContainer>
      )}
    </TestCardThird>
  );
};
