import styled from "styled-components";

export const CardContainer = styled.div`
  display: ${(props) => props.display};
  height: calc(100vh - 4rem);
  border: solid 1px #474747;
  margin: 2rem;
  button {
    border: solid 0.5px #474747;
    :hover {
      cursor: pointer;
    }
  }
`;

export const CardThird = styled.div`
  width: 33%;
  border-right: ${(props) => props.borderRight};
  padding: 1rem;
  display: ${(props) => props.display};
  flex-direction: column;
`;

export const TestCardThird = styled.div`
  height: 33%;
  padding: 1rem;
  display: ${(props) => props.display};
  align-items: ${(props) => props.align};
  flex-direction: column;
  justify-content: space-between;
`;
