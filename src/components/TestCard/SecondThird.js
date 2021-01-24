import React from "react";
import styled from "styled-components";
import { TestCardThird } from "../StyledComponents";

const Kanji = styled.p`
  font-size: 7rem;
  margin: 0;
  text-align: center;
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
