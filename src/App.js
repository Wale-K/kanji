import React from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  updateAllKanji,
  updateCurrentKanji,
  updateGradesInUse,
} from "./modules/actions";
import { generateKanji, generateKanjiGrade } from "./services/endpoints";
import { KanjiCardWrapper } from "./components/KanjiCard";
import { TestCardWrapper } from "./components/TestCard";
import { generateRandomGrade } from "./modules/selectors";

class App extends React.Component {
  state = {
    allKanji: null,
    currentKanji: null,
    currentKanjiIndex: 0,
    searchInputValue: "",
    displayStudy: true,
    toggleTestMode: true,
    selectedGrades: [1],
    gradeInUse: 1,
  };

  // the page starts at grade 1 and updates the state so allKanji are the grade 1 kanji.
  componentDidMount = () => {
    generateKanjiGrade(this.props.randomGrade).then((response) => {
      this.setState({
        allKanji: response.data,
      });
      this.props.updateAllKanji(response.data);
    });

    document.addEventListener("keydown", this.handleKeyPresses);
  };

  // this sets the first kanji of the grade 1 kanji to be the currentKanji.
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.currentKanji === null) {
      generateKanji(this.props.allKanji[this.props.currentKanjiIndex]).then(
        (response) => {
          this.setState({
            currentKanji: response.data,
            currentGrade: response.data.grade,
          });
          this.props.updateCurrentKanji(response.data);
        }
      );
    }
  };

  // this toggles the selected grades.
  // there has to be at least 1 selected grade.
  // if all the grades are selected then they all change colour and the "all" button is highlighted.
  gradeOnOffSwitch = (gradeValue) => () => {
    const { selectedGrades, updateGradesInUse } = this.props;

    if (selectedGrades.length === 1 && gradeValue === selectedGrades[0]) {
      return;
    }

    if (gradeValue === "All") {
      this.setState({ selectedGrades: [1, 2, 3, 4, 5, 6, 8] });
      updateGradesInUse([1, 2, 3, 4, 5, 6, 8]);

      return;
    }

    if (selectedGrades.includes(gradeValue)) {
      this.setState((prevState) => ({
        selectedGrades: prevState.selectedGrades.filter(
          (grade) => grade !== gradeValue
        ),
      }));
      updateGradesInUse(selectedGrades.filter((grade) => grade !== gradeValue));
      return;
    }

    this.setState((prevState) => ({
      selectedGrades: [...prevState.selectedGrades, gradeValue],
    }));
    updateGradesInUse([...selectedGrades, gradeValue]);
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

  handleKanjiSearch = (event) => {
    this.setState({
      searchInputValue: event.target.value,
    });
  };

  handleKanjiSearchSubmit = () => {
    console.log("hello");
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
      displayStudy: !prevState.displayStudy,
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
  };

  render() {
    console.log(this.props.randomGrade);
    return (
      <>
        <KanjiCardWrapper
          displayStudy={this.state.displayStudy}
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
        <TestCardWrapper
          display={!this.state.displayStudy}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    randomGrade: generateRandomGrade(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAllKanji: (kanjis) => dispatch(updateAllKanji(kanjis)),
    updateCurrentKanji: (kanji) => dispatch(updateCurrentKanji(kanji)),
    updateGradesInUse: (grade) => dispatch(updateGradesInUse(grade)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
