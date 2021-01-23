import React from "react";
import styled from "styled-components";
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

export const SecondThird = (props) => {
  return (
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
  );
};
