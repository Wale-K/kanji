import React from "react";
import "./App.css";
import styled from "styled-components";
import KanjiCard from "./components/KanjiCard";
import TestCard from "./components/TestCard";
import { generateKanji, generateKanjiGrade } from "./services/endpoints";

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
    gradeInUse: 1,
  };

  // generates a randomly selected kanji grade from current grades in operation.
  handleGenerateGrade = () => {
    let grade = Math.floor(Math.random() * this.state.selectedGrades.length);
    return this.state.selectedGrades[grade];
  };

  // the page starts at grade 1 and updates the state so allKanji are the grade 1 kanji.
  componentDidMount = () => {
    generateKanjiGrade(this.handleGenerateGrade()).then((response) => {
      this.setState({
        allKanji: response.data,
      });
    });

    document.addEventListener("keydown", this.handleKeyPresses);
  };

  // this sets the first kanji of the grade 1 kanji to be the currentKanji.
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.currentKanji === null) {
      generateKanji(this.state.allKanji[this.state.currentKanjiIndex]).then(
        (response) => {
          this.setState({
            currentKanji: response.data,
            currentGrade: response.data.grade,
          });
        }
      );
    }
  };

  // this toggles the selected grades.
  // there has to be at least 1 selected grade.
  // if all the grades are selected then they all change colour and the "all" button is highlighted.
  gradeOnOffSwitch = (gradeValue) => () => {
    const { selectedGrades } = this.state;

    if (selectedGrades.length === 1 && gradeValue === selectedGrades[0]) {
      return;
    }

    if (gradeValue === "All") {
      this.setState({ selectedGrades: [1, 2, 3, 4, 5, 6, 8] });
      return;
    }

    if (selectedGrades.includes(gradeValue)) {
      this.setState((prevState) => ({
        selectedGrades: prevState.selectedGrades.filter(
          (grade) => grade !== gradeValue
        ),
      }));
      return;
    }

    this.setState((prevState) => ({
      selectedGrades: [...prevState.selectedGrades, gradeValue],
    }));
  };

  generateRandomKanjiFromCurrentGrade = () => {
    const gradeBeingUsed = this.handleGenerateGrade();

    generateKanjiGrade(gradeBeingUsed)
      .then((response) => {
        this.setState({
          allKanji: response.data,
          gradeInUse: gradeBeingUsed,
        });
      })
      .then(() => {
        const randomKanji = Math.floor(
          Math.random() * this.state.allKanji.length
        );

        generateKanji(this.state.allKanji[randomKanji]).then((response) => {
          this.setState({
            currentKanji: response.data,
            currentKanjiIndex: randomKanji,
          });
        });
      });
  };

  // this generates the next kanji of the current grade in use.
  handleKanjiIncrement = () => {
    if (
      this.allKanji !== null &&
      this.state.currentKanjiIndex < this.state.allKanji.length - 1
    ) {
      generateKanji(this.state.allKanji[this.state.currentKanjiIndex + 1]).then(
        (response) => {
          this.setState((prevState) => {
            return {
              currentKanji: response.data,
              currentKanjiIndex: prevState.currentKanjiIndex + 1,
            };
          });
        }
      );
    }
  };

  // this generates the previous kanji of the current grade in use.
  handleKanjiDecrement = () => {
    if (this.state.allKanji !== null && this.state.currentKanjiIndex !== 0) {
      generateKanji(this.state.allKanji[this.state.currentKanjiIndex - 1]).then(
        (response) => {
          this.setState((prevState) => {
            return {
              currentKanji: response.data,
              currentKanjiIndex: prevState.currentKanjiIndex - 1,
            };
          });
        }
      );
    }
  };

  // this makes the currently displayed kanji jump to the start of the current grade.
  handleKanjiStart = () => {
    generateKanjiGrade(this.state.gradeInUse).then((response) => {
      this.setState({ allKanji: response.data });
    });

    if (this.state.allKanji !== null) {
      generateKanji(this.state.allKanji[0]).then((response) => {
        this.setState({
          currentKanji: response.data,
          currentKanjiIndex: 0,
        });
      });
    }
  };

  // this makes the currently displayed kanji jump to the end of the current grade.
  handleKanjiEnd = () => {
    if (this.state.allKanji !== null) {
      generateKanji(this.state.allKanji[this.state.allKanji.length - 1]).then(
        (response) => {
          this.setState({
            currentKanji: response.data,
            currentKanjiIndex: this.state.allKanji.length - 1,
          });
        }
      );
    }
  };

  handleKanjiSearch = (event) =>
    this.setState({
      searchInputValue: event.target.value,
    });

  handleKanjiSearchSubmit = () => {
    if (this.state.searchInputValue !== "") {
      generateKanji(this.state.searchInputValue).then((response) => {
        this.setState({
          currentKanji: response.data,
          searchInputValue: "",
        });
      });
      generateKanjiGrade(this.state.currentKanji.grade).then((response) => {
        this.setState((prevState) => ({
          currentKanjiIndex: -1,
        }));
      });
    }
  };

  handleToggleCard = () =>
    this.setState((prevState) => ({
      cardToggle: !prevState.cardToggle,
    }));

  handleToggleTestMode = () =>
    this.setState((prevState) => ({
      toggleTestMode: !prevState.toggleTestMode,
    }));

  handleKeyPresses = (event) => {
    if (event.keyCode === 13) {
      this.handleKanjiSearchSubmit();
    }
    if (event.keyCode === 38) {
      this.handleKanjiStart();
    }

    if (event.keyCode === 40) {
      this.handleKanjiEnd();
    }

    if (event.keyCode === 39) {
      this.handleKanjiIncrement();
    }

    if (event.keyCode === 37) {
      this.handleKanjiDecrement();
    }

    if (event.keyCode === 191) {
      this.generateRandomKanjiFromCurrentGrade();
    }

    if (event.keyCode === 84) {
      this.handleToggleCard();
    }

    if (event.keyCode === 82) {
      this.handleToggleTestMode();
    }

    // TODO: Fix these so when you press the number on the keyboard the grade is toggled on/off.

    // if (event.keyCode === 49) {
    //   this.gradeOnOffSwitch(1);
    // }

    // if (event.keyCode === 50) {
    //   this.gradeOnOffSwitch(2);
    // }

    // if (event.keyCode === 51) {
    //   this.gradeOnOffSwitch(3);
    // }

    // if (event.keyCode === 52) {
    //   this.gradeOnOffSwitch(4);
    // }

    // if (event.keyCode === 53) {
    //   this.gradeOnOffSwitch(5);
    // }

    // if (event.keyCode === 54) {
    //   this.gradeOnOffSwitch(6);
    // }

    // if (event.keyCode === 56) {
    //   this.gradeOnOffSwitch(8);
    // }

    // if (event.keyCode === 48) {
    //   this.gradeOnOffSwitch(0);
    // }
  };

  render() {
    return (
      <div>
        {/* <Card display={this.state.cardToggle ? "block" : "none"}> */}
        <KanjiCard
          display={this.state.cardToggle ? "block" : "none"}
          allKanji={this.state.allKanji ? this.state.allKanji : ""}
          currentKanji={this.state.currentKanji ? this.state.currentKanji : ""}
          incrementKanji={this.handleKanjiIncrement}
          decrementKanji={this.handleKanjiDecrement}
          randomKanji={this.generateRandomKanjiFromCurrentGrade}
          toggleGrade={this.toggleGrade}
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
        />
        {/* </Card> */}
        {/* <Card display={this.state.cardToggle ? "none" : "block"}> */}
        <TestCard
          display={this.state.cardToggle ? "none" : "block"}
          toggleCard={this.handleToggleCard}
          toggleTestMode={this.state.toggleTestMode}
          handleToggleTestMode={this.handleToggleTestMode}
          allKanji={this.state.allKanji ? this.state.allKanji : ""}
          currentKanji={this.state.currentKanji ? this.state.currentKanji : ""}
          randomKanji={this.generateRandomKanjiFromCurrentGrade}
          grades={this.state.grades}
          gradeOnOffSwitch={this.gradeOnOffSwitch}
          selectedGrades={this.state.selectedGrades}
        />
        {/* </Card> */}
      </div>
    );
  }
}

export default App;
