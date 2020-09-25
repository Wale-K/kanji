import React from "react";
import "./App.css";
import axios from "axios";

import styled from "styled-components";
import KanjiCard from "./components/KanjiCard";
import TestCard from "./components/TestCard";
import update from "immutability-helper"; // remove this.

const Card = styled.div`
  display: ${(props) => props.display};
`;

class App extends React.Component {
  state = {
    allKanji: null,
    currentKanji: null,
    currentKanjiIndex: 0,
    searchInputValue: "",
    cardToggle: true,
    toggleTestMode: true,
    selectedGrades: [1],
    length: 0,
  };

  // generates a randomly selected kanji grade from current grades in operation.
  generateGrade = () => {
    let grade = Math.floor(Math.random() * this.state.selectedGrades.length);
    return this.state.selectedGrades[grade];
  };

  // the page starts at grade 1 and updates the state so allKanji are the grade 1 kanji.
  componentDidMount = () => {
    axios
      .get(`https://kanjiapi.dev/v1/kanji/grade-${this.generateGrade()}`)
      .then((response) => {
        this.setState({
          allKanji: response.data,
          length: response.data.length,
        });
      });
  };

  // this sets the first kanji of the grade 1 kanji to be the currentKanji.
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.currentKanji === null) {
      axios
        .get(
          `https://kanjiapi.dev/v1/kanji/${
            this.state.allKanji[this.state.currentKanjiIndex]
          }`
        )
        .then((response) => {
          this.setState({
            currentKanji: response.data,
            currentGrade: response.data.grade,
          });
        });
    }
  };

  // clicking this either adds or removes the grade to the grades that are currently selected.
  gradeOnOffSwitch = (gradeValue) => () => {
    if (!this.state.selectedGrades.includes(gradeValue)) {
      this.setState((prevState) => ({
        selectedGrades: [...prevState.selectedGrades, gradeValue],
      }));
    } else if (this.state.selectedGrades.length === 7) {
      this.setState({ selectedGrades: [gradeValue] });
    } else if (this.state.selectedGrades.length !== 1) {
      const selectedGradesCopy = this.state.selectedGrades.filter(
        (grade) => grade !== gradeValue
      );
      this.setState({ selectedGrades: selectedGradesCopy });
    }

    if (gradeValue === "All") {
      this.setState({ selectedGrades: [1, 2, 3, 4, 5, 6, 8] });
    }
  };

  generateRandomKanjiFromCurrentGrade = () => {
    axios
      .get(`https://kanjiapi.dev/v1/kanji/grade-${this.generateGrade()}`)
      .then((response) => {
        this.setState({
          allKanji: response.data,
          length: response.data.length,
        });
      });

    // this selects one of the grades currently in use, then it selects a kanji from that particular grade and renders it to the page.

    const randomKanji = Math.floor(Math.random() * this.state.allKanji.length);

    axios
      .get(`https://kanjiapi.dev/v1/kanji/${this.state.allKanji[randomKanji]}`)
      .then((response) => {
        this.setState({
          currentKanji: response.data,
          currentKanjiIndex: randomKanji,
        });
      });
  };

  // this generates the next kanji of the current grade in use.
  handleKanjiIncrement = () => {
    if (
      this.allKanji !== null &&
      this.state.currentKanjiIndex < this.state.allKanji.length - 1
    ) {
      axios
        .get(
          `https://kanjiapi.dev/v1/kanji/${
            this.state.allKanji[this.state.currentKanjiIndex + 1]
          }`
        )
        .then((response) => {
          this.setState((prevState) => {
            return {
              currentKanji: response.data,
              currentKanjiIndex: prevState.currentKanjiIndex + 1,
            };
          });
        });
      console.log("clicked up");
    }
  };

  // this generates the previous kanji of the current grade in use.
  handleKanjiDecrement = () => {
    if (this.state.allKanji !== null && this.state.currentKanjiIndex !== 0) {
      axios
        .get(
          `https://kanjiapi.dev/v1/kanji/${
            this.state.allKanji[this.state.currentKanjiIndex - 1]
          }`
        )
        .then((response) => {
          this.setState((prevState) => {
            return {
              currentKanji: response.data,
              currentKanjiIndex: prevState.currentKanjiIndex - 1,
            };
          });
        });
      console.log("clicked down");
    }
  };

  // this makes the currently displayed kanji jump to the start of the current grade.
  handleKanjiStart = () => {
    if (this.state.allKanji !== null) {
      axios
        .get(`https://kanjiapi.dev/v1/kanji/${this.state.allKanji[0]}`)
        .then((response) => {
          this.setState({
            currentKanji: response.data,
            currentKanjiIndex: 0,
          });
        });
      console.log("clicked down");
    }
  };

  // this makes the currently displayed kanji jump to the end of the current grade.
  handleKanjiEnd = () => {
    if (this.state.allKanji !== null) {
      axios
        .get(
          `https://kanjiapi.dev/v1/kanji/${
            this.state.allKanji[this.state.allKanji.length - 1]
          }`
        )
        .then((response) => {
          this.setState({
            currentKanji: response.data,
            currentKanjiIndex: this.state.allKanji.length - 1,
          });
        });
      console.log("clicked up");
    }
  };

  // this toggles the grade you are currently viewing. You can only view one grade at a time.

  toggleGrade = (grade) => {
    axios
      .get(`https://kanjiapi.dev/v1/kanji/grade-${grade}`)
      .then((response) => {
        this.setState({
          allKanji: response.data,
          length: response.data.length,
        });
      });
    axios
      .get(`https://kanjiapi.dev/v1/kanji/${this.state.allKanji[0]}`)
      .then((response) => {
        this.setState({
          currentKanji: response.data,
        });
      });
  };

  // WIP function that generates a random kanji and removes it from the
  // potential to be generated again once viewed. So you don't get repition of kanji.

  handleKanjiSearch = (event) => {
    this.setState({
      searchInputValue: event.target.value,
    });
    console.log(this.state.searchInputValue);
  };

  handleKanjiSearchSubmit = () => {
    if (this.state.searchInputValue !== "") {
      axios
        .get(`https://kanjiapi.dev/v1/kanji/${this.state.searchInputValue}`)
        .then((response) => {
          this.setState({
            currentKanji: response.data,
            searchInputValue: "",
          });
        });
      axios
        .get(
          `https://kanjiapi.dev/v1/kanji/grade-${this.state.currentKanji.grade}`
        )
        .then((response) => {
          this.setState({
            allKanji: response.data,
            length: response.data.length,
          });
        });
    }
  };

  handleToggleCard = () => {
    this.setState((prevState) => {
      return { cardToggle: !prevState.cardToggle };
    });

    // The below can be written as the above

    // if (this.state.cardToggle) {
    //   this.setState({ cardToggle: false });
    // } else {
    //   this.setState({ cardToggle: true });
    // }
  };

  handleToggleTestMode = () => {
    if (this.state.toggleTestMode) {
      this.setState({ toggleTestMode: false });
    } else {
      this.setState({ toggleTestMode: true });
    }
  };

  render() {
    return (
      <div>
        <Card display={this.state.cardToggle ? "block" : "none"}>
          <KanjiCard
            allKanji={this.state.allKanji ? this.state.allKanji : ""}
            currentKanji={
              this.state.currentKanji ? this.state.currentKanji : ""
            }
            incrementKanji={this.handleKanjiIncrement}
            decrementKanji={this.handleKanjiDecrement}
            randomKanji={this.generateRandomKanjiFromCurrentGrade}
            toggleGrade={this.toggleGrade}
            test={this.test}
            kanjiSearch={this.handleKanjiSearch}
            kanjiSearchSubmit={this.handleKanjiSearchSubmit}
            kanjiStart={this.handleKanjiStart}
            kanjiEnd={this.handleKanjiEnd}
            toggleCard={this.handleToggleCard}
            gradeOnOffSwitch={this.gradeOnOffSwitch}
            grades={this.state.grades}
            selectedGrades={this.state.selectedGrades}
            currentKanjiIndex={
              this.state.allKanji ? this.state.currentKanjiIndex : ""
            }
            length={this.state.length}
          />
        </Card>
        <Card display={this.state.cardToggle ? "none" : "block"}>
          <TestCard
            toggleCard={this.handleToggleCard}
            toggleTestMode={this.state.toggleTestMode}
            handleToggleTestMode={this.handleToggleTestMode}
            allKanji={this.state.allKanji ? this.state.allKanji : ""}
            currentKanji={
              this.state.currentKanji ? this.state.currentKanji : ""
            }
            randomKanji={this.generateRandomKanjiFromCurrentGrade}
            grades={this.state.grades}
            gradeOnOffSwitch={this.gradeOnOffSwitch}
            selectedGrades={this.state.selectedGrades}
          />
        </Card>
      </div>
    );
  }
}

