import axios from "axios";

export const getKanjiFromGrade = (grade) => {
  return axios.get(`https://kanjiapi.dev/v1/kanji/grade-${grade}`);
};

export const getCurrentKanjiInfo = (kanji) => {
  return axios.get(`https://kanjiapi.dev/v1/kanji/${kanji}`);
};