export default App;

// if (gradesValue === "All") {
//   if (this.state.grades[7].gradeFlag === false) {
//     this.setState(
//       update(this.state, {
//         grades: {
//           [gradesValueIndex]: {
//             $set: { gradeFlag: true, value: gradesValue, index: 7 },
//           },
//           [0]: {
//             $set: { gradeFlag: false, value: "1", index: 0 },
//           },
//           [1]: {
//             $set: { gradeFlag: false, value: "2", index: 1 },
//           },
//           [2]: {
//             $set: { gradeFlag: false, value: "3", index: 2 },
//           },
//           [3]: {
//             $set: { gradeFlag: false, value: "4", index: 3 },
//           },
//           [4]: {
//             $set: { gradeFlag: false, value: "5", index: 4 },
//           },
//           [5]: {
//             $set: { gradeFlag: false, value: "6", index: 5 },
//           },
//           [6]: {
//             $set: { gradeFlag: false, value: "8", index: 6 },
//           },
//         },
//       })
//     );
//     this.setState({ selectedGrades: ["1", "2", "3", "4", "5", "6", "8"] });
//   }
// } else {
//   if (this.state.grades[gradesValueIndex].gradeFlag === true) {
//     this.setState(
//       update(this.state, {
//         grades: {
//           [gradesValueIndex]: {
//             $set: {
//               gradeFlag: false,
//               value: gradesValue,
//               index: gradesValueIndex,
//             },
//           },
//           [7]: {
//             $set: { gradeFlag: false, value: "All", index: 7 },
//           },
//         },
//       })
//     );
//   } else {
//     this.setState(
//       update(this.state, {
//         grades: {
//           [gradesValueIndex]: {
//             $set: {
//               gradeFlag: true,
//               value: gradesValue,
//               index: gradesValueIndex,
//             },
//           },
//           [7]: {
//             $set: { gradeFlag: false, value: "All", index: 7 },
//           },
//         },
//       })
//     );
//   }
// }
